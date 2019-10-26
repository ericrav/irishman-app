import audioSrc from './chime.mp3';

export const getDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const audioDevices = devices.filter(device => device.kind === 'audiooutput');
  return audioDevices;
};

declare global {
  interface HTMLMediaElement {
    setSinkId: (id: string) => Promise<void>;
  }
}

export const playTestTone = async (deviceId: string) => {
  const audio: HTMLAudioElement = new Audio();
  await audio.setSinkId(deviceId);
  audio.src = audioSrc;
  audio.play();
};
