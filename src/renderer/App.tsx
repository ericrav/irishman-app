import './App.scss';

import React, { useEffect, useState } from 'react';

import { Router } from './components/Router';
import { Settings } from './components/settings/Settings';
import { SerialDevice } from './serial';

export function App() {
  const [device, setDevice] = useState<SerialDevice>();

  const onLaunch = ({ device }: { device: SerialDevice }) => {
    setDevice(device);
  };

  return device ? <Router device={device} /> : <Settings onLaunch={onLaunch} />;
}
