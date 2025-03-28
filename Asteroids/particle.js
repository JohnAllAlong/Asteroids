class Particle {
  constructor(world, object, position, direction, size) {
    this.world = world;
    this.size = size;
    this.direction = direction;
    this.position = position;
    this.lifetime = 0.5;
    this.currentTime = 0;
    this.speed = random(0.5, 1.2);
    this.object = object;
    this.rad = this.size / 2;
  }

  display() {
    if (this.object == "a") {
      this.speed = random(5, 12);
      fill("orange");
      circle(this.position.x, this.position.y, this.size);
    } else if (this.object == "s") {
      this.speed = random(2, 4);
      fill("blue");
      square(this.position.x, this.position.y, this.size);
    } else if (this.object == "p") {
      this.speed = random(2, 4);
      fill("green");
      ellipse(this.position.x, this.position.y, this.size, this.size * 2);
    } else {
      gfdmsgfdsg;
    }
  }

  update() {
    this.force = p5.Vector.mult(this.direction, this.speed);
    this.position.add(this.force);
    this.currentTime += millis() / 1000 / frameCount;
    if (this.currentTime >= this.lifetime) {
      this.isDead = true;
    }
  }

}
