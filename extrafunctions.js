// code stuff


// json fetch
fetch("./data.json")
.then(response => {
  return response.json()
})
.then(data => console.log(data))

// rectangle collision
function rectCollide(x, y, w, h, x2, y2, w2, h2) {
  if (x + w >= x2 && x <= x2 + w2 && y + h >= y2 && y <= y2 + h2) {
    return true
  } else {
    return false
  }
}

// mouse collision (rectangle)
function mouseCollide(pointX, pointY, x, y, w, h) {
  if (pointX >= x && pointX <= x + w && pointY >= y && pointY <= y + h) {
    return true
  } else {
    return false
  }
}

// mouse collision (rectangle center)
function mouseCollide(pointX, pointY, x, y, w, h) {
  let tmp = { x: x - w * 0.5, y: y - h * 0.5 }
  if (pointX >= tmp.x && pointX <= tmp.x + w && pointY >= tmp.y && pointY <= tmp.y + h) {
    return true
  } else {
    return false
  }
}

// data saving
function saveScore() {
  localStorage.setItem('highscore', 333)
}

// constant position adjusting
// https://cdn.jsdelivr.net/gh/processing/p5.js/src/core/helpers.js
function modeAdjust(x, y, w, h, mode) {
  if (mode == "CORNER") {
    return { x: x, y: y, w: w, h: h }
  } else if (mode == "CORNERS") {
    return { x: x, y: y, w: w - x, h: h - y };
  } else if (mode == "RADIUS") {
    return { x: x - w, y: y - h, w: 2 * w, h: 2 * h }
  } else if (mode == "CENTER") {
    return { x: x - w * 0.5, y: y - h * 0.5, w: w, h: h }
  }
}

// circle collision
function circleCollide(rx, ry, rw, rh, cx, cy, diameter) {
  let testX = cx;
  let testY = cy;

  if (cx < rx) {
    testX = rx
  } else if (cx > rx + rw) {
    testX = rx + rw
  }

  if (cy < ry) {
    testY = ry
  } else if (cy > ry + rh) {
    testY = ry + rh
  }
  
  let distance = this.dist(cx, cy, testX, testY)

  if (distance <= diameter / 2) {
    return true
  } else {
    return false
  }
}

// volume slider
let slider;


let val = slider.value()
console.log(val / 10)
sound.setVolume(val / 10) // volume uses 0.0 to 1.0 for volume
// we can remove element when changing scenes

// colour filter
function preload() {
    img_orig =
      loadImage("sample-image.png");
    img_filter =
      loadImage("sample-image.png");
}
  
function setup() {
    createCanvas(500, 400);
    textSize(20);
  
    // Draw the original image
    text("Click on the button to " +
      "add a filter to the image", 20, 20);
    text("Original Image:", 20, 60);
    image(img_orig, 20, 80, 200, 100);
  
    // Apply the GRAYSCALE filter
    img_filter.filter(GRAY);
  
    // Draw the image with filter
    text("Filter Image:", 20, 220);
    image(img_filter, 20, 240, 200, 100); 
}