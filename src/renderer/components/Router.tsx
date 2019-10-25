import React, { useState, useEffect } from 'react';

import { Trailer } from './trailer/Trailer';
import { Ringer } from './ringer/Ringer';
import { Hotline } from './hotline/Hotline';
import { SerialDevice } from '../serial';

enum AppState {
  Initial,
  Ringer,
  Trailer,
  HotlineCTA,
}

interface Props {
  device: SerialDevice;
}

export function Router({ device }: Props) {
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
      return <Ringer onNext={() => setAppState(AppState.Trailer)} />;
    }
    case AppState.Trailer: {
      return <Trailer onComplete={() => setAppState(AppState.HotlineCTA)} />;
    }
    case AppState.HotlineCTA: {
      return <Hotline onNext={() => setAppState(AppState.Initial)} />;
    }
  }
}
