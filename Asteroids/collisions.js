class Collisions {
  constructor(world) {
    this.world = world;
    this.a = this.world.spawner.asteroids;
    this.b = this.world.spawner.projectiles;
    this.s = this.world.spawner.saucers;
    //(this.masterArray = []), [];
  }

  checkAsteroidsAndBullets() {
    if (this.a.length != 0) {
      for (let i = 0; i < this.a.length; ++i) {
        this.aLocation = this.a[i].position;
        this.aRad = this.a[i].size / 2;
        //Player and Asteroids
        if (this.world.spawner.player != null) {
          this.pLocation = this.world.spawner.player.position;
          this.pRad = this.world.spawner.player.rad;
          if (
            this.pLocation.x + this.pRad > this.aLocation.x - this.aRad &&
            this.pLocation.x - this.pRad < this.aLocation.x + this.aRad &&
            this.pLocation.y + this.pRad > this.aLocation.y - this.aRad &&
            this.pLocation.y - this.pRad < this.aLocation.y + this.aRad
          ) {
            this.world.spawner.destroyAsteroid(i);
            if (this.world.spawner.player.canCollide == true) {
              this.world.spawner.player.resetPlayerShip();
            }
            return;
          }
        }
        //Saucer and Asteroids
        if (this.s.length != 0) {
          for (let k = 0; k < this.s.length; ++k) {
            this.sLocation = this.s[k].position;
            this.sRad = this.s[k].rad;
            if (
              this.sLocation.x + this.sRad > this.aLocation.x - this.aRad &&
              this.sLocation.x - this.sRad < this.aLocation.x + this.aRad &&
              this.sLocation.y + this.sRad > this.aLocation.y - this.aRad &&
              this.sLocation.y - this.sRad < this.aLocation.y + this.aRad
            ) {
              this.world.spawner.destroyAsteroid(i);
              this.s.splice(k, 1);
              this.world.spawner.spawnEnemySaucer();
              return;
            }
            //Saucer and Player

            if (
              this.sLocation.x + this.sRad > this.pLocation.x - this.pRad &&
              this.sLocation.x - this.sRad < this.pLocation.x + this.pRad &&
              this.sLocation.y + this.sRad > this.pLocation.y - this.pRad &&
              this.sLocation.y - this.sRad < this.pLocation.y + this.pRad
            ) {
              this.s.splice(k, 1);
              this.world.spawner.spawnEnemySaucer();
              if (this.world.spawner.player.canCollide == true) {
                this.world.spawner.player.resetPlayerShip();
              }
            }

            //Projectiles
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
                  this.world.spawner.player.currentBullets--;
                  this.world.spawner.destroyAsteroid(i);
                  return;
                }
                //Player projectiles and enemy saucers
                if (this.b[j].owner == "Player") {
                  if (
                    this.bLocation.x + this.bRad >
                      this.sLocation.x - this.sRad &&
                    this.bLocation.x - this.bRad <
                      this.sLocation.x + this.sRad &&
                    this.bLocation.y + this.bRad >
                      this.sLocation.y - this.sRad &&
                    this.bLocation.y - this.bRad < this.sLocation.y + this.sRad
                  ) {
                    this.b.splice(j, 1);
                    this.world.spawner.player.currentBullets--;
                    this.s.splice(k, 1);
                    this.world.spawner.spawnEnemySaucer();
                    return;
                  }
                }
                //Enemy projectiles and player
                if (this.b[j].owner == "Enemy") {
                  if (
                    this.bLocation.x + this.bRad >
                      this.pLocation.x - this.pRad &&
                    this.bLocation.x - this.bRad <
                      this.pLocation.x + this.pRad &&
                    this.bLocation.y + this.bRad >
                      this.pLocation.y - this.pRad &&
                    this.bLocation.y - this.bRad < this.pLocation.y + this.pRad
                  ) {
                    this.b.splice(j, 1);
                    if (this.world.spawner.player.canCollide == true) {
                      this.world.spawner.player.resetPlayerShip();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
