import React, { useEffect, useState } from 'react';

import { getDevices, playTestTone } from './audio';

interface Props {
  speaker: string;
  handset: string;
  onSpeakerChange: (id: string) => void;
  onHandsetChange: (id: string) => void;
}

export function AudioSelector(props: Props) {
  const { speaker, onSpeakerChange, handset, onHandsetChange } = props;
  const [outputs, setOutputs] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    getDevices().then(setOutputs);
  }, []);

  return (
    <div>
      <h2>--- Audio Output ---</h2>

      <h3>Ringer:</h3>
      <select onChange={e => onSpeakerChange(e.target.value)}>
        <option></option>
        {outputs.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <button onClick={() => playTestTone(speaker)}>Play Sound</button>

      <h3>Phone Handset:</h3>
      <select onChange={e => onHandsetChange(e.target.value)}>
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
