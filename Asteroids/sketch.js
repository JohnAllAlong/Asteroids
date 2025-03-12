//CONTROLS//
//A AND D TO ROTATE
//UP ARROW TO FIRE ENGINE
//SPACEBAR TO SHOOT

let spawner;
let player;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawner = new Spawner();
  spawner.spawnPlayerShip();
  player = spawner.player;
  spawner.spawnAsteroids();
}

function draw() {
  background(10);
  frameRate(60);

  player.update();
  player.display();
  detectInput();

  if (spawner.projectiles.length != 0) {
    for (let k = 0; k < spawner.projectiles.length; ++k) {
      spawner.projectiles[k].display();
      spawner.projectiles[k].update();
      console.log(spawner.projectiles.length);
    }
  }

  if (spawner.asteroids.length != 0) {
    for (let j = 0; j < spawner.asteroids.length; ++j) {
      spawner.asteroids[j].display();
      spawner.asteroids[j].update();
    }
  }
}

function keyPressed() {
  if (key === "j") {
    spawner.spawnAsteroids();
  }
  if (key === "k") {
    spawner.destroyAsteroid(0);
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
        spawner.spawnProjectile(player.position, player.target, 40);
      }
      player.canFire = false;
    } else {
      player.canFire = true;
    }
  }
}
