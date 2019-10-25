import SerialPort from 'serialport';


export const getSerialPorts = async () => {
  return SerialPort.list();
}

export const getPort = async () => {
  const ports = await getSerialPorts();
  const portInfo = ports.find(p => p.manufacturer === 'Adafruit');

  if (!portInfo) {
    throw 'Arduino port not found';
  }

  const port = new SerialPort(portInfo.comName, { baudRate: 9600 });
  return port;
}
