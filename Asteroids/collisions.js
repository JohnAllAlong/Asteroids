
class Collisions {
  constructor(world) {
    this.world = world;
    this.a = this.world.spawner.asteroids;
    this.p = this.world.spawner.projectiles;
    //(this.masterArray = []), [];
  }

  checkAsteroidsAndProjectiles() {
    if (this.a.length != 0) {
      for (let i = 0; i < this.a.length; ++i) {
        this.aLocation = this.a[i].position;
        this.aRad = this.a[i].size / 2;
        if (this.p.length != 0) {
          for (let j = 0; j < this.p.length; ++j) {
            this.pLocation = this.p[j].spawnPos;
            this.pRad = this.p[j].size / 2;
            if (
              this.pLocation.x + this.pRad > this.aLocation.x - this.aRad &&
              this.pLocation.x - this.pRad < this.aLocation.x + this.aRad &&
              this.pLocation.y + this.pRad > this.aLocation.y - this.aRad &&
              this.pLocation.y - this.pRad < this.aLocation.y + this.aRad
            ) {
              this.p.splice(j, 1);
              this.world.spawner.destroyAsteroid(i);
              return;
              
            }
          }
        }
      }
    }
  }
}
