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
    this.maxBullets = 5;
    this.currentBullets = 0;
    this.colliderSize = 30;
    this.diameter = 40;
    this.rad = this.diameter / 2;
    this.canCollide = true;
    this.fillColor = color(0, 100, 200, 150);
    this.invulnerableTimer = 2;
    this.currentTime = this.invulnerableTimer + 1;
    this.startLives = 30;
    this.currentLives = this.startLives;
    this.earnedLives = 0
    this.score = 0;
    this.addLivesAtScore = 10000;
  }

  display() {
    this.drawShip();
    this.drawShield();
  }

  update() {
    this.updatePosition();
    this.currentTime += millis() / 1000 / frameCount;
    if (this.currentTime >= this.invulnerableTimer) {
      this.canCollide = true;
    }
    if (this.currentLives < 0) {
      this.currentLives = 0;
    }
    if(this.score >= this.addLivesAtScore + (this.addLivesAtScore * this.earnedLives)){
      this.earnedLives += 1;
      this.currentLives += 1;
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
    pop();
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
    this.wrapAround();
    if (this.isEngineActive) {
      this.velocity.add(this.target);
    }
    this.position.add(this.velocity);
    this.velocity.mult(0.98);
    if (this.velocity.mag() <= 0.09) {
      this.velocity.set(0, 0);
    }
  }

  getBulletInfo() {
    if (this.currentBullets < this.maxBullets && this.canFire) {
      this.velocity.sub(p5.Vector.mult(this.target, 5));
      this.position.add(this.velocity);
    }
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
  resetPlayerShip() {
    this.currentLives--;
    this.position = createVector(windowWidth / 2, windowHeight / 2);
    this.velocity.set(0, 0);
    this.angle = 0;
    this.canCollide = false;
    this.currentTime = 0;
  }

  drawShield() {
    if (this.canCollide == false) {
      noStroke();
      fill(this.fillColor);
      circle(this.position.x, this.position.y, this.rad * 3);
    }
  }

  teleport() {
    this.position = createVector(
      random(0, windowWidth),
      random(0, windowHeight)
    );
  }
}
