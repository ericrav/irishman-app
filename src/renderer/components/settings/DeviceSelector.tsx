import React, { useEffect, useState } from 'react';
import { PortInfo } from 'serialport';

import { connectDevice, getSerialPorts, SerialDevice } from '../../serial';

interface Props {
  portPath?: string;
  device: SerialDevice | undefined;
  onChange: (device: SerialDevice) => void;
}

export function DeviceSelector({ portPath, onChange, device }: Props) {
  const [deviceRefresh, setDeviceRefresh] = useState(0);
  const [ports, setPorts] = useState<PortInfo[]>([]);
  const [port, setPort] = useState<string>();
  const [hook, setHook] = useState('');
  const [motion, setMotion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSerialPorts().then(setPorts);
  }, [deviceRefresh]);

  const selectPort = async (value: string) => {
    setPort(value);
    try {
      const d = await connectDevice(value);
      d.on({
        hookOff: () => setHook('Off Hook'),
        hookOn: () => setHook('On Hook'),
        motionOff: () => setMotion('Motion Stopped'),
        motionOn: () => setMotion('Motion Detected'),
      });
      onChange(d);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (portPath) {
      selectPort(portPath);
    }
  }, [portPath]);

  return (
    <div>
      <h2>--- Arduino Serial Port ---</h2>

      <select onChange={e => selectPort(e.target.value)} value={port}>
        <option></option>
        {ports.map(port => (
          <option key={port.comName} value={port.comName}>
            {port.comName} - {port.manufacturer}
          </option>
        ))}
      </select>
      <button onClick={() => setDeviceRefresh(deviceRefresh + 1)}>Refresh</button>

      <div>
        {error && <p>{error}</p>}
        {device && (
          <>
            <h3>Test Sensors</h3>
            <p>Phone: {hook}</p>
            <p>PIR: {motion}</p>
          </>
        )}
      </div>
    </div>
  );
}
