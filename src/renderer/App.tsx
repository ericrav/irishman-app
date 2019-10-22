import React, { useState } from 'react';

import { Trailer } from './components/trailer/Trailer';
import { Ringer } from './components/ringer/Ringer';
import { Hotline } from './components/hotline/Hotline';
import './App.scss';

enum AppState {
  Initial,
  Ringer,
  Trailer,
  HotlineCTA,
}

export function App() {
  const [appState, setAppState] = useState(AppState.Initial);

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
