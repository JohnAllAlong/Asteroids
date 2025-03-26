class PlayerShip {
  constructor(x, y, world) {
    this.x = x;
    this.y = y;
    this.rotationSpeed = 0.1;
    this.movementSpeed = 0.1;
    this.angle = 0;
    this.position = createVector(this.x, this.y);
    this.target = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.isEngineActive = false;
    this.maxBullets = 5;
    this.currentBullets = 0;
    this.bulletSpeed = 5
    this.colliderSize = 30;
    this.diameter = 40;
    this.rad = this.diameter / 2;
    this.canCollide = true;
    this.fillColor = color(0, 100, 200, 150);
    this.invulnerableTimer = 2;
    this.currentTime = this.invulnerableTimer + 1;
    this.startLives = 3;
    this.currentLives = this.startLives;
    this.earnedLives = 0;
    this.score = 0;
    //BONUS LIFE
    this.addLivesAtScore = 10000;
    this.world = world
    this.canTeleport = false;
  }

  display() {
    this.drawShip();
    this.drawShield();
    if (this.target != null) {
      stroke("yellow");
      line(
        this.position.x,
        this.position.y,
        this.direction.x,
        this.direction.y
      );
    }
  }

  update() {
    this.updatePosition();
    this.velMag = p5.Vector.mag(this.velocity)
    this.currentTime += millis() / 1000 / frameCount;
    if (this.currentTime >= this.invulnerableTimer) {
      this.canCollide = true;
    }
    if (this.currentLives <= 0) {
      this.currentLives = 0;
    }
    if (
      this.score >=
      this.addLivesAtScore + this.addLivesAtScore * this.earnedLives
    ) {
      this.earnedLives += 1;
      this.currentLives += 1;
    }
    this.engineSounds()
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

  engineSounds(){
    if(this.isEngineActive){
        this.world.sfx.engineOff.stop()
        this.world.sfx.engineStopped = false;
        if(!this.world.sfx.engineStart.isPlaying() && this.world.sfx.engineStarted == false){
          this.world.sfx.engineStart.play()
          this.world.sfx.engineStarted = true;
        }
      else if(this.velMag >= 0.1 && !this.world.sfx.engineOn.isPlaying() && !this.world.sfx.engineStart.isPlaying()){
        this.world.sfx.engineOn.loop()
      }
      
    }
    else{
      this.world.sfx.engineStart.stop()
      this.world.sfx.engineStarted = false
      this.world.sfx.engineOn.stop()
      if(!this.world.sfx.engineOff.isPlaying() && this.world.sfx.engineStopped == false)
      this.world.sfx.engineOff.play()
      this.world.sfx.engineStopped = true;
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

    this.wrapAround();
    if (this.isEngineActive) {
      this.velocity.add(this.target);
    }
    this.position.add(this.velocity);
    this.direction = p5.Vector.add(this.position, this.target);
    this.velocity.mult(0.98);
    if (this.velocity.mag() <= 0.09) {
      this.velocity.set(0, 0);
    }
  }

  getBulletInfo() {
    this.velocity.sub(p5.Vector.mult(this.target, 5));
    this.position.add(this.velocity);
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
    this.world.sfx.engineStart.stop()
    this.world.sfx.engineOn.stop()
    this.world.sfx.engineOff.stop()
    this.world.sfx.engineStarted = false
  }

  drawShield() {
    if (this.canCollide == false) {
      noStroke();
      fill(this.fillColor);
      circle(this.position.x, this.position.y, this.rad * 3);
    }
  }

  teleport() {
    if(this.canTeleport){
    this.position = createVector(
      random(0, windowWidth),
      random(0, windowHeight)
    );
    this.currentTime = this.invulnerableTimer
    this.world.sfx.teleport.play()
  }
  }

  detectInput() {
      if (keyIsDown("65")) {
        this.updateRotation(-1);
      }
      if (keyIsDown("68")) {
        this.updateRotation(1);
      }
      if(keyIsDown("84")){
          this.teleport();
          this.canTeleport = false
      }
      else{
        this.canTeleport = true;
      }
      if (keyIsDown(UP_ARROW)) {
        this.isEngineActive = true;
      } else {
        this.isEngineActive = false;
      }
      if (keyIsDown("32")) {
        if (this.currentBullets < this.maxBullets && this.canFire) {
          this.world.spawner.spawnProjectile(
            this.position,
            this.direction,
            this.bulletSpeed,
            "Player",
            3,
            "green"
          );
          this.getBulletInfo();
        }
        this.canFire = false;
      } else {
        this.canFire = true;
      }
    
  }
}
