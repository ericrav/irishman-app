import React, { useEffect, useState } from 'react';

import { Hotline } from './hotline/Hotline';
import HotlineCTA from './hotline/HotlineCTA';
import Idle from './idle/Idle';
import { Ringer } from './ringer/Ringer';
import { Settings } from './settings/Settings';
import { ThankYou } from './thankyou/ThankYou';
import { Trailer } from './trailer/Trailer';

enum AppState {
  Initial,
  Ringer,
  Trailer,
  HotlineCTA,
  Hotline,
  ThankYou,
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
      hookOn: () => setAppState(AppState.ThankYou),
    });
  }, []);

  switch (appState) {
    case AppState.Initial: {
      return <Idle onNext={() => setAppState(AppState.Ringer)} />;
    }
    case AppState.Ringer: {
      return <Ringer onNext={() => setAppState(AppState.Trailer)} audioOutput={speaker} />;
    }
    case AppState.Trailer: {
      return <Trailer onComplete={() => setAppState(AppState.HotlineCTA)} />;
    }
    case AppState.HotlineCTA: {
      return <HotlineCTA onNext={() => setAppState(AppState.Hotline)} />;
    }
    case AppState.Hotline: {
      return <Hotline onNext={() => setAppState(AppState.ThankYou)} />;
    }
    case AppState.ThankYou: {
      return <ThankYou onNext={() => setAppState(AppState.Initial)} />;
    }
  }
}
