import React, { useEffect } from 'react';
import { makeCall } from './twilio';

interface Props {
  onNext: () => void;
}

export function Hotline({ onNext }: Props) {
  useEffect(() => {
    const connection = makeCall();

    return () => {
      connection.disconnect();
    };
  }, []);

  return <div className='fullsize' onClick={onNext}>Calling hotline...</div>;
}
