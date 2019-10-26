import './App.scss';

import React, { useState } from 'react';

import { Router } from './components/Router';
import { Settings } from './components/settings/Settings';

export function App() {
  const [settings, setSettings] = useState<Settings>();

  const onLaunch = (settings: Settings) => {
    setSettings(settings);
  };

  return settings ? <Router settings={settings} /> : <Settings onLaunch={onLaunch} />;
}
