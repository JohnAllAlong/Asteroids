class World {
  constructor() {
    this.spawner = new Spawner(this);
    this.cMatrix = new Collisions(this);
    this.a = this.spawner.asteroids;
    this.b = this.spawner.projectiles;
    this.s = this.spawner.saucers;
    this.p = this.spawner.players;
    this.knowledge = false;
  }

  start() {
    this.spawner.spawnAsteroids();
    this.spawner.spawnPlayerShip();
    this.spawner.spawnEnemySaucer();
  }

  display() {
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
  }

  update() {
    this.spawner.players[0].update();
    this.spawner.saucerSpawnInterval();
    if (this.spawner.asteroids.length != 0) {
      for (let j = 0; j < this.spawner.asteroids.length; ++j) {
        this.spawner.asteroids[j].update();
      }
    }
    if (this.spawner.projectiles.length != 0) {
      for (let k = 0; k < this.spawner.projectiles.length; ++k) {
        this.spawner.projectiles[k].update();
        if(this.spawner.projectiles[k].isDead == true){
          this.spawner.projectiles.splice(k, 1)
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

    //this.cMatrix.checkAsteroidsAndBullets();
  }
}
