import './App.scss';

import React, { useEffect, useState } from 'react';

import { Router } from './components/Router';
import { getPort, SerialDevice } from './serial';

export function App() {
  const [device, setDevice] = useState();

  useEffect(() => {
    getPort().then(port => setDevice(SerialDevice.get(port)));
    return () => {};
  }, []);

  return device ? <Router device={device} /> : null;
}
