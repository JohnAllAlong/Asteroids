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
let bulletSpeed = 5;
let button;
let reset;
let gameStarted;
let particles = [];
let particle;
let bgMusic;
let sfxEngine
let sfxShooting
let sfxSaucer
let sfxExplosion
let sfxTeleport

function preload(){
  soundFormats('mp3', 'wav')
  bgMusic = loadSound('assets/abandoned-space-station-305773.mp3');
  //sfxEngine = 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  world = new World();
  world.start();
  player = world.spawner.players[0];
  textSize(25);
  noStroke();
  gameStarted = false;
  button = createButton("Play");
  button.position(windowWidth / 2 - 25, windowHeight / 2 + 50);
  //bgMusic.play()
}

function draw() {
  background(10);
  frameRate(60);

  if (!gameStarted) {
    titleScreen();
    return;
  }

  if (player.currentLives <= 0) {
    gameOverScreen();
  } else {
    push();
    fill("red");
    text("Player Lives: " + player.currentLives, 10, 50);
    fill("red");
    text("Score: " + player.score, width - 150, 50);
    pop();

    world.update();
    world.display();
    detectInput();
    if (particles.length != 0) {
      for (let j = 0; j < particles.length; ++j) {
        particles[j].display();
        particles[j].update();
      }
    }
    if (world.spawner.particles.length != 0) {
      for (q = 0; q < world.spawner.particles.length; ++q) {
        console.log(world.spawner.particles[q].ahVector);
      }
    }
  }
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
      if (player.currentBullets < player.maxBullets && player.canFire) {
        world.spawner.spawnProjectile(
          player.position,
          player.direction,
          bulletSpeed,
          "Player",
          3,
          "green"
        );
        player.getBulletInfo();
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

function gameOverScreen() {
  push();
  //background(0);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill("blue");
  text("GAME OVER", windowWidth / 2, windowHeight / 2 - 50);
  reset = createButton("Reset");
  reset.position(windowWidth / 2 - 25, windowHeight / 2 + 50);
  reset.mousePressed(resetGame);
  pop();
}

function playButtonPressed() {
  gameStarted = true;
  bgMusic.loop()
  button.hide();
}

//M3
function resetGame() {
  window.location.reload();
}

/*function spawnyParty() {
  let numParticles = 10;
  for (let b = 0; b < numParticles; ++b) {
    let randomVector = createVector(random(-1, 1), random(-1, 1));
    let startMosPos = createVector(mouseX, mouseY);
    particle = new Particle(world, startMosPos, randomVector, random(0.5, 2));
    particles.push(particle);
  }
}*/
