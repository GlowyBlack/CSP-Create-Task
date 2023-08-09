let allAsteroids = []
let allPics = [];
let allAliens = [];
let alienBullets = [];
let alienX = 0
let showAsteroid = false

function preload(){
  allPics[0] = loadImage("assets/images/alien.png")

// nvm fixed it
  
}//end preload

function setup() {
  createCanvas(800, 600);
  frameRate(60)
  noLoop()

  for (let i = 0; i < 6; i++) {
    allAliens.push(new Minion(i*80+60, 20))
  }
}//end setup

function draw() {
  background(0);

  setTimeout(callAsteroids, 5000)
  
  for (let i = 0; i < allAliens.length; i++) {
    allAliens[i].display()
  }

  if (showAsteroid) {
    for (let i = 0; i < 5; i++) {
      allAsteroids[i].display()
      allAsteroids[i].move()
    }
  }
}//end draw

function mousePressed() {
  print("MouseX: " + mouseX +"     MouseY: " + mouseY  );
}//end mousePressed

function keyPressed() {

}//end keyPressed

function callAsteroids() {
  showAsteroid = true
  for (let i = 0; i < 5; i++) {
    allAsteroids.push(new Asteroid())
  }
  redraw()
}

class Asteroid{
  constructor(){
    this.x = random(30, 770);
    this.y = -50;
    this.speed = 5
  }
  display(){
    circle(this.x, this.y, 100)
  }
  move(){
    this.y += this.speed
  }
}

class Minion {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speed = 5 * 4
    this.pic = allPics[0]
    this.time = random
    alienX = this.x
  }

  display() {
    image(this.pic, this.x, this.y, 60, 40)
  }

  move() {
    this.x += this.speed
    if (this.x > width - 50 || this.x < 10) {
      this.y += 40
      this.speed *= -1
    }
  }
}

class AlienBullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(-2,2);
    this.timer = millis();
  }
  
  display() {
    
    if(millis() > this.timer + 3000   ){
      this.timer = millis();
    }
  }//display

}//end Minions class