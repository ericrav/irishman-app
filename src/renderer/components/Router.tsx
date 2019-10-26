import React, { useEffect, useState } from 'react';

import { Hotline } from './hotline/Hotline';
import { Ringer } from './ringer/Ringer';
import { Settings } from './settings/Settings';
import { Trailer } from './trailer/Trailer';

enum AppState {
  Initial,
  Ringer,
  Trailer,
  HotlineCTA,
}

interface Props {
  settings: Settings;
}

export function Router({ settings }: Props) {
  const { device, speaker } = settings;
  const [appState, setAppState] = useState(AppState.Initial);

  useEffect(() => {
    device.on({
      hookOff: () => setAppState(AppState.Trailer),
      hookOn: () => setAppState(AppState.Ringer),
    });
  }, []);

  switch (appState) {
    case AppState.Initial: {
      return (
        <div className='fullsize' onClick={() => setAppState(AppState.Ringer)}>
          Initial Screen FPO
        </div>
      );
    }
    case AppState.Ringer: {
      return <Ringer onNext={() => setAppState(AppState.Trailer)} audioOutput={speaker} />;
    }
    case AppState.Trailer: {
      return <Trailer onComplete={() => setAppState(AppState.HotlineCTA)} />;
    }
    case AppState.HotlineCTA: {
      return <Hotline onNext={() => setAppState(AppState.Initial)} />;
    }
  }
}
