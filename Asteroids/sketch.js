let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new PlayerShip(windowWidth / 2, windowHeight / 2);
}

function draw() {
  background(10);
  frameRate(60);
  player.update();
  player.display();
  if (player.bullet != null) {
    console.log(player.bullet.spawnPos.x);
    console.log(player.bullet.spawnPos.y);
  }
}
