import './Settings.scss';

import React, { useEffect, useState } from 'react';
import { PortInfo } from 'serialport';

import { getSerialPorts, SerialDevice, connectDevice } from '../../serial';

interface Props {
  onLaunch: (settings: { device: SerialDevice }) => void
}

export function Settings({ onLaunch }: Props) {
  const [ports, setPorts] = useState<PortInfo[]>([]);
  const [device, setDevice] = useState<SerialDevice>();
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
      setDevice(d);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const launch = () => device && onLaunch({ device });

  return (
    <div className='settings fullsize'>
      <h1>Settings</h1>
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

      <button className="settings__launch" onClick={launch} disabled={!device}>Launch App</button>
    </div>
  );
}
