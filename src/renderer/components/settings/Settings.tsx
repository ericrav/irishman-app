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
    } catch (e) {
      console.log(e);
    }
  }, []);

  const settingsCompleted = device && speaker;

  const launch = () => {
    if (device && speaker) {
      const data = { device, speaker };
      localStorage.setItem('port', device.port.path);
      localStorage.setItem('speaker', speaker);
      onLaunch(data);
    }
  };

  return (
    <div className='settings fullsize'>
      <h1>Settings</h1>
      <DeviceSelector portPath={portPath} device={device} onChange={setDevice} />
      <AudioSelector
        speaker={speaker}
        onSpeakerChange={setSpeaker}
      />

      <button className='settings__launch' onClick={launch} disabled={!settingsCompleted}>
        Launch App
      </button>
    </div>
  );
}
