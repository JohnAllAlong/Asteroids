class Projectile {
  constructor(position, direction, speed) {
    this.spawnPos = position.copy();
    this.forceDirection = direction.copy();
    this.speedMult = speed;
    this.lifetime = 2;
    this.currentTime = 0;
    this.isDead = false;
  }

  display() {
    noStroke()
    fill("green");
    circle(this.spawnPos.x, this.spawnPos.y, 10);
  }

  update() {
    this.force = p5.Vector.mult(this.forceDirection, this.speedMult);
    this.spawnPos.add(this.force);
    this.currentTime += millis() / 1000 / frameCount;
    if (this.currentTime >= this.lifetime) {
      this.isDead = true;
    }
  }
}
