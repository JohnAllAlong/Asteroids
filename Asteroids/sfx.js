class SFX{

constructor(){
    this.engineStarted = false;
    this.engineStopped = false;
}

initializeSFX(){
  this.bgMusic = loadSound('assets/abandoned-space-station-305773.mp3');
  this.bgMusic.amp(0.3)
  this.engineStart = loadSound('assets/M_Retro Turn ON Long.wav')
  this.engineStart.amp(1)
  this.engineOn = loadSound('assets/M_ON.wav')
  this.engineOn.amp(0.8)
  this.engineOff = loadSound('assets/M_Retro Turn Off 12.wav')
  this.engineOff.amp(0.8)
  this.shooting = loadSound('assets/Retro Gun Laser SingleShot 01.wav')
  this.shooting.amp(1)
  this.saucer = loadSound('assets/Retro HiTech 08.wav')
  this.saucer.amp(0.5)
  this.explosion = loadSound('assets/Retro Explosion Short 01.wav')
  this.explosion.amp(1)
  this.teleport = loadSound('assets/Retro PowerUP 23.wav')
  this.teleport.amp(0.2)
}

}