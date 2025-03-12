class Saucer{
    constructor(x, y){
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


}