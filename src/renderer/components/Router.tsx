import React, { useState, useEffect } from 'react';

import { Trailer } from './trailer/Trailer';
import { Ringer } from './ringer/Ringer';
import { Hotline } from './hotline/Hotline';
import SerialPort from 'serialport';

enum AppState {
  Initial,
  Ringer,
  Trailer,
  HotlineCTA,
}

interface Props {
  port: SerialPort;
}

export function Router({ port }: Props) {
  const [appState, setAppState] = useState(AppState.Initial);

  useEffect(() => {
    port.on('readable', function() {
      const data = port.read(8);
      if (data) {
        const message = data.toString();
        if (message.includes('H_ON')) {
          setAppState(AppState.Ringer);
        } else if (message.includes('H_OFF')) {
          setAppState(AppState.Trailer);
        }
      }
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
