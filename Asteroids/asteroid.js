class Asteroid {
  constructor(position, heading, sizeMult) {
    this.position = position;
    this.heading = heading;
    this.base = 70;
    this.sizeMult = sizeMult;
    this.size = this.base / this.sizeMult;
    this.rad = this.size / 2;
    this.speedMult = this.base / (this.size * 2);
    this.velocity = createVector(0, 0);
    if (this.sizeMult == 1) {
      this.scoreVal = 20;
    } else if (this.sizeMult == 2) {
      this.scoreVal = 50;
    } else if (this.sizeMult == 3) {
      this.scoreVal = 100;
    }
  }

  display() {
    stroke("white");
    strokeWeight(1);
    fill("red");
    circle(this.position.x, this.position.y, this.size);
  }

  update() {
    
    this.velocity.x += cos(this.heading - HALF_PI) * this.speedMult;
    this.velocity.y += sin(this.heading - HALF_PI) * this.speedMult;
    this.wrapAround();
    this.position.add(this.velocity);
    this.velocity = createVector(0, 0);
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
}
