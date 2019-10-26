import React, { useEffect, useState } from 'react';
import { PortInfo } from 'serialport';

import { connectDevice, getSerialPorts, SerialDevice } from '../../serial';

interface Props {
  device: SerialDevice | undefined;
  onChange: (device: SerialDevice) => void;
}

export function DeviceSelector({ onChange, device }: Props) {
  const [ports, setPorts] = useState<PortInfo[]>([]);
  const [hook, setHook] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSerialPorts().then(setPorts);
  }, []);

  const selectPort = async (value: string) => {
    try {
      const d = await connectDevice(value);
      console.log('device', d);
      d.on({
        hookOff: () => setHook('Off Hook'),
        hookOn: () => setHook('On Hook'),
      });
      onChange(d);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>--- Arduino Serial Port ---</h2>

      <select onChange={e => selectPort(e.target.value)}>
        <option></option>
        {ports.map(port => (
          <option key={port.comName} value={port.comName}>
            {port.comName} - {port.manufacturer}
          </option>
        ))}
      </select>

      <div>
        {error && <p>{error}</p>}
        {device && (
          <>
            <h3>Test Sensors</h3>
            <p>Phone: {hook}</p>
          </>
        )}
      </div>
    </div>
  );
}
