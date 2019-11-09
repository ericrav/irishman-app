import './Settings.scss';

import React, { useState, useEffect } from 'react';

import { SerialDevice } from '../../serial';
import { AudioSelector } from './AudioSelector';
import { DeviceSelector } from './DeviceSelector';

export interface Settings {
  device: SerialDevice;
  speaker: string;
}

interface Props {
  onLaunch: (settings: Settings) => void;
}

export function Settings({ onLaunch }: Props) {
  const [device, setDevice] = useState<SerialDevice>();
  const [portPath, setPortPath] = useState<string>();
  const [speaker, setSpeaker] = useState('');
  const [usingSavedSettings, setUsingSaved] = useState(false);
  const [shouldLaunch, setShouldLaunch] = useState(false);

  const settingsCompleted = device && speaker;

  const launch = () => {
    if (device && speaker) {
      const data = { device, speaker };
      localStorage.setItem('port', device.port.path);
      localStorage.setItem('speaker', speaker);
      onLaunch(data);
    }
  };

  useEffect(() => {
    if (shouldLaunch && usingSavedSettings) {
      launch();
    }
  }, [shouldLaunch]);

  useEffect(() => {
    try {
      const port = localStorage.getItem('port');
      const speaker = localStorage.getItem('speaker');
      if (speaker) {
        setSpeaker(speaker);
      }

      if (port) {
        setPortPath(port);
      }

      if (speaker && port) {
        setUsingSaved(true);
        setTimeout(() => setShouldLaunch(true), 4000);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className='settings fullsize'>
      <h1>Settings</h1>

      {usingSavedSettings && (
        <>
          <p>
            <strong>Launching with saved settings...</strong>
          </p>
          <button onClick={() => setUsingSaved(false)}>Cancel</button>
        </>
      )}
      <DeviceSelector portPath={portPath} device={device} onChange={setDevice} />
      <AudioSelector speaker={speaker} onSpeakerChange={setSpeaker} />

      <button className='settings__launch' onClick={launch} disabled={!settingsCompleted}>
        Launch App
      </button>
    </div>
  );
}
