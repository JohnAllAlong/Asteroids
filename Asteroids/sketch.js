//CONTROLS//
//A AND D TO ROTATE
//UP ARROW TO FIRE ENGINE
//SPACEBAR TO SHOOT

let player;
let asteroid;
let ya;
let asteroids = [];
let startNum = 5;
let currentNum = 0;
let children = 2;
let heading = 0;
let startPosition

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
    
  }

  if(asteroids.length != 0){
  for(let j = 0; j < asteroids.length; ++j){
    asteroids[j].display()
    asteroids[j].update()
  }
}
  //console.log(ya)
}

function keyPressed(){
  if(key === 'j'){
  spawnAsteroids()
  }
  if(key === 'k'){
    destroyAsteroids()
  }
}

function spawnAsteroids(){
  for(let i = currentNum; i < startNum; ++i){

    heading = random(0, TWO_PI)
    startPosition = createVector(random(0, windowWidth), random(0, windowHeight))
    asteroid = new Asteroid(startPosition, heading, 1)
    asteroids.push(asteroid)
    currentNum++
    //console.log(asteroids.length)
  }
}

function destroyAsteroids(){

    for(let m = 0; m < currentNum; ++m){
      for(let n = 0; n < children; ++n){
        heading = random(0, TWO_PI)
        let pozish = asteroids[0].startPos.copy()
        
        if(asteroids[0].sizeMult >= 3){
          asteroids.splice(asteroids[0], 1)
        }
          asteroid = new Asteroid(pozish, heading, asteroids[0].sizeMult + 1)
          asteroids.push(asteroid)
          console.log(asteroids[0].sizeMult)
        
      }
      asteroids.splice(asteroids[0], 1)
      
    }
    currentNum = asteroids.length
    
}
