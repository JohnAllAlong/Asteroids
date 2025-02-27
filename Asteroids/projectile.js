class Projectile {
  constructor(position, direction, speed) {
    this.spawnPos = position.copy();
    this.forceDirection = direction.copy();
    this.speedMult = speed;
    
  }

  display() {
    fill("green");
    circle(this.spawnPos.x, this.spawnPos.y, 10);
  }

  update() {
    this.force = p5.Vector.mult(this.forceDirection, this.speedMult)
    this.spawnPos.add(this.force)
  }
}
