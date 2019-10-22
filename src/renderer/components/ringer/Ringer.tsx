import React from 'react';

import audioSrc from './ring.mp3';

interface Props {
  onNext: () => void;
}

export function Ringer({ onNext }: Props) {
  return (
    <div className='fullsize' onClick={onNext}>
      <audio autoPlay loop>
        <source src={audioSrc} type='audio/mpeg' />
      </audio>
    </div>
  );
}
