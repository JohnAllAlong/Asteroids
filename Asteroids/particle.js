class Particle {
  constructor(world, position, direction, size) {
    this.world = world;
    this.size = size;
    this.direction = direction;
    this.position = position;
    this.lifetime = 0.5;
    this.currentTime = 0;
    this.speed = random(0.8, 1.2);
  }

  display() {
    fill("orange");
    circle(this.position.x, this.position.y, this.size);
  }

  update() {
    //this.position.add(createVector(random(-1, 1), random(-1, 1)));
    this.force = p5.Vector.mult(this.direction, this.speed);
    this.position.add(this.force);
    this.currentTime += millis() / 1000 / frameCount;
    if (this.currentTime >= this.lifetime) {
      this.isDead = true;
    }
  }
}
