class Spawner {
  constructor(world) {
    this.world = world;
    this.asteroids = [];
    this.startNum = 5;
    this.projectiles = [];
    this.saucers = [];
    this.players = [];
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
    this.saucer = new Saucer(50, 50, this.world, int(random(1, 3)));
    this.saucers.push(this.saucer);
  }
}
