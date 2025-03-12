class Projectile {
  constructor(position, direction, speed) {
    this.position = position.copy();
    this.forceDirection = direction.copy();
    this.speedMult = speed;
    this.lifetime = 3;
    this.currentTime = 0;
    this.isDead = false;
    this.size = 10;
    this.rad = this.size / 2
  }

  display() {
    noStroke();
    fill("green");
    circle(this.position.x, this.position.y, this.size);
  }

  update() {
    this.force = p5.Vector.mult(this.forceDirection, this.speedMult);
    this.wrapAround()
    this.position.add(this.force);
    this.currentTime += millis() / 1000 / frameCount;
    if (this.currentTime >= this.lifetime) {
      this.isDead = true;
    }
  }

  wrapAround(){
    if(this.position.x - this.rad + 1 > windowWidth){
      this.position.x = 1 - this.rad
    }
    if(this.position.x < 0 - this.rad + 1){
      this.position.x = windowWidth + this.rad - 1
    }
    if(this.position.y - this.rad + 1 > windowHeight){
      this.position.y = 1 - this.rad
    }
    if(this.position.y < 0 - this.rad + 1){
      this.position.y = windowHeight + this.rad - 1
    }
  }
}
