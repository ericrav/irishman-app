import React, { useEffect } from 'react'

import imgSrc from '../../img/03-callquestion.png'

interface Props {
  onNext: () => void;
}

export default function HotlineCTA({ onNext }: Props) {
  useEffect(() => {
    const delay = setTimeout(onNext, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className='fullsize' onClick={onNext}>
      <img src={imgSrc} />
    </div>
  );
}
