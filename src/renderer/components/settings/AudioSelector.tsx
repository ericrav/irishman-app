import React, { useEffect, useState } from 'react';

import { getDevices, playTestTone } from './audio';

export function AudioSelector() {
  const [outputs, setOutputs] = useState<MediaDeviceInfo[]>([]);
  const [speaker, setSpeaker] = useState();
  const [handset, setHandset] = useState();
  useEffect(() => {
    getDevices().then(setOutputs);
  }, []);

  return (
    <div>
      <h2>--- Audio Output ---</h2>

      <h3>Ringer:</h3>
      <select onChange={e => setSpeaker(e.target.value)}>
        <option></option>
        {outputs.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <button onClick={() => playTestTone(speaker)}>Play Sound</button>

      <h3>Phone Handset:</h3>
      <select onChange={e => setHandset(e.target.value)}>
        <option></option>
        {outputs.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <button onClick={() => playTestTone(handset)}>Play Sound</button>
    </div>
  );
}
