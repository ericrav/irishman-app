import React, { useState } from 'react';
import { Trailer } from './components/trailer/Trailer';

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
      return <div>Initial Screen FPO</div>;
    }
    case AppState.Ringer: {
      return <div />;
    }
    case AppState.Trailer: {
      return <Trailer onComplete={() => setAppState(AppState.HotlineCTA)} />;
    }
    case AppState.HotlineCTA: {
      return <div />;
    }
  }
}
