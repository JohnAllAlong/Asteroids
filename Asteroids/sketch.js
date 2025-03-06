//CONTROLS//
//A AND D TO ROTATE
//UP ARROW TO FIRE ENGINE
//SPACEBAR TO SHOOT

let player;
let asteroid;
let asteroids = [];
let startNum = 5;
let currentNum = 0;
let heading = 0;
let startDirection

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new PlayerShip(windowWidth / 2, windowHeight / 2);  
}

function draw() {
  background(10);
  frameRate(60);
  for(let i = currentNum; i < startNum; ++i){

    heading = random(0, TWO_PI)
    startDirection = createVector(random(0, windowWidth), random(0, windowHeight))
    asteroid = new Asteroid(startDirection, heading, 1)
    asteroids.push(asteroid)
    currentNum++
  }
  player.update();
  player.display();
  if (player.bullet != null) {
    console.log(player.currentBullets);
  }

  for(let j = 0; j < asteroids.length; ++j){
    asteroids[j].display()
  asteroids[j].update()
  }
  
}
