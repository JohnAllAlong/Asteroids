class PlayerShip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rotationSpeed = 0.05;
    this.movementSpeed = 0.1;
    this.angle = 0;
    this.position = createVector(this.x, this.y);
  }

  display() {
    this.drawShip();
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
    if (keyIsDown("32")) {
      this.updatePosition(1);
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

  updatePosition(input) {}
}
