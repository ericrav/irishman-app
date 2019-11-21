import React from 'react'

import deniroClip from '../../clips/Deniro.mp4';
import pacinoClip from '../../clips/Pacino.mp4';
import pesciClip from '../../clips/Pesci.mp4';
import scorceseClip from '../../clips/Scorsese.mp4';
import './Trailer.scss';


const clips = {
  Deniro: deniroClip,
  Pacino: pacinoClip,
  Pesci: pesciClip,
  Scorcese: scorceseClip,
};

interface Props {
  onComplete: () => void;
  clip: keyof typeof clips
}

export function Trailer({ onComplete, clip }: Props) {
  return (
    <div className="video-container" onClick={onComplete}>
      <video autoPlay id="video" onEnded={onComplete} muted={process.env.NODE_ENV !== 'production'}>
        <source src={clips[clip]} type="video/mp4" />
        Video not supported
      </video>
    </div>
  )
}
