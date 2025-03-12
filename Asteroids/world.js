class World {
  constructor() {
    this.spawner = new Spawner(this);
    this.cMatrix = new Collisions(this);
  }

  start() {
    this.spawner.spawnAsteroids();
    this.spawner.spawnPlayerShip();
  }

  display() {
    this.spawner.player.display();
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
  }

  update() {
    this.cMatrix.checkAsteroidsAndProjectiles();
    this.spawner.player.update();
    if (this.spawner.asteroids.length != 0) {
      for (let j = 0; j < this.spawner.asteroids.length; ++j) {
        this.spawner.asteroids[j].update();
      }
    }
    if (this.spawner.projectiles.length != 0) {
      for (let k = 0; k < this.spawner.projectiles.length; ++k) {
        this.spawner.projectiles[k].update();
      }
    }
  }
}
