class Saucer {
  constructor(x, y, world, sizeMult) {
    this.x = x;
    this.y = y;
    this.movementSpeed = 1.5;
    this.position = createVector(this.x, this.y);
    this.velocity = createVector(1, 0);
    this.maxBullets = 1;
    this.currentBullets = 0;
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
  }

  display() {
    fill(this.fillColor);
    ellipse(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (this.sizeMult == 1) {
      this.scoreVal = 1000;
    } else if (this.sizeMult == 2) {
      this.scoreVal = 200;
    }
    this.shootTimer();
    this.force = p5.Vector.mult(this.velocity, this.movementSpeed);
    this.wrapAround();
    this.position.add(this.force);
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
      this.target = createVector(-0.05, 0.05);
      this.world.spawner.spawnProjectile(
        this.position,
        this.target,
        30,
        "Enemy",
        5,
        "yellow"
      );
      this.bullets++;
      this.currentTime = 0;
    }
  }
}
