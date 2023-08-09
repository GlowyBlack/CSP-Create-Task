// Classes

class Player {
  constructor(x) {
    this.x = x;
    this.y = 850;
    this.pic = allPics[4]
    this.hp = 2
  }

  display() {
    imageMode(CENTER)
    if(this.hp == 2){
      this.pic = allPics[4]
      image(this.pic, this.x, this.y, 70, 90)
    }
    else if(this.hp == 1){
      this.pic = allPics[5]
      image(this.pic, this.x, this.y, 70, 90)
    }
    else if(this.hp == 0){
      this.pic = allPics[6]
      image(this.pic, this.x, this.y, 70, 90)
    }   

  }

  move() {

  }
}

class Bullet {
  constructor(x) {
    this.x = x - 1
    this.y = 810
    this.speed = 3.5
  }
  move() {
    fill(255)
    stroke(0)
    rect(this.x, this.y, 4, 10)
    this.y -= 4 * this.speed
  }
}

class NewBullet {
  constructor(x, y, alien) {
    if (alien) {
      this.y = y
      this.alien = true
      this.speed = 1.5
    } else {
      this.y = 810
      this.alien = false
      this.speed = 2*4 
    }
    this.x = x - 1
  }
  
  move() {
    fill(255);
    stroke(0);
    rect(this.x, this.y, 4, 10);
    if (this.alien) {
      this.y += 4 * this.speed;
    } else {
      this.y -= 1 * this.speed;
    }
  }
}

class Minion {
  constructor(x, y, g) {
    this.x = x;
    this.y = y;
    this.speed = 2.5;
    this.pic = allPics[0];
    this.timer = millis();
    if (g == true) {
      this.ghost = true;
    } else {
      this.ghost = false;
    }
  }
  
  display(){
    if (this.ghost == false) {
      image(this.pic, this.x, this.y, 60, 40);
    }
  }

  move() {
    if (this.ghost == false) {
      this.x += this.speed
      if (this.x > width - 30 || this.x < 10) {
        this.y += 40
        this.speed *= -1        
        if(this.x < 10){
          // this.speed += 0.5
        }
        else if(this.x > width - 30){
          // this.speed -= 0.5 
        }

        // print(this.speed)
      }
      if (millis() > this.timer + (ceil(random(4, 7)) * 1000)) {
        let rand = ceil(random(0, 4))
        if (rand == 1) {
          allBullets.push(new NewBullet(this.x, this.y + 40, true))
        }
        this.timer = millis();
      }
    }
  }
}

class TinyBoss {
  constructor(x) {
    this.x = x;
    this.y = 100;
    this.hp = 250;
    this.speed = 2;
    this.pic = allPics[1];
    this.timer = millis();
  }

  display() {
    imageMode(CENTER);
    image(this.pic, this.x, this.y, 100, 100);
    fill(255,0,0);
    rect(width/2 - 140, this.y - 75, 250, 20);   
    fill(0,255,0);
    rect(width/2 - 140, this.y - 75, this.hp, 20);
    fill(255);
    if(millis() > this.timer + 2000 && this.hp < 250){
      this.hp = this.hp+5;
      this.timer = millis();
    }
  }

  move() {
    this.x += this.speed;

    if (this.x > width - 50 || this.x < 50) {
      this.speed *= -1
    }
    if(millis() > this.timer + 5000){
      for(let i = 0; i < 6; i++){
        allAliens.push(new Minion(i * 60 + 50, 175))
      }
      this.timer = millis();
    }
  }
}

class MotherShip {
  constructor(x, y) {
    this.x = x;
    this.y = 80;
    this.hp = 500;
    this.pic = allPics[2];
    this.speed = 2;
    this.timer = millis();
    this.interval = millis()
    allAliens.push(new Minion(60, 175));
  }

  display() {
    imageMode(CENTER);
    image(this.pic, this.x, this.y, 200, 100);
    fill(255,0,0);
    rect(width/2 - 230, this.y - 60, 500, 20);   
    fill(0,255,0);
    rect(width/2 - 230, this.y - 60, this.hp, 20);
    fill(255);
    if(millis() > this.timer + 1000 && this.hp < 500){
      this.hp = this.hp+5;
      this.timer = millis();
    }
      print(this.interval)
      print(this.time)
  }

  move() {
    this.x += this.speed;
    if (this.x > width - 50 || this.x < 50) {
      this.speed *= -1;
    }    
    if(millis() > this.interval + 7000){
      for(let i = 0; i < 9; i++){
        allAliens.push(new Minion(i * 60 + 50, 175));
      }
      this.interval = millis();
    }

  
  }
  
}

class Asteroid {
  constructor() {
    this.x = random(30, 770)
    this.y = -50
    this.pic = allPics[3]
    this.speed = 5
  }
  display() {
    imageMode(CENTER)
    image(this.pic, this.x, this.y, 120, 130 / 2)
    // imageMode(CORNER)
  }
  move() {
    this.y += this.speed
  }
}

class AlienBullet{
  constructor(x, y){
    this.x = x
    this.y = y
    this.speed = 3.5
  }
  move() {
    fill(255)
    stroke(0)
    rect(this.x, this.y, 4, 10)
    this.y -= 4 * this.speed
  } 
}

class Shield {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.shield = [...game.sprites.shield]
    //this.width = 2
    this.width = 2.5
    this.height = 1.25
  }

  draw() {
    drawSprite(this.x, this.y, this.shield, this.width, this.height, color(0, 255, 0))
  }

  shot() {
    let j = this
    for (let [v, i] of allBullets.entries()) {
      if (rectCollide2(i.x, i.y, 1, 1, j.x, j.y, 56, 51)) { // add +5 to the xy of the shield
          let count = 0
          for(let z = 0; z < j.shield.length; z++) {
            for(let x = 0; x < j.shield[z].length; x++) {
              if(j.shield[z][x] == 1) {
                console.log(j.shield[z][x])
                count++
              }
            }
          }
          if (count < 25) { j.shield = []; return }
        
          // possibly add funny explosion because im too lazy to fix the broken collision?

          for (let q = 0; q < 4; q++) {
            //console.log(get(i.x+q, i.y+1)[1])
            if (i.alien) {
              if (get(i.x+q, i.y-1)[1] > 50) {
                allBullets.splice(v, 1)
                break
              }
            } else {
              if (get(i.x+q, i.y+1)[1] > 50) {
                allBullets.splice(v, 1)
                break
              }
            }
          }
          
        
          let damageX = (16 - Math.ceil(((j.x + 32) - i.x) / 2))
          let damageY = (8 - Math.ceil(((j.y + 20) - i.y) / 2))

          if (damageX < 0) { damageX = 0 }
          if (damageY < 0) { damageY = 0 }

          if (damageX >= j.shield[0].length) { damageX = j.shield.length[0] - 1 }
          if (damageY >= j.shield.length) { damageY = j.shield.length - 1 }

          for (let i = 0; i < 2; i++) {
            if (damageX + i < j.shield.length) {
              console.log(damageY + i)
              console.log(damageX)
              // sprites.shield[damageY+i][damageX] = 0
              j.shield[damageY][damageX] = 0
            }
          }

          let middleHeight = game.sprites.explode.length
          let middleWidth = ceil(game.sprites.explode[0].length / 2)
          for (let o = 0; o < middleHeight; o++) {
            for (let p = 0; p < game.sprites.explode[o].length; p++) {
              let newSpriteY = (damageY - middleHeight + o + 1)
              let newSpriteX = (damageX - middleWidth + p)

              if (game.sprites.explode[o][p] == 1 && newSpriteY > 0 && newSpriteX > 0 && newSpriteY < this.height && newSpriteX < this.width) {
                //Mask the explosion on the shield
                j.shield[newSpriteY][newSpriteX] = 0;
                
              }
            }
          }
      }
    }
  }
}

// class Shield {
//   constructor(x, y, w) {
//     this.x = x
//     this.y = y
//     this.width = 2
//     this.height = 1.25
//     this.shield = game.sprites.shield
//     this.explode = game.sprites.explode
//   }

//   draw() {
//     drawSprite(this.x, this.y, this.shield, this.width, this.height, color(0, 255, 0))
//   }

//   shot(vector) {
//     // add rect collide function to ensure that it doesn't break
    
//     let damageX = (16 - Math.ceil(((tmp.x + 32) - vector.x) / this.width))
//     let damageY = (8 - Math.ceil(((tmp.y + 20) - vector.y) / this.width))

//     if (damageX < 0) { damageX = 0 }
// 		if (damageY < 0) { damageY = 0 }
    
//     if (damageX >= this.shield[0].length) { damageX = this.shield[0].length-1 }
// 		if (damageY >= this.shield.length) { damageY = this.shield.length-1 }
    
//     for (let i = 0; i < 2; i++) {
// 			if (damageX + i < this.shield.length) {
//         console.log(damageY+i)
//         console.log(damageX)
//        // sprites.shield[damageY+i][damageX] = 0
//         this.shield[damageY][damageX] = 0
//       }
// 		}

//     let middleHeight = this.explode.length
// 		let middleWidth = ceil(this.explode[0].length/2)
//     for (let i = 0; i < middleHeight; i++) {
//       for (let j = 0; j < this.explode[i].length; j++) {
//         let newSpriteY = (damageY-middleHeight+i+1)
// 				let newSpriteX = (damageX-middleWidth+j)

//         if (this.explode[i][j] == 1 && newSpriteY > 0 && newSpriteX > 0 && newSpriteY < this.height && newSpriteX < this.width) {
// 					//Mask the explosion on the shield
// 					this.shield[newSpriteY][newSpriteX] = 0;
// 				}
//       }
//     }
//   }
// }