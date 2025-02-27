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
    this.maxBullets = 10;
    this.currentBullets = 0;
    this.bullets = [];
  }

  display() {
    this.drawShip();
    if (this.bullets.length != 0) {
      for (let i = 0; i < this.bullets.length; ++i) {
        this.bullets[i].display();
      }
    }
  }

  update() {
    this.updatePosition();
    this.detectInput();
    if (this.bullets.length != 0) {
      for (let j = 0; j < this.bullets.length; ++j) {
        this.bullets[j].update();
        if (this.bullets[j].isDead) {
          this.bullets.splice(this.bullets[j], 1);
          this.currentBullets--
        }
      }
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
      this.canFire = false;
    } else {
      this.canFire = true;
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
  }

  fireProjectile() {
    if (this.currentBullets < this.maxBullets && this.canFire) {
      this.bullet = new Projectile(this.position, this.target, 5);
      this.bullets.push(this.bullet);
      this.currentBullets++;
    }
    //Set up a reference to the projectile class above, then spawn a projectile here
  }
}
