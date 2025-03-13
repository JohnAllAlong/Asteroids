
class Collisions {
  constructor(world) {
    this.world = world;
    this.a = this.world.spawner.asteroids;
    this.b = this.world.spawner.projectiles;
    //(this.masterArray = []), [];
  }

  checkAsteroidsAndBullets() {
    if (this.a.length != 0) {
      for (let i = 0; i < this.a.length; ++i) {
        this.aLocation = this.a[i].position;
        this.aRad = this.a[i].size / 2;
        if (this.b.length != 0) {
          for (let j = 0; j < this.b.length; ++j) {
            this.bLocation = this.b[j].position;
            this.bRad = this.b[j].size / 2;
            if (
              this.bLocation.x + this.bRad > this.aLocation.x - this.aRad &&
              this.bLocation.x - this.bRad < this.aLocation.x + this.aRad &&
              this.bLocation.y + this.bRad > this.aLocation.y - this.aRad &&
              this.bLocation.y - this.bRad < this.aLocation.y + this.aRad
            ) {
              this.b.splice(j, 1);
              this.world.spawner.player.currentBullets--
              this.world.spawner.destroyAsteroid(i);
              return;
              
            }
          }
        }
        //Player and Asteroids
        if(this.world.spawner.player != null){
          this.pLocation = this.world.spawner.player.position
          this.pRad = this.world.spawner.player.rad
          if(
            this.pLocation.x + this.pRad > this.aLocation.x - this.aRad &&
            this.pLocation.x - this.pRad < this.aLocation.x + this.aRad &&
            this.pLocation.y + this.pRad > this.aLocation.y - this.aRad &&
            this.pLocation.y - this.pRad < this.aLocation.y + this.aRad)
            {
              this.world.spawner.destroyAsteroid(i);
              return;
            }
        }
        //Saucer and Asteroids
        if(this.world.spawner.saucer != null){
          this.sLocation = this.world.spawner.saucer.position
          this.sRad = this.world.spawner.saucer.rad
          if(
            this.sLocation.x + this.sRad > this.aLocation.x - this.aRad &&
            this.sLocation.x - this.sRad < this.aLocation.x + this.aRad &&
            this.sLocation.y + this.sRad > this.aLocation.y - this.aRad &&
            this.sLocation.y - this.sRad < this.aLocation.y + this.aRad)
            {
              this.world.spawner.destroyAsteroid(i);
              return;
            }
            if(
              this.sLocation.x + this.sRad > this.pLocation.x - this.pRad &&
            this.sLocation.x - this.sRad < this.pLocation.x + this.pRad &&
            this.sLocation.y + this.sRad > this.pLocation.y - this.pRad &&
            this.sLocation.y - this.sRad < this.pLocation.y + this.pRad)
            {
              this.world.spawner.saucer.fillColor = 'yellow'
            }
            else{
              this.world.spawner.saucer.fillColor = 'green'
            }
            
        }
      }
    }
  }
}
