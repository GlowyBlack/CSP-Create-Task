// Functions

function alienShot() {
  // if (mod()) { return }
  for (let i = 0; i < allAliens.length; i++) {
    for (let j = 0; j < allBullets.length; j++) {
      if (!allBullets[j].alien) {
        if (rectCollide(allAliens[i].x, allAliens[i].y, 60, 40, allBullets[j].x, allBullets[j].y, 4, 10)) {
          allAliens.splice(i, 1)
          allBullets.splice(j, 1)
          game.score++
          return
        }
      }
    }//end j loop
  }//end i loop
}//alienShot

function shipShot() {
  for (let i = 0; i < allBullets.length; i++) {
    if (allBullets[i].alien) {
      if (rectCollide(player.ship.x, player.ship.y, 70, 90, allBullets[i].x, allBullets[i].y, 4, 10)) {
        if (player.ship.hp > 0) {
          player.ship.hp--
          allBullets.splice(i, 1)
          console.log(player.ship.hp)
        } else {
          gameOver = true
          allAliens = []
          allAsteroids = []      
          allBullets = []
          game.scene = "DEATH"
          scene()
          return
        }
      }
    }
  }
}

// function shieldShot() {
//   for (let [n, i] of allBullets.entries()) {
//     for (let j of allShields) {
//       if (rectCollide(i.x, i.y, 4, 10, j.x, j.y, 44, 40)) {
//         let pos = createVector(i.x, i.y)
//         j.shot(pos)
//       }
//     }
//   }
// }

function rectCollide2(x, y, w, h, x2, y2, w2, h2) {
  let tmp = {x: x, y: y}
  if (tmp.x + w >= x2 && tmp.x <= x2 + w2 && tmp.y + h >= y2 && tmp.y <= y2 + h2) {
    return true
  } else {
    return false
  }
}

