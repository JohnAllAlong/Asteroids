class Saucer {
  constructor(x, y, world, sizeMult) {
    this.x = x;
    this.y = y;
    this.movementSpeed = 1.5;
    this.position = createVector(this.x, this.y);
    this.velocity = createVector(1, 0);
    this.maxBullets = 1;
    this.currentBullets = 0;
    this.bulletSpeed = 6;
    this.sizeMult = sizeMult;
    this.height = 15 * this.sizeMult;
    this.width = 25 * this.sizeMult;
    this.rad = Math.max(this.height, this.width) / 2;
    this.world = world;
    this.bullets = 0;
    this.currentTime = 0;
    this.fireRate = 1;
    this.fillColor = "green";
    this.scoreVal = 0;
    this.target = createVector(0, 0);
    this.differential = 0;
    this.player = this.world.spawner.players[0];
    if (this.sizeMult == 1) {
      this.scoreVal = 1000;
      this.aimVariance = 50;
    } else if (this.sizeMult == 2) {
      this.scoreVal = 200;
      this.aimVariance = 100;
    }
  }

  display() {
    push();
    strokeWeight(1);
    stroke("white");
    fill(this.fillColor);
    ellipse(this.position.x, this.position.y, this.width, this.height);
    pop();
  }

  update() {
    this.shootTimer();
    this.force = p5.Vector.mult(this.velocity, this.movementSpeed);
    this.wrapAround();
    this.position.add(this.force);
    if (this.target != null) {
      stroke("green");
      if (this.player.score >= 5000) {
        stroke("red");
      }
      line(this.position.x, this.position.y, this.target.x, this.target.y);
    }
  }

  wrapAround() {
    if (this.position.x - this.rad + 1 > windowWidth) {
      this.position.x = 1 - this.rad;
    }
    if (this.position.x < 0 - this.rad + 1) {
      this.position.x = windowWidth + this.rad - 1;
    }
    if (this.position.y - this.rad + 1 > windowHeight) {
      this.position.y = 1 - this.rad;
    }
    if (this.position.y < 0 - this.rad + 1) {
      this.position.y = windowHeight + this.rad - 1;
    }
  }

  shootTimer() {
    this.currentTime += millis() / 1000 / frameCount;
    if (this.currentTime >= this.fireRate) {
      this.targetPlayer();
      this.world.spawner.spawnProjectile(
        this.position,
        this.target,
        this.bulletSpeed,
        "Enemy",
        2,
        "yellow"
      );
      this.bullets++;
      this.currentTime = 0;
    }
  }

  //M3
  //Make this math better. Right now it is sad.
  targetPlayer() {
    if (this.sizeMult == 1) {
      this.aimVariance = this.aimVariance / (this.player.score / 100 + 1);
      if (this.player.score >= 5000) {
        this.multVel = p5.Vector.mult(
          this.player.velocity,
          300 / this.bulletSpeed
        );
        this.direction = p5.Vector.add(this.player.position, this.multVel);
      } else {
        this.direction = this.player.position;
      }
    } else {
      this.direction = this.player.position;
    }
    this.differential = random(0, 1);
    if (this.differential <= 0.5) {
      this.target = createVector(
        this.direction.x - this.aimVariance,
        this.direction.y + this.aimVariance
      );
    } else {
      this.target = createVector(
        this.direction.x + this.aimVariance,
        this.direction.y - this.aimVariance
      );
    }
  }
}
