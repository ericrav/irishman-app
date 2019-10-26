import './Settings.scss';

import React, { useState } from 'react';

import { SerialDevice } from '../../serial';
import { AudioSelector } from './AudioSelector';
import { DeviceSelector } from './DeviceSelector';

interface Props {
  onLaunch: (settings: { device: SerialDevice }) => void;
}

export function Settings({ onLaunch }: Props) {
  const [device, setDevice] = useState<SerialDevice>();

  const launch = () => device && onLaunch({ device });

  return (
    <div className='settings fullsize'>
      <h1>Settings</h1>
      <DeviceSelector device={device} onChange={setDevice} />
      <AudioSelector />

      <button className='settings__launch' onClick={launch} disabled={!device}>
        Launch App
      </button>
    </div>
  );
}
