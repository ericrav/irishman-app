import React from 'react';

import imgSrc from '../../img/01-idle.png';

interface Props {
  onNext: () => void;
}

export default function Idle({ onNext }: Props) {
  return (
    <div className='fullsize' onClick={onNext}>
      <img src={imgSrc} />
    </div>
  );
}
