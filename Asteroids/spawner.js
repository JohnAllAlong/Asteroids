class Spawner {
  constructor(world) {
    this.world = world;
    this.asteroids = [];
    this.startNum = 1;
    this.projectiles = [];
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
        this.asteroids.splice(this.asteroids[index], 1);
        return;
      }
      for (let j = 0; j < 2; ++j) {
        this.heading = random(0, TWO_PI);
        this.pozish = this.asteroids[index].startPos.copy();
        this.asteroid = new Asteroid(
          this.pozish,
          this.heading,
          this.asteroids[index].sizeMult + 1
        );
        this.asteroids.push(this.asteroid);
      }
    }
    this.asteroids.splice(this.asteroids[index], 1);
  }

  spawnProjectile(position, target, size) {
    this.bullet = new Projectile(position, target, size);
    this.projectiles.push(this.bullet);
  }

  spawnPlayerShip() {
    this.player = new PlayerShip(windowWidth / 2, windowHeight / 2);
  }
}
