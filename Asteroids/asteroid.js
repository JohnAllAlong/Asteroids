class Asteroid{

constructor(position, heading, size){

    this.startPos = position
    this.heading = heading
    this.size = size
    this.speed = 1
    this.velocity = createVector(0,0)
}

display(){
fill('red')
circle(this.startPos.x, this.startPos.y, 50)

}

update(){


this.velocity.x += cos(this.heading - HALF_PI) * this.speed
this.velocity.y += sin(this.heading - HALF_PI) * this.speed

this.startPos.add(this.velocity)
this.velocity = createVector(0, 0)

}


}