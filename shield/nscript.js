// const sprite = [
//   [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
// 	[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
// 	[0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
// 	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
// ]

let shields = []
let sprites = []
let fakebullet = []

function preload() {
  texture = loadImage("https://cdn.jsdelivr.net/gh/Wireframe-Magazine/Wireframe-9/images/shield.png")
  sprites = loadJSON("sprites.json")
}

// Test Classes

class Shield {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.shield = sprites.shield
  }

  draw() {
    drawSprite(this.x, this.y, this.shield, 2, 1.25, color(0, 255, 0))
  }
}

let count = 0

function setup() {
  createCanvas(512, 512)
  rectMode(CENTER)
  shields.push(new Shield(width/2 - 100, height/2 + 200))
}

function draw() {
  background(0)
  rectMode(CENTER)
  fakebullet[0] = {x: mouseX, y: mouseY}
  
  for (let i of shields) {
    i.draw()
  }
}

function mousePressed() {
  shieldShotTest2()
}

function drawSprite(x, y, sprite, width, heightRatio, color) {
  strokeWeight(0.5)
	stroke(color)
	for (let i = 0; i < sprite.length; i++) {
		for (let j = 0; j < sprite[i].length; j++) {
			if (sprite[i][j] == 1) {
        let pos = createVector(x + (j * width), y + (i * width * heightRatio))
				fill(color)
				rect(pos.x, pos.y, width, (width * heightRatio))
			}
		}
	}	
}

// function shieldShot() {
//   if (mouseCollide(mouseX, mouseY, width/2, height/2, 44, 40)) {
//     //count++
//     let damageX = (16 - Math.ceil(((width/2 + 32) - mouseX) / 2))
//     let damageY = (8 - Math.ceil(((height/2 + 20) - mouseY) / 2))

//     if (damageX < 0) { damageX = 0 }
// 		if (damageY < 0) { damageY = 0 }
    
//     if (damageX >= sprites.shield[0].length) { damageX = sprites.shield.length[0]-1 }
// 		if (damageY >= sprites.shield.length) { damageY = sprites.shield.length-1 }
    
//     for (let i = 0; i < 2; i++) {
// 			if (damageX + i < sprites.shield.length) {
//         console.log(damageY+i)
//         console.log(damageX)
//        // sprites.shield[damageY+i][damageX] = 0
//         sprites.shield[damageY][damageX] = 0
//       }
// 		}

//     let middleHeight = sprites.explode.length
// 		let middleWidth = ceil(sprites.explode[0].length/2)
//     for (let i = 0; i < middleHeight; i++) {
//       for (let j = 0; j < sprites.explode[i].length; j++) {
//         let newSpriteY = (damageY-middleHeight+i+1)
// 				let newSpriteX = (damageX-middleWidth+j)

//         if (sprites.explode[i][j] == 1 && newSpriteY > 0 && newSpriteX > 0 && newSpriteY < this.height && newSpriteX < this.width) {
// 					//Mask the explosion on the shield
// 					sprites.shield[newSpriteY][newSpriteX] = 0;
// 				}
//       }
//     }
//   }
// }

function shieldShotTest(sx, sy) {
  if (rectCollide(mouseX, mouseY, 1, 1, sx, sy, 44, 40)) { // add +5 to the xy of the shield?
    //count++
    let damageX = (16 - Math.ceil(((sx + 32) - mouseX) / 2))
    let damageY = (8 - Math.ceil(((sy + 20) - mouseY) / 2))

    if (damageX < 0) { damageX = 0 }
		if (damageY < 0) { damageY = 0 }
    
    if (damageX >= sprites.shield[0].length) { damageX = sprites.shield.length[0]-1 }
		if (damageY >= sprites.shield.length) { damageY = sprites.shield.length-1 }
    
    for (let i = 0; i < 2; i++) {
			if (damageX + i < sprites.shield.length) {
        console.log(damageY+i)
        console.log(damageX)
       // sprites.shield[damageY+i][damageX] = 0
        sprites.shield[damageY][damageX] = 0
      }
		}

    let middleHeight = sprites.explode.length
		let middleWidth = ceil(sprites.explode[0].length/2)
    for (let i = 0; i < middleHeight; i++) {
      for (let j = 0; j < sprites.explode[i].length; j++) {
        let newSpriteY = (damageY-middleHeight+i+1)
				let newSpriteX = (damageX-middleWidth+j)

        if (sprites.explode[i][j] == 1 && newSpriteY > 0 && newSpriteX > 0 && newSpriteY < this.height && newSpriteX < this.width) {
					//Mask the explosion on the shield
					sprites.shield[newSpriteY][newSpriteX] = 0;
				}
      }
    }
  }
}

function shieldShotTest2() {
  for (let i of fakebullet) {
    for (let j of shields) {
      if (rectCollide(i.x, i.y, 1, 1, j.x, j.y, 44, 40)) { // add +5 to the xy of the shield
        //count++
        let damageX = (16 - Math.ceil(((j.x + 32) - i.x) / 2))
        let damageY = (8 - Math.ceil(((j.y + 20) - i.y) / 2))

        if (damageX < 0) { damageX = 0 }
        if (damageY < 0) { damageY = 0 }

        if (damageX >= sprites.shield[0].length) { damageX = sprites.shield.length[0] - 1 }
        if (damageY >= sprites.shield.length) { damageY = sprites.shield.length - 1 }

        for (let i = 0; i < 2; i++) {
          if (damageX + i < sprites.shield.length) {
            console.log(damageY + i)
            console.log(damageX)
            // sprites.shield[damageY+i][damageX] = 0
            sprites.shield[damageY][damageX] = 0
          }
        }

        let middleHeight = sprites.explode.length
        let middleWidth = ceil(sprites.explode[0].length / 2)
        for (let i = 0; i < middleHeight; i++) {
          for (let j = 0; j < sprites.explode[i].length; j++) {
            let newSpriteY = (damageY - middleHeight + i + 1)
            let newSpriteX = (damageX - middleWidth + j)

            if (sprites.explode[i][j] == 1 && newSpriteY > 0 && newSpriteX > 0 && newSpriteY < this.height && newSpriteX < this.width) {
              //Mask the explosion on the shield
              sprites.shield[newSpriteY][newSpriteX] = 0;
            }
          }
        }
      }
    }
  }
}

function mouseCollide(pointX, pointY, x, y, w, h) {
  let tmp = {x: x, y: y}
  if (pointX >= tmp.x && pointX <= tmp.x + w && pointY >= tmp.y && pointY <= tmp.y + h) {
    return true
  } else {
    return false
  }
}

function rectCollide(x, y, w, h, x2, y2, w2, h2) {
  let tmp = {x: x, y: y}
  if (tmp.x + w >= x2 && tmp.x <= x2 + w2 && tmp.y + h >= y2 && tmp.y <= y2 + h2) {
    return true
  } else {
    return false
  }
}