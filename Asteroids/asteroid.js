class Asteroid{

constructor(position, heading, size){

    this.startPos = position
    this.heading = heading
    this.base = 70
    this.size = this.base / size
    this.speedMult = size / 2
    this.velocity = createVector(0,0)
}

display(){
fill('red')
circle(this.startPos.x, this.startPos.y, this.size)

}

update(){

this.velocity.x += cos(this.heading - HALF_PI) * this.speedMult
this.velocity.y += sin(this.heading - HALF_PI) * this.speedMult

this.startPos.add(this.velocity)
this.velocity = createVector(0, 0)

}


}