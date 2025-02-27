class PlayerShip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rotationSpeed = 0.1;
    this.movementSpeed = 0.1;
    this.angle = 0;
    this.position = createVector(this.x, this.y);
    this.target = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.activeEngine = 0;
  }

  display() {
    this.drawShip();
  }

  update() {
    this.detectInput();
    this.updatePosition();
  }

  drawShip() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    fill("blue");
    strokeWeight(2);
    stroke("gold");
    beginShape();
    vertex(0, -20);
    vertex(-15, 10);
    vertex(-5, 10);
    vertex(0, 3);
    vertex(5, 10);
    vertex(15, 10);
    endShape(CLOSE);
    noStroke();
    fill("red");
    circle(0, 0, 3);
    pop();
  }

  drawLeftThruster() {}

  detectInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.updateRotation(-1);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.updateRotation(1);
    }
    if (keyIsDown(UP_ARROW)) {
      this.activeEngine = 1;
    } else {
      this.activeEngine = 0;
    }
  }

  updateRotation(input) {
    this.angle = this.angle + input * this.rotationSpeed;
    if (this.angle < -PI) {
      this.angle = PI;
    } else if (this.angle > PI) {
      this.angle = -PI;
    }
  }

  updatePosition() {
    this.target.x =
      cos(this.angle - HALF_PI) * this.activeEngine * this.movementSpeed;
    this.target.y =
      sin(this.angle - HALF_PI) * this.activeEngine * this.movementSpeed;
    this.velocity.add(this.target);
    this.position.add(this.velocity);
    this.velocity.mult(0.99);
    this.target.set(0, 0);
  }
}
