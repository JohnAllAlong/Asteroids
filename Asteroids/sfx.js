class SFX{

constructor(){
    
}

initializeSFX(){
  this.bgMusic = loadSound('assets/abandoned-space-station-305773.mp3');
  this.bgMusic.amp(0.2)
  this.sfxEngineStart = loadSound('assets/M_Retro Turn ON Long.wav')
  this.sfxEngineStart.amp(1)
  this.sfxEngineOn = loadSound('assets/M_ON.wav')
  this.sfxEngineOn.amp(1)
  this.sfxEngineOff = loadSound('assets/M_Retro Turn Off 12.wav')
  this.sfxEngineOff.amp(1)
  this.sfxShooting = loadSound('assets/Retro Gun Laser SingleShot 01.wav')
  this.sfxShooting.amp(1)
  this.sfxSaucer = loadSound('assets/Retro HiTech 08.wav')
  this.sfxSaucer.amp(1)
  this.sfxExplosion = loadSound('assets/Retro Explosion Short 01.wav')
  this.sfxExplosion.amp(1)
  this.sfxTeleport = loadSound('assets/Retro PowerUP 23.wav')
  this.sfxTeleport.amp(0.1)
}

}