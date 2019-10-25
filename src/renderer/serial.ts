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
}

export const connectDevice = async (path: string) => {
  const port = new SerialPort(path, { baudRate: 9600, autoOpen: false });
  await new Promise((resolve, reject) => port.open(e => (e ? reject(e) : resolve())));
  return new SerialDevice(port);
};

export class SerialDevice {
  private onHookOff = () => {};
  private onHookOn = () => {};

  public constructor(port: SerialPort) {
    port.on('readable', () => {
      const data = port.read(8);
      if (data) {
        const message = data.toString();

        if (message.includes('H_ON')) {
          this.onHookOn();
        } else if (message.includes('H_OFF')) {
          this.onHookOff();
        }
      }
    });
  }

  public on(callbacks: DeviceCallbacks): void {
    this.onHookOff = callbacks.hookOff;
    this.onHookOn = callbacks.hookOn;
  }
}
