//CONTROLS//
//A AND D TO ROTATE
//UP ARROW TO FIRE ENGINE
//SPACEBAR TO SHOOT
//T TO TELEPORT

//DEV CONTROLS//
//J TO SPAWN ASTEROIDS
//K TO DESTROY ONE ASTEROID

let world;

//Creating the instance of the world class first, then calling my custom preload function on the world which calls out to the sfx class and preloads the sfx and music.
function preload(){
  world = new World();
  world.preload()
}

//Regular setup stuff. Creating a canvas and the "Play" button. All other classes communicate with World, by way of the world's "Start" function.
function setup() {
  createCanvas(windowWidth, windowHeight);
  world.start();
}


function draw() {
  background(10);
  image(world.background, 0, 0, windowWidth, windowHeight)
  //If the game has not started, only show the title screen and don't run the rest of the draw function.
  if (!world.gameStarted) {
    world.ui.titleScreen();
    return;
  }
  else if (world.gameOver == true) {
    world.gameOverState();
  } 
  else {
    world.update();
    world.display();
    //If the player exists we are checking for input.
    if (world.spawner.players[0] != null){
      world.spawner.players[0].detectInput();
    }
  }
}

//Cheat Codes
function keyPressed() {
  if (key === "j") {
    world.spawner.spawnAsteroids();
  }
  if (key === "k") {
    world.spawner.destroyAsteroid(0);
  }
}

function mousePressed(){
  world.ui.buttonToPress(mouseX, mouseY)
}