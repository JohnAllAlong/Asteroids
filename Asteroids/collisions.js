class Collisions {
  constructor(world) {
    this.world = world;
    this.a = this.world.spawner.asteroids;
    this.b = this.world.spawner.projectiles;
    this.s = this.world.spawner.saucers;
    this.p = this.world.spawner.players;
    this.ast = "a";
    this.es = "s";
    this.pl = "p";
  }

  /*checkAsteroidsAndBullets() {
    if (this.a.length != 0) {
      for (let i = 0; i < this.a.length; ++i) {
        this.aLocation = this.a[i].position;
        this.aRad = this.a[i].size / 2;
        //Player and Asteroids
        if (this.p.length != 0) {
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
              this.world.spawner.player.score += this.s[k].scoreVal;
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
  }*/

  //My collision check math, plus the matrix to determine what happens when.
  genericCollisionCheck(arr1, arr2) {
    if (arr1.length != 0)
      for (let i = 0; i < arr1.length; i++) {
        this.obj1Pos = arr1[i].position;
        this.obj1Rad = arr1[i].rad;
        if (arr2.length != 0) {
          for (let j = 0; j < arr2.length; j++) {
            this.obj2Pos = arr2[j].position;
            this.obj2Rad = arr2[j].rad;
            if (
              this.obj1Pos.x + this.obj1Rad > this.obj2Pos.x - this.obj2Rad &&
              this.obj1Pos.x - this.obj1Rad < this.obj2Pos.x + this.obj2Rad &&
              this.obj1Pos.y + this.obj1Rad > this.obj2Pos.y - this.obj2Rad &&
              this.obj1Pos.y - this.obj1Rad < this.obj2Pos.y + this.obj2Rad
            ) {
              //Asteroids vs.
              if (arr1 == this.a) {
                //Player
                if (arr2 == this.p) {
                  arr2[j].score += arr1[i].scoreVal;
                  this.world.spawner.spawnParticles(arr1[i], this.ast);
                  this.world.spawner.destroyAsteroid(i);
                  this.world.shakeCueterie();
                  this.world.sfx.explosion.play()
                  if (this.p[j].canCollide == true) {
                    this.world.spawner.spawnParticles(arr2[j], this.pl);
                    this.p[j].resetPlayerShip();
                  }
                }
                //Bullets
                else if (arr2 == this.b) {
                  if (arr2[j].owner == "Player") {
                    this.p[0].score += arr1[i].scoreVal;
                    this.p[0].currentBullets--;
                  }
                  this.world.spawner.spawnParticles(arr1[i], this.ast);
                  arr2.splice(j, 1);
                  this.world.spawner.destroyAsteroid(i);
                  this.world.shakeCueterie();
                  this.world.sfx.explosion.play()
                  return;
                }
                //Saucers
                else if (arr2 == this.s) {
                  this.world.spawner.spawnParticles(arr1[i], this.ast);
                  this.world.spawner.spawnParticles(arr2[j], this.es);
                  this.world.spawner.destroyAsteroid(i);
                  arr2.splice(j, 1);
                  this.world.shakeCueterie();
                  this.world.sfx.explosion.play()
                  return;
                }
                //Bullets vs.
              } else if (arr1 == this.b) {
                //Saucers
                if (arr2 == this.s) {
                  if (arr1[i].owner == "Player") {
                    arr1.splice(i, 1);
                    this.p[0].score += arr2[j].scoreVal;
                    this.p[0].currentBullets--;
                    this.world.spawner.spawnParticles(arr2[j], this.es);
                    arr2.splice(j, 1);
                    this.world.shakeCueterie();
                    this.world.sfx.explosion.play()
                    //this.world.spawner.spawnEnemySaucer();
                    return;
                  }
                }
                //Player
                else if (arr2 == this.p) {
                  if (arr1[i].owner == "Enemy") {
                    arr1.splice(i, 1);
                    this.world.sfx.explosion.play()
                    if (arr2[0].canCollide == true) {
                      this.world.spawner.spawnParticles(arr2[j], this.pl);
                      arr2[0].resetPlayerShip();
                      this.world.shakeCueterie();
                    }
                  }
                }
              }
              //Saucers vs.
              else if (arr1 == this.s) {
                //Player
                if (arr2 == this.p) {
                  arr2[j].score += arr1[i].scoreVal;
                  this.world.spawner.spawnParticles(arr1[i], this.es);
                  arr1.splice(i, 1);
                  this.world.shakeCueterie();
                  this.world.sfx.explosion.play()
                  if (arr2[j].canCollide == true) {
                    this.world.spawner.spawnParticles(arr2[j], this.pl);
                    arr2[j].resetPlayerShip();
                  }
                }
              } 
            }
          }
        }
      }
  }
}
