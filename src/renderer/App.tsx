import './App.scss';

import React, { useEffect, useState } from 'react';

import { Router } from './components/Router';
import { getPort } from './serial';

export function App() {
  const [port, setPort] = useState();

  useEffect(() => {
    getPort().then(p => setPort(p));
    return () => {};
  }, []);

  return port ? <Router port={port} /> : null;
}
