import React, { useRef, useEffect } from 'react';

import imgSrc from '../../img/02.jpeg';
import audioSrc from './ring.mp3';

interface Props {
  onNext: () => void;
  onBack: () => void;
  audioOutput: string;
}

export function Ringer({ onNext, onBack, audioOutput }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timeout = setTimeout(onBack, 15000);
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.setSinkId(audioOutput).then(() => audioEl.play());
    }

    return () => clearTimeout(timeout);
  }, [audioRef.current]);

  return (
    <div className='fullsize' onClick={onNext}>
      <img src={imgSrc} />
      <audio loop ref={audioRef}>
        <source src={audioSrc} type='audio/mpeg' />
      </audio>
    </div>
  );
}
