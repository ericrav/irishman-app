import React, { useEffect, useState } from 'react';

import { getDevices, playTestTone } from './audio';

interface Props {
  speaker: string;
  onSpeakerChange: (id: string) => void;
}

export function AudioSelector(props: Props) {
  const { speaker, onSpeakerChange } = props;
  const [deviceRefresh, setDeviceRefresh] = useState(0);
  const [outputs, setOutputs] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    getDevices().then(setOutputs);
  }, [deviceRefresh]);

  return (
    <div>
      <h2>--- Audio Output ---</h2>

      <button onClick={() => setDeviceRefresh(deviceRefresh + 1)}>Refresh Outputs</button>

      <h3>Ringer:</h3>
      <select onChange={e => onSpeakerChange(e.target.value)} value={speaker}>
        <option></option>
        {outputs.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <button onClick={() => playTestTone(speaker)}>Play Sound</button>

      <h3>Phone Handset:</h3>
      Use computer default audio out
      {/* <select onChange={e => onHandsetChange(e.target.value)}>
        <option></option>
        {outputs.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select> */}

      <button onClick={() => playTestTone('default')}>Play Sound</button>
    </div>
  );
}
