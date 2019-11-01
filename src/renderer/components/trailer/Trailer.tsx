import React from 'react'

import videoSrc from './clip.mp4'
import './Trailer.scss';

interface Props {
  onComplete: () => void
}

export function Trailer({ onComplete }: Props) {
  return (
    <div className="video-container" onClick={onComplete}>
      <video autoPlay id="video" onEnded={onComplete} muted={process.env.NODE_ENV !== 'production'}>
        <source src={videoSrc} type="video/mp4" />
        Video not supported
      </video>
    </div>
  )
}
