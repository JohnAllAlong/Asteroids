class Spawner {
  constructor() {
    this.asteroids = [];
    this.startNum = 5;
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
      //console.log(asteroids.length)
    }
  }

  destroyAsteroid(index) {
    for (let i = 0; i < 2; ++i) {
      this.heading = random(0, TWO_PI);
      this.pozish = this.asteroids[index].startPos.copy();

      if (this.asteroids[index].sizeMult >= 3) {
        this.asteroids.splice(this.asteroids[index], 1);
        break;
      }
      this.asteroid = new Asteroid(
        this.pozish,
        this.heading,
        this.asteroids[index].sizeMult + 1
      );
      this.asteroids.push(this.asteroid);
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
