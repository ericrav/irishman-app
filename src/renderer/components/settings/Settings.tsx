import './Settings.scss';

import React, { useState, useEffect } from 'react';

import { SerialDevice } from '../../serial';
import { AudioSelector } from './AudioSelector';
import { DeviceSelector } from './DeviceSelector';

type Clip = 'Deniro' | 'Pacino' | 'Pesci' | 'Scorcese';

export interface Settings {
  device: SerialDevice;
  speaker: string;
  clip: Clip;
}

interface Props {
  onLaunch: (settings: Settings) => void;
}

export function Settings({ onLaunch }: Props) {
  const [device, setDevice] = useState<SerialDevice>();
  const [portPath, setPortPath] = useState<string>();
  const [speaker, setSpeaker] = useState('');
  const [clip, setClip] = useState<Clip>();
  const [usingSavedSettings, setUsingSaved] = useState(false);
  const [shouldLaunch, setShouldLaunch] = useState(false);

  const settingsCompleted = device && speaker;

  const launch = () => {
    if (device && speaker && clip) {
      const data = { device, speaker, clip };
      localStorage.setItem('port', device.port.path);
      localStorage.setItem('speaker', speaker);
      localStorage.setItem('clip', clip);
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
      const clip = localStorage.getItem('clip') as Clip;
      if (speaker) {
        setSpeaker(speaker);
      }

      if (port) {
        setPortPath(port);
      }

      if (clip) {
        setClip(clip);
      }

      if (speaker && port && clip) {
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

      <div>
        <h2>--- Select Booth ---</h2>
        <select onChange={e => setClip(e.target.value as Clip)} value={clip}>
          <option value="Deniro">Deniro</option>
          <option value="Pacino">Pacino</option>
          <option value="Pesci">Pesci</option>
          <option value="Scorcese">Scorcese</option>
        </select>
      </div>

      <button className='settings__launch' onClick={launch} disabled={!settingsCompleted}>
        Launch App
      </button>
    </div>
  );
}
