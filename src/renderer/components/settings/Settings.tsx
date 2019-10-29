import './Settings.scss';

import React, { useState } from 'react';

import { SerialDevice } from '../../serial';
import { AudioSelector } from './AudioSelector';
import { DeviceSelector } from './DeviceSelector';

export interface Settings {
  device: SerialDevice;
  speaker: string;
  handset: string;
}

interface Props {
  onLaunch: (settings: Settings) => void;
}

export function Settings({ onLaunch }: Props) {
  const [device, setDevice] = useState<SerialDevice>();
  const [speaker, setSpeaker] = useState('');
  const [handset, setHandset] = useState('');

  const settingsCompleted = device && speaker;

  const launch = () => settingsCompleted && onLaunch({ device: device!, speaker, handset });

  return (
    <div className='settings fullsize'>
      <h1>Settings</h1>
      <DeviceSelector device={device} onChange={setDevice} />
      <AudioSelector
        speaker={speaker}
        handset={handset}
        onSpeakerChange={setSpeaker}
        onHandsetChange={setHandset}
      />

      <button className='settings__launch' onClick={launch} disabled={!settingsCompleted}>
        Launch App
      </button>
    </div>
  );
}
