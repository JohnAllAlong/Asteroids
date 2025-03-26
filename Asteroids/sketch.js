//CONTROLS//
//A AND D TO ROTATE
//UP ARROW TO FIRE ENGINE
//SPACEBAR TO SHOOT
//T TO TELEPORT

//DEV CONTROLS//
//J TO SPAWN ASTEROIDS
//K TO DESTROY ONE ASTEROID

//Should just go through world to access player?

let world;
let button;
let reset;

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

  //If the game has not started, only show the title screen and don't run the rest of the draw function.
  if (!world.gameStarted) {
    world.ui.titleScreen();
    return;
  }
  //Could maybe set this to checking a bool on the player, but is that really any more performant?
  //I could set up a function on the world that gets called when the player has died, then this could be checking that world value instead but again, benefit?
  if (world.spawner.players[0].isDead) {
    world.ui.gameOverScreen();
  } else {
    //Displaying the player lives and score. Is this where I have to be more explicit about my fill and stroke so that it doesn't get weird.
    push();
    textSize(25);
    noStroke();
    fill("red");
    text("Player Lives: " + world.spawner.players[0].currentLives, 10, 50);
    fill("red");
    text("Score: " + world.spawner.players[0].score, width - 150, 50);
    pop();

    //Again, calling the main update and display functions on the world so as not to clutter the sketch file.
    world.update();
    world.display();
    //If the player exists we are checking for input.
    if (world.spawner.players[0] != null){
      world.spawner.players[0].detectInput();
    }
  }
}

//Cheat Codes. Could check for them in player but I want to keep them separate so I remember to remove them.
function keyPressed() {
  if (key === "j") {
    world.spawner.spawnAsteroids();
  }
  if (key === "k") {
    world.spawner.destroyAsteroid(0);
  }
}

function resetGame() {
  window.location.reload();
}

function mousePressed(){
  console.log("CLICKY")
  world.ui.buttonToPress(mouseX, mouseY)
  console.log('DISU')
}