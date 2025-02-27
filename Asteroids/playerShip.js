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
    this.isEngineActive = false;
    this.canFire = true;
  }

  display() {
    this.drawShip();
    if (this.bullet != null) {
      this.bullet.display();
    }
  }

  update() {
    this.updatePosition();
    this.detectInput();
    if (this.bullet != null) {
      this.bullet.update();
    }
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
      this.isEngineActive = true;
    } else {
      this.isEngineActive = false;
    }
    if (keyIsDown("32")) {
      this.fireProjectile();
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
    this.target.x = cos(this.angle - HALF_PI) * this.movementSpeed;
    this.target.y = sin(this.angle - HALF_PI) * this.movementSpeed;
    if (this.isEngineActive) {
      this.velocity.add(this.target);
    }
    this.position.add(this.velocity);
    this.velocity.mult(0.98);
    //this.target.set(0, 0);
  }

  fireProjectile() {
    if (this.canFire) {
      this.bullet = new Projectile(this.position, this.target, 30);
      this.canFire = false;
    }
    //Set up a reference to the projectile class above, then spawn a projectile here
  }
}
