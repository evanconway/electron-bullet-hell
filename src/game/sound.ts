const audioContext = new AudioContext();

const shootSound = new Audio("../../assets/shoot.wav");
const shootTrack = audioContext.createMediaElementSource(shootSound);
shootTrack.connect(audioContext.destination);

export enum Sound {
  playerShoot,
}

export const playSound = (sound: Sound, volume: number) => {
  if (sound === Sound.playerShoot) {
    shootSound.pause();
    shootSound.currentTime = 0;
    shootSound.volume = 0.2;
    shootSound.play();
  }
};
