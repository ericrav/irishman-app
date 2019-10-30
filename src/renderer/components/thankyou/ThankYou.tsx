import React, { useEffect } from 'react'

import imgSrc from '../../img/03.png';

interface Props {
  onNext: () => void;
}

export function ThankYou({ onNext }: Props) {
  useEffect(() => {
    const delay = setTimeout(onNext, 10000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className='fullsize' onClick={onNext}>
      <img src={imgSrc} />
    </div>
  );
}