function shieldShotTest2() {
  for (let j of allShields) {
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

function asteroidShot() {
  // We could add asteroid hp
  if (!mod()) { return }
  for (let i = 0; i < allAsteroids.length; i++) {
    for (let j = 0; j < allBullets.length; j++) {
      if (circleCollide(allBullets[j].x, allBullets[j].y, 4, 10, allAsteroids[i].x, allAsteroids[i].y, 60)) {
        allAsteroids.splice(i, 1)
        allBullets.splice(j, 1)
        game.score++
        return
      }
    }//end j loop
  }//end i loop
}//asteroidShot

function bossShot() {
  if (!mod()) { return }
  for (let i = 0; i < allBullets.length; i++) {
    if (boss.small != undefined && rectCollide(boss.small.x, boss.small.y, 100, 100, allBullets[i].x, allBullets[i].y, 4, 10)) {
      boss.small.hp -= 5
      if (boss.small.hp <= 0) {
        boss.small = undefined
        allAliens = []
        console.log("Small Boss is now deceased")
        player.ship.hp = 2
      } else {
        console.log("Small Boss HP: "+boss.small.hp)
        allBullets.splice(i, 1)
        game.score++
      }
      return
    }
    else if (boss.big != undefined && rectCollide(boss.big.x, boss.big.y, 200, 100, allBullets[i].x, allBullets[i].y, 4, 10)) {
      boss.big.hp -= 5
      if (boss.big.hp <= 0) {
        boss.big = undefined
        allAliens = [];
        player.ship.hp = 2;
        console.log("Big Boss is now deceased")
      } else {
        console.log("Big Boss HP: "+boss.big.hp)
        allBullets.splice(i, 1)
        game.score++
      }
      return
    }
  }//end i loop
}//bossShot

function alienCollide() {
  for (let i = 0; i < allAliens.length; i++) {
    if (rectCollide(player.ship.x, player.ship.y, 70, 90, allAliens[i].x, allAliens[i].y, 60 - 10, 40 - 10)) {
      gameOver = true
      allAliens = []
      allAsteroids = []      
      allBullets = []
      game.scene = "DEATH"
      scene()
    }
  }
}

function asteroidCollide() {
  for (let i = 0; i < allAsteroids.length; i++) {
    if (circleCollide(player.ship.x, player.ship.y, 70, 90, allAsteroids[i].x, allAsteroids[i].y, 100 - 80)) {
      gameOver = true
      allAliens = []
      allAsteroids = []
      allBullets = []
      game.scene = "DEATH"
      scene()
    }
  }
}

function randomColor() {
  let hexValues = "0123456789ABCDEF"
  let hex = ""
  for (let i = 0; i < 6; i++) {
    hex += hexValues[floor(random(0, 16))]
  }
  return "#"+hex
}

function posAdjust(x, y, w, h, pos) { 
  if (pos.toUpperCase() == "CORNER") {
    return { x: x, y: y, w: w, h: h }
  } else if (pos.toUpperCase() == "CORNERS") {
    return { x: x, y: y, w: w - x, h: h - y }
  } else if (pos.toUpperCase() == "RADIUS") {
    return { x: x - w, y: y - h, w: 2 * w, h: 2 * h }
  } else if (pos.toUpperCase() == "CENTER") {
    return { x: x - w * 0.5, y: y - h * 0.5, w: w, h: h }
  }
}

function mouseCollide(pointX, pointY, x, y, w, h) {
  let tmp = posAdjust(x, y, w, h, CENTER)
  if (pointX >= tmp.x && pointX <= tmp.x + w && pointY >= tmp.y && pointY <= tmp.y + h) {
    return true
  } else {
    return false
  }
}

function rectCollide(x, y, w, h, x2, y2, w2, h2) {
  let tmp = posAdjust(x, y, w, h, CENTER)
  if (tmp.x + w >= x2 && tmp.x <= x2 + w2 && tmp.y + h >= y2 && tmp.y <= y2 + h2) {
    return true
  } else {
    return false
  }
}

function circleCollide(rx, ry, rw, rh, cx, cy, diameter) {
  let tmp = posAdjust(rx, ry, rw, rh, CENTER)
  let testX = cx;
  let testY = cy;

  if (cx < tmp.x) {
    testX = tmp.x
  } else if (cx > tmp.x + tmp.w) {
    testX = tmp.x + tmp.w
  }

  if (cy < tmp.y) {
    testY = tmp.y
  } else if (cy > tmp.y + tmp.h) {
    testY = tmp.y + tmp.h
  }
  
  let distance = this.dist(cx, cy, testX, testY)

  if (distance <= diameter / 2) {
    return true
  } else {
    return false
  }
}

function mod() {
  if (game.level % 10 == 5 || game.level % 10 == 0) {
    return true
  } else {
    return false
  }
}

function newAsteroid() {
  
}

// function callAsteroids(level) { // CUSTOM FUNCTION FOR REVIEW??
//   if (!mod() || defeated) { return }
//   if (document.visibilityState != "hidden") {
//     for (let i = 0; i < 5; i++) {
//       array.push(new Asteroid());
//     }
//   }
// }

function callAsteroids(level) { 
  if (level % 10 == 5 || level % 10 == 0) {
    if (document.visibilityState != "hidden") {
      for (let i = 0; i < 5; i++) {
        allAsteroids.push(new Asteroid());
      }
    }
    else{
      return
    }
  }
  else{
    return
  }
}

// function callAsteroids(level) { 
//   if (level % 10 == 5 || level % 10 == 0) {
//     for (let i = 0; i < 5; i++) {
//       allAsteroids.push(new Asteroid());
//     }

//   }
//   else{
//     return
//   }
// }

function drawBackground(numDots) {
  console.log(numDots)
  if (numDots <= 500) {
    for (i = 0; i < numDots; i++) {
      game.background.x.push(random(0, 800))
      game.background.y.push(random(0, 950))
      game.background.c.push(randomColor())
    }
  }
  else {
    return
  }
}

function drawSprite(x, y, sprite, width, heightRatio, color) {
  push()
  strokeWeight(0.5)
	stroke(color)
	for (let i = 0; i < sprite.length; i++) {
		for (let j = 0; j < sprite[i].length; j++) {
			if (sprite[i][j] == 1) {
        let pos = createVector(x + (j * width), y + (i * width * heightRatio))
        rectMode(CENTER)
				fill(color)
				rect(pos.x, pos.y, width, (width * heightRatio))
			}
		}
	}	
  pop()
}