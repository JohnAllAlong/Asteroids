class PlayerShip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rotationSpeed = 0.1
  }

  display() {
    this.drawShip();
  }

  drawShip() {

    translate(this.x, this.y);
    rotate(2)
    fill("blue");
    strokeWeight(2);
    stroke("gold");
    beginShape();
    vertex(0, -15);
    vertex(-15, 15);
    vertex(-5, 15);
    vertex(0, 8);
    vertex(5, 15);
    vertex(15, 15);
    endShape(CLOSE);
    fill('red')
    circle(0,0, 1)
  }

  drawLeftThruster() {}
  updateRotation(rotation){}
}
