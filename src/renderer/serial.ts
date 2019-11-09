import SerialPort from 'serialport';

export const getSerialPorts = async () => {
  const ports = await SerialPort.list();
  return ports.sort(p1 => (p1.comName.includes('usb') ? -1 : 1));
};

export const getPort = async () => {
  const ports = await getSerialPorts();
  const portInfo = ports.find(p => p.manufacturer === 'Adafruit');

  if (!portInfo) {
    throw 'Arduino port not found';
  }

  return portInfo.comName;
};

interface DeviceCallbacks {
  hookOn: () => void;
  hookOff: () => void;
  motionOn: () => void;
  motionOff?: () => void;
}

export const connectDevice = async (path: string) => {
  const port = new SerialPort(path, { baudRate: 9600, autoOpen: false });
  await new Promise((resolve, reject) => port.open(e => (e ? reject(e) : resolve())));
  return new SerialDevice(port);
};

export class SerialDevice {
  private onHookOff = () => {};
  private onHookOn = () => {};
  private onMotionOff = () => {};
  private onMotionOn = () => {};

  public constructor(public port: SerialPort) {
    port.on('readable', () => {
      const data = port.read(8);
      if (data) {
        const message = data.toString();

        if (message.includes('H_ON')) {
          this.onHookOn();
        } else if (message.includes('H_OFF')) {
          this.onHookOff();
        } else if (message.includes('M_ON')) {
          this.onMotionOn();
        } else if (message.includes('M_OFF')) {
          this.onMotionOff();
        }
      }
    });
  }

  public on(callbacks: DeviceCallbacks): void {
    this.onHookOff = callbacks.hookOff;
    this.onHookOn = callbacks.hookOn;
    this.onMotionOn = callbacks.motionOn;
    if (callbacks.motionOff) {
      this.onMotionOff = callbacks.motionOff;
    } else {
      this.onMotionOff = () => {};
    }
  }
}
