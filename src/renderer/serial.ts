import SerialPort from 'serialport';

export const getSerialPorts = async () => {
  return SerialPort.list();
};

export const getPort = async () => {
  const ports = await getSerialPorts();
  const portInfo = ports.find(p => p.manufacturer === 'Adafruit');

  if (!portInfo) {
    throw 'Arduino port not found';
  }

  return portInfo.comName;
};

let device: SerialDevice;

interface DeviceCallbacks {
  hookOn: () => void;
  hookOff: () => void;
}

export class SerialDevice {
  public static get(path: string): SerialDevice {
    if (!device) {
      const port = new SerialPort(path, { baudRate: 9600 });
      device = new SerialDevice(port);
    }

    return device;
  }

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
