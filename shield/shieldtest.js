// This is the file for testing the shield code that I'm going to code

// the code has been temporarily moved to https://ThriftyFearlessKernel.bols.repl.co 

let count = 0
let texture
let shields = []
let blocks = {}

function preload() {
  texture = loadImage("https://cdn.jsdelivr.net/gh/Wireframe-Magazine/Wireframe-9/images/shield.png")
}

// one "pixel" is 10x10

// Test Classes

class Shield {
  constructor(x, y) {
    this.position = createVector(x, y)
    
  }

  update() {
    
  }
}

// use blocks to detect the collisions

function setup() {
  createCanvas(512, 512)
  background(0)
  texture.loadPixels()
  blocks = createBlocks(texture)

  
  //shields.push(new Shield(width/2-100,height/2-100))
}

function draw() {
  image(texture, 0, 0)
  if (blockCollide(mouseX, mouseY, blocks, 10)) {
    console.log("t")
  }
}

function createBlocks(image) {
  let tmp = {w: [], h: [], c: []}
  for (let i = 10; i < image.width + 10; i += 10) {
    tmp.w.push(i)
  }
  for (let i = 10; i < image.height + 10; i += 10) {
    tmp.h.push(i)
  }
  for (let i of tmp.w) {
    for (let j of tmp.h) {
      tmp.c.push(image.get(i/2, j/2))
    }
  }
  return tmp
}

function blockCollide(pointX, pointY, array, wh) {
  for(let i = 0; i < array.w.length; i++) {
    for(let j = 0; j < array.h.length; j++) {
      if (pointX >= array.w[i]-10 && pointX <= array.w[i]-10 + wh && pointY >= array.h[j]-10 && pointY <= array.h[j]-10 + wh) {
        //console.log("a")
        if (array.c[i][1] === 255) {
          return true
        }
      }
    }
  }
}

// copied functions

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
  let tmp = posAdjust(x, y, w, h, CORNER)
  if (pointX >= tmp.x && pointX <= tmp.x + w && pointY >= tmp.y && pointY <= tmp.y + h) {
    return true
  } else {
    return false
  }
}


  // update() {
  //   //loadPixels()
  //   image(texture, this.position.x, this.position.y, texture.width, texture.height)
  //   let cache = createVector(mouseX, mouseY)
  //   if (mouseCollide(cache.x, cache.y, this.position.x, this.position.y, texture.width, texture.height)) {
  //     // count++
  //     if (get(cache.x, cache.y)[1] === 255) {
  //       console.log("GREEN")
  //       // set(cache.x, cache.y, 255)
  //       let x = cache.x
  //       let y = cache.y
  //       for (let i = 0; i < 10; i++) {
  //         for (let j = 0; j < 10; j++) {
  //           // loop over
  //           let index = 4 * ((y * 10 + j) * width * 10 + (x * 10 + i));
  //           pixels[index] = 255;
  //           pixels[index+1] = 255;
  //           pixels[index+2] = 255;
  //           //pixels[index+3] = a;
  //         }
  //       }
  //       updatePixels()
  //     } else {
  //       console.log("OTHER COLOUR")
  //     }
      
  //   }
  // }