import React, { useEffect, useState } from 'react';

import Idle from './idle/Idle';
import { Ringer } from './ringer/Ringer';
import { Settings } from './settings/Settings';
import { ThankYou } from './thankyou/ThankYou';
import { Trailer } from './trailer/Trailer';

enum AppState {
  Initial,
  Ringer,
  Trailer,
  ThankYou,
}

interface Props {
  settings: Settings;
}

export function Router({ settings }: Props) {
  const { device, speaker, clip } = settings;
  const [appState, setAppState] = useState(AppState.Initial);

  useEffect(() => {
    device.on({
      hookOff: () => setAppState(AppState.Trailer),
      hookOn: () => setAppState(AppState.ThankYou),
      motionOn: () => {
        if (appState === AppState.Initial) {
          setAppState(AppState.Ringer);
        }
      },
    });
  }, [appState]);

  switch (appState) {
    case AppState.Initial: {
      return <Idle onNext={() => setAppState(AppState.Ringer)} />;
    }
    case AppState.Ringer: {
      return (
        <Ringer
          onNext={() => setAppState(AppState.Trailer)}
          onBack={() => setAppState(AppState.Initial)}
          audioOutput={speaker}
        />
      );
    }
    case AppState.Trailer: {
      return <Trailer clip={clip} onComplete={() => setAppState(AppState.ThankYou)} />;
    }
    case AppState.ThankYou: {
      return <ThankYou onNext={() => setAppState(AppState.Initial)} />;
    }
  }
}
