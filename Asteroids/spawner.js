class Spawner {
  constructor(world) {
    this.world = world;
    this.asteroids = [];
    this.projectiles = [];
    this.saucers = [];
    this.players = [];
    this.particles = [];
    this.saucerCanSpawn = true;
    this.startNum = 1;
    this.saucerScoreInterval = 1200;
    this.saucersSpawned = 0;
    this.numParticles = 30;
    this.particleDirection = createVector(0, 0);
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
    this.world.sfx.shooting.play()
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
    this.player = new PlayerShip(windowWidth / 2, windowHeight / 2, this.world);
    this.players.push(this.player);
  }

  //M3
  spawnEnemySaucer() {
    if (this.saucerCanSpawn == true) {
      this.randomValue = random(0, 10);
      if (this.randomValue <= 3) {
        this.sizeMult = 1;
      } else {
        this.sizeMult = 2;
      }
      this.saucer = new Saucer(
        random(0, windowWidth),
        random(0, windowHeight),
        this.world,
        this.sizeMult
      );
      this.saucers.push(this.saucer);
      this.saucersSpawned++;
      this.saucerCanSpawn = false;
      this.world.sfx.saucer.play()
    }
  }

  //Find a better place to move saucer spawning/score logic
  //M3
  saucerSpawnInterval() {
    if (
      this.players[0].score >=
      this.saucerScoreInterval * this.saucersSpawned
    ) {
      this.saucerCanSpawn = true;
      this.spawnEnemySaucer();
    }
  }

  spawnParticles(objRef, type) {
    for (let w = 0; w < this.numParticles; ++w) {
      this.sizerino = random(3, 6);
      this.randomX = random(-windowWidth, windowWidth);
      this.randomY = random(-windowHeight, windowHeight);
      this.randomDir = createVector(this.randomX, this.randomY);
      this.randNorm = p5.Vector.normalize(this.randomDir);
      this.spawnPos = objRef.position.copy();
      this.particle = new Particle(
        this.world,
        type,
        this.spawnPos,
        this.randNorm,
        this.sizerino
      );
      this.particles.push(this.particle);
    }
  }

  destroyParticles() {
    if (this.particles.length != 0) {
      for (let v = 0; v < this.particles.length; ++v) {
        if (this.particles[v].isDead == true) {
          this.particles.splice(v, 1);
        }
      }
    }
  }
}
