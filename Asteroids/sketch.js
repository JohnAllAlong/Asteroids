let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new PlayerShip(windowWidth / 2, windowHeight / 2);
}

function draw() {
  background(10);
  player.detectInput();
  player.display();
}
