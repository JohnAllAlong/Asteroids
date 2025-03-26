class UI{
    constructor(world){
        this.world = world
        this.buttonX = windowWidth / 2
        this.buttonY = windowHeight / 2 + 100
        this.buttonW = 100
        this.buttonH = 50
    }

    titleScreen() {
        push();
        textAlign(CENTER, CENTER);
        textSize(50);
        fill("green");
        text("ASTEROIDS", windowWidth / 2, windowHeight / 2 - 50);
        rectMode(CENTER)
        //Play Button
        fill("red")
        rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH)
        fill('black')
        textSize(20)
        text("PLAY", this.buttonX, this.buttonY)
        pop();
      }

      gameOverScreen(){
        push();
        textAlign(CENTER, CENTER);
        textSize(50);
        fill("blue");
        text("GAME OVER", windowWidth / 2, windowHeight / 2 - 50);
        rectMode(CENTER)
        //Play Button
        fill("red")
        rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH)
        fill('black')
        textSize(20)
        text("RESET", this.buttonX, this.buttonY)
        pop();
      }

      inGameUI(){

      }

      buttonToPress(xPos, yPos){
        if(xPos >= this.buttonX - this.buttonW / 2 && xPos <= this.buttonX + this.buttonW / 2 && yPos >= this.buttonY - this.buttonH / 2 && yPos <= this.buttonY + this.buttonH / 2){
            if(!this.world.gameOver){
                this.world.playButtonPressed()
            }
            else{
                this.world.resetButtonPressed()
            }

          }
      }
}