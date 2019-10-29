import React, { useRef, useEffect } from 'react';

import imgSrc from '../../img/02-ringing.png';
import audioSrc from './ring.mp3';

interface Props {
  onNext: () => void;
  audioOutput: string;
}

export function Ringer({ onNext, audioOutput }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.setSinkId(audioOutput).then(() => audioEl.play());
    }
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
