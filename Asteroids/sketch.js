//CONTROLS//
//A AND D TO ROTATE
//UP ARROW TO FIRE ENGINE
//SPACEBAR TO SHOOT
//T TO TELEPORT

//DEV CONTROLS//
//J TO SPAWN ASTEROIDS
//K TO DESTROY ONE ASTEROID

let player;
let world;
let bulletSpeed = 40;
let button;
let gameStarted;

function setup() {
  createCanvas(windowWidth, windowHeight);
  world = new World();
  world.start();
  player = world.spawner.player;
  textSize(25);
  noStroke();
  gameStarted = false;
  button = createButton("Play");
  button.position(windowWidth / 2 - 25, windowHeight / 2 + 50);
}

function draw() {
  background(10);

  if (!gameStarted) {
    titleScreen();
    return;
  }

  frameRate(60);
  world.update();
  world.display();
  detectInput();
  push();
  fill("red");
  text("Player Lives: " + player.currentLives, 50, 50);
  text("Score: " + player.score, windowWidth - 150, 50);
  pop();
}

function keyPressed() {
  if (key === "j") {
    world.spawner.spawnAsteroids();
  }
  if (key === "k") {
    world.spawner.destroyAsteroid(0);
  }
  if (key === "t") {
    player.teleport();
  }
}

function detectInput() {
  if (player != null) {
    if (keyIsDown("65")) {
      player.updateRotation(-1);
    }
    if (keyIsDown("68")) {
      player.updateRotation(1);
    }
    if (keyIsDown(UP_ARROW)) {
      player.isEngineActive = true;
    } else {
      player.isEngineActive = false;
    }
    if (keyIsDown("32")) {
      player.getBulletInfo();
      if (player.currentBullets < player.maxBullets && player.canFire) {
        world.spawner.spawnProjectile(
          player.position,
          player.target,
          bulletSpeed,
          "Player",
          3,
          "green"
        );
      }
      player.canFire = false;
    } else {
      player.canFire = true;
    }
  }
}

function titleScreen() {
  push();
  textAlign(CENTER, CENTER);
  textSize(50);
  fill("green");
  text("ASTEROIDS", windowWidth / 2, windowHeight / 2 - 50);
  button.mousePressed(playButtonPressed);
  pop();
}

function playButtonPressed() {
  gameStarted = true;
  button.hide();
}
