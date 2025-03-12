//CONTROLS//
//A AND D TO ROTATE
//UP ARROW TO FIRE ENGINE
//SPACEBAR TO SHOOT

let spawner;
let player;
let world;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //spawner = new Spawner();
  //spawner.spawnPlayerShip();
  //spawner.spawnAsteroids();
  world = new World();
  world.start();
  player = world.spawner.player;
}

function draw() {
  background(10);
  frameRate(60);
  world.update();
  world.display();
  detectInput();
  console.log(world.spawner.asteroids.length);
}

function keyPressed() {
  if (key === "j") {
    world.spawner.spawnAsteroids();
  }
  if (key === "k") {
    world.spawner.destroyAsteroid(0);
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
        world.spawner.spawnProjectile(player.position, player.target, 40);
      }
      player.canFire = false;
    } else {
      player.canFire = true;
    }
  }
}
