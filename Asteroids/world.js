class World {
  constructor() {
    this.spawner = new Spawner(this);
    this.cMatrix = new Collisions(this);
    this.a = this.spawner.asteroids;
    this.b = this.spawner.projectiles;
    this.s = this.spawner.saucers;
    this.p = this.spawner.players;
    this.sfx = new SFX()

    this.shakeCue = false;
    this.countem = 0;
    this.shakeDuration = 0.1;
  }

  preload(){
    this.sfx.initializeSFX()
  }

  start() {
    this.spawner.spawnAsteroids();
    this.spawner.spawnPlayerShip();
    this.spawner.spawnEnemySaucer();
    this.createPlayButton()
  }

  display() {
    this.shakeMe();
    this.spawner.players[0].display();
    if (this.spawner.asteroids.length != 0) {
      for (let j = 0; j < this.spawner.asteroids.length; ++j) {
        this.spawner.asteroids[j].display();
      }
    }
    if (this.spawner.projectiles.length != 0) {
      for (let k = 0; k < this.spawner.projectiles.length; ++k) {
        this.spawner.projectiles[k].display();
      }
    }
    if (this.spawner.saucers.length != 0) {
      for (let l = 0; l < this.spawner.saucers.length; ++l) {
        this.spawner.saucers[l].display();
      }
    }
    if (this.spawner.particles.length != 0) {
      for (let m = 0; m < this.spawner.particles.length; ++m) {
        this.spawner.particles[m].display();
      }
    }
  }

  update() {
    this.spawner.players[0].update();
    this.spawner.saucerSpawnInterval();
    this.playButton.mousePressed(this.playButtonPressed)
    if (this.spawner.particles.length != 0) {
      for (let q = 0; q < this.spawner.particles.length; ++q) {
        this.spawner.particles[q].update();
      }
    }
    if (this.spawner.asteroids.length != 0) {
      for (let j = 0; j < this.spawner.asteroids.length; ++j) {
        this.spawner.asteroids[j].update();
      }
    }
    if (this.spawner.projectiles.length != 0) {
      for (let k = 0; k < this.spawner.projectiles.length; ++k) {
        this.spawner.projectiles[k].update();
        if (this.spawner.projectiles[k].isDead == true) {
          this.spawner.projectiles.splice(k, 1);
        }
      }
    }
    if (this.spawner.saucers.length != 0) {
      for (let l = 0; l < this.spawner.saucers.length; ++l) {
        this.spawner.saucers[l].update();
      }
    }

    this.cMatrix.genericCollisionCheck(this.a, this.p);
    this.cMatrix.genericCollisionCheck(this.a, this.b);
    this.cMatrix.genericCollisionCheck(this.a, this.s);
    this.cMatrix.genericCollisionCheck(this.b, this.s);
    this.cMatrix.genericCollisionCheck(this.b, this.p);
    this.cMatrix.genericCollisionCheck(this.s, this.p);

    this.spawner.destroyParticles();
  }

  shakeMe() {
    if (this.shakeCue == true) {
      this.sVal = random(-5, 5);
      translate(this.sVal, this.sVal);
      this.countem += 1;
      if (this.countem >= this.shakeDuration * frameRate()) {
        this.shakeCue = false;
        this.countem = 0;
      }
    }
  }

  shakeCueterie() {
    this.countem = 0;
    //TO DO CHANGE ME AHHH SHOULD BE TRUE ONLY FALSE FOR TESTING
    this.shakeCue = true;
  }

  createPlayButton(){
    this.playButton = createButton("Play");
    this.playButton.position(windowWidth / 2 - 25, windowHeight / 2 + 50);
  }

  playButtonPressed() {
    this.playButton.hide()
    gameStarted = true;
    this.sfx.bgMusic.loop()
  }

}
