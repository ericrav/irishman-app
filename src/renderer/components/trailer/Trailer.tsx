import React from 'react'

import videoSrc from './trailer.mp4'
import './Trailer.scss';

interface Props {
  onComplete: () => void
}

export function Trailer({ onComplete }: Props) {
  return (
    <div className="video-container">
      <video autoPlay id="video" onEnded={onComplete}>
        <source src={videoSrc} type="video/mp4" />
        Video not supported
      </video>
    </div>
  )
}
