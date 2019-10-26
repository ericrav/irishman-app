import React, { useRef, useEffect } from 'react';

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
      console.log(audioEl);
      audioEl.setSinkId(audioOutput).then(() => audioEl.play());
    }
  }, [audioRef.current]);

  return (
    <div className='fullsize' onClick={onNext}>
      <audio loop ref={audioRef}>
        <source src={audioSrc} type='audio/mpeg' />
      </audio>
    </div>
  );
}
