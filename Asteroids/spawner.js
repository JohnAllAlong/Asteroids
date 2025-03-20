class Spawner {
  constructor(world) {
    this.world = world;
    this.asteroids = [];
    this.startNum = 1;
    this.projectiles = [];
    this.saucers = [];
    this.players = [];
    this.saucerCanSpawn = true;
    this.saucerScoreInterval = 1200;
    this.saucersSpawned = 0;
  }

  spawnAsteroids() {
    for (let i = 0; i < this.startNum; ++i) {
      this.heading = random(0, TWO_PI);
      this.startPosition = createVector(
        random(0, windowWidth),
        random(0, windowHeight)
      );
      this.asteroid = new Asteroid(this.startPosition, this.heading, 1);
      this.asteroids.push(this.asteroid);
    }
  }

  destroyAsteroid(index) {
    for (let k = 0; k < 1; ++k) {
      if (this.asteroids[index].sizeMult >= 3) {
        this.asteroids.splice(index, 1);
        return;
      }
      for (let j = 0; j < 2; ++j) {
        this.heading = random(0, TWO_PI);
        this.pozish = this.asteroids[index].position.copy();
        this.asteroid = new Asteroid(
          this.pozish,
          this.heading,
          this.asteroids[index].sizeMult + 1
        );
        this.asteroids.push(this.asteroid);
      }
    }
    this.asteroids.splice(index, 1);
  }

  spawnProjectile(position, target, speed, owner, lifetime, fillColor) {
    this.bullet = new Projectile(
      position,
      target,
      speed,
      owner,
      lifetime,
      fillColor
    );
    this.projectiles.push(this.bullet);
  }

  destroyProjectile() {
    for (let m = 0; m < this.projectiles.length; ++m) {
      if (this.projectiles[m].isDead == true) {
        this.projectiles.splice(m, 1);
        this.players[0].currentBullets--;
      }
    }
  }

  spawnPlayerShip() {
    this.player = new PlayerShip(windowWidth / 2, windowHeight / 2);
    this.players.push(this.player);
  }

  spawnEnemySaucer() {
    if(this.saucerCanSpawn == true){
    this.randomValue = random(0, 10)
      if(this.randomValue <= 3){
        this.sizeMult = 1
      }
      else{
        this.sizeMult = 2
      }
    this.saucer = new Saucer(50, 50, this.world, this.sizeMult);
    this.saucers.push(this.saucer);
    this.saucersSpawned++
    this.saucerCanSpawn = false
    }
  }

  //Find a better place to move saucer spawning/score logic

  saucerSpawnInterval(){
    if(this.players[0].score >= this.saucerScoreInterval * this.saucersSpawned){
      this.saucerCanSpawn = true
      this.spawnEnemySaucer()
    }
  }
}
