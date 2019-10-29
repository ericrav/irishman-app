import React, { useEffect, useState } from 'react';

import callingImg from '../../img/04-dialing.png';
import connectedImg from '../../img/05-connected.png';
import { makeCall } from './twilio';

interface Props {
  onNext: () => void;
}

export function Hotline({ onNext }: Props) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const { connection } = makeCall();

    let keepChecking = true;

    const checkRingingStatus = () => {
      if (connection.status() === 'open') {
        setIsConnected(true);
      } else if (keepChecking) {
        requestAnimationFrame(checkRingingStatus);
      }
    };

    checkRingingStatus();

    return () => {
      keepChecking = false;
      connection.disconnect();
    };
  }, []);

  return (
    <div className='fullsize' onClick={onNext}>
      <img src={isConnected ? connectedImg : callingImg} />
    </div>
  );
}
