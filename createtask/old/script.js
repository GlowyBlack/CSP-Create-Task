// AP Create Task Project
let game = { score: 0, highscore: 0, ammo: 10, level: 1, scene: "MENU", debug: true, background: { x: [], y: [], c: [] } }
let player = { ship: undefined, cooldown: false, image: undefined }
let boss = { small: undefined, big: undefined }
let allAliens = [];
let allBullets = [];
let allPics = [];
let allAsteroids = [];
let gameOver = false

function preload() {
  allPics[0] = loadImage("assets/images/alien.png")
  allPics[1] = loadImage("assets/images/MiniBoss.png")
  allPics[2] = loadImage("assets/images/BigBoss.png")
  allPics["EXPLODE"] = loadImage("assets/images/explosion2.gif")
  player.image = loadImage("assets/images/ship.png")

  for (i = 0; i < 250; i++) {
    game.background.x.push(random(0, 800))
    game.background.y.push(random(0, 950))
    game.background.c.push("#" + hex(random(0, 255), 2) + hex(random(0, 255), 2) + hex(random(0, 255), 2))
  }
}

function setup() {
  createCanvas(800, 950)
  frameRate(60)
  loop()

  player.ship = new Player(width / 2)

  imageMode(CENTER)
  for (let i = 0; i < 10; i++) {
    allAliens.push(new Minion((i * 60 + 120), 60))
  }

  if (localStorage.getItem("HIGHSCORE") != null) {
    game.highscore = localStorage.getItem("HIGHSCORE")
  } else {
    // localStorage.setItem("HIGHSCORE", 0)
  }
}

function draw() {
  drawScene(game.scene)
}

function drawScene(v) {
  push()
  background(0)
  for (i = 0; i < 250; i++) {
    fill(game.background.c[i])
    circle(game.background.x[i], game.background.y[i], 2)
  }
  pop()

  if (v == "MENU") {
    push()
    textFont("Open Sans")
    textSize(36)
    textAlign(CENTER)
    fill(255)
    text("Space Invaders Ripoff", width / 2, height / 4)

    fill(255, 255, 255, 0)
    stroke(255)
    rectMode(CENTER)
    rect(width / 2 - 150, height * (3 / 4), 175, 50)
    rect(width / 2 + 150, height * (3 / 4), 175, 50)

    fill(255)
    textSize(24)
    text("Play", width / 2 - 150, height * (3 / 4) + 7.5)
    text("Guide", width / 2 + 150, height * (3 / 4) + 8)
    pop()
  }

  if (v == "GAME") {
    fill(255)
    textFont("Open Sans")
    textSize(24)
    text("Score: " + game.score, 675, 30)
    text("Ammo: " + game.ammo, 675, 60)
    imageMode(CENTER);

    if (game.level % 10 != 5 && game.level % 10 != 0) {
      for (let i = 0; i < allAliens.length; i++) {
        allAliens[i].display()
        allAliens[i].move()
      }
    }
    else if (game.level % 10 == 5 && boss.small != undefined) {
      boss.small.display()
    }
    else if (game.level % 10 == 0 && boss.big != undefined) {
      boss.big.display();
      boss.big.move();
    }

    player.ship.display();
    
    for (let i = 0; i < allBullets.length; i++) {
      allBullets[i].move();
      if (allBullets[i].y < 0) {
        allBullets.splice(i, 1);
        i--
      }
    }

    if (keyIsDown(LEFT_ARROW)) {
      if (player.ship.x > 35) {
        player.ship.x -= 5
      }
    }

    if (keyIsDown(RIGHT_ARROW)) {
      if (player.ship.x < 755) {
        player.ship.x += 5;
      }
    }

    alienShot();
    alienCollide();
    bossShot();
    levelCompleted();
  }

  if (v == "DEATH") {
    // DEATH
    // Add explosion effect
    noLoop()
    let tmp = { x: player.ship.x - 70 / 0.5, y: player.ship.y - 90 / 0.5 }
    allPics["EXPLODE"] = createImg("assets/images/explosion2.gif", "")
    allPics["EXPLODE"].position(tmp.x, tmp.y + 50)
    setTimeout(function() {
      allPics["EXPLODE"].remove()
      game.scene = "END"
      redraw()
    }, 1750)
  }

  if (v == "END") {
    // END
    // PUT CLEANUP/RESTART CODE HERE
    if (gameOver == false) { return }
    
    push()
    textFont("Open Sans")
    textSize(36)
    textAlign(CENTER)
    if (game.score > game.highscore) {
      // localStorage.setItem('HIGHSCORE', Number(game.score))
      // game.highscore = game.score
      text("New High Score!", width / 2, height / 4 - 100)
    }
    textSize(28)
    fill(255)
    text("You are genuinely terrible at this game.", width / 2, height / 4)
    text("Score: "+game.score, width / 2, height / 4 + 50)
    text("High Score: "+game.highscore, width/2, height / 4 + 100)
    
    fill(255, 255, 255, 0)
    stroke(255)
    rectMode(CENTER)
    rect(width / 2, height * (3 / 4), 175, 50)

    fill(255)
    textSize(24)
    text("Menu", width / 2, height * (3 / 4) + 8)
    pop()
  }
}

function mousePressed() {
  if (game.scene == "MENU" && mouseCollide(mouseX, mouseY, width / 2 - 150, height * (3 / 4), 175, 50)) { // Play Button
    game.scene = "GAME"
  }

  if (game.scene == "END" && gameOver == true && mouseCollide(mouseX, mouseY, width / 2, height * (3 / 4), 175, 50)) { // Menu Button
    game.score = 0
    game.ammo = 10
    game.level = 1
    game.scene = "MENU"
    gameOver = false
    setup()
  }

  console.log(mouseX + " | " + mouseY)
  
  console.log(mouseCollide(mouseX, mouseY, width / 2 - 150, height * (3 / 4), 175, 50) + " | Play")

  console.log(mouseCollide(mouseX, mouseY, width / 2 + 150, height * (3 / 4), 175, 50) + " | Guide")
  
  console.log(mouseCollide(mouseX, mouseY, width / 2, height * (3 / 4), 175, 50) + " | Menu")
}

function keyPressed() {
  if (key == 'e') {
    if (game.ammo > 0) {
      allBullets.push(new Bullet(player.ship.x))
      game.ammo--
    }
  }
  if (key == 'r') {
    if (player.cooldown == false) {
      if (game.debug == true) {
        game.ammo = Number.MAX_SAFE_INTEGER
      } else {
        game.ammo = 10
      }
      // player.cooldown = true
      // setTimeout(function() { player.cooldown = false }, 1000)
    } 
  }
  if (key == 'd' && game.debug == true) {
    allAliens = []
    console.log(game.level + 1)
  }
}

function alienShot() {
  if (mod()) { return }
  for (let i = 0; i < allAliens.length; i++) {
    for (let j = 0; j < allBullets.length; j++) {
      if (rectCollide(allAliens[i].x, allAliens[i].y, 60, 40, allBullets[j].x, allBullets[j].y, 4, 10)) {
        allAliens.splice(i, 1)
        allBullets.splice(j, 1)
        game.score++
        return
      }
    }//end j loop
  }//end i loop
}//alienShot

function bossShot() {
  if (!mod()) { return }
  for (let i = 0; i < allBullets.length; i++) {
    if (boss.small != undefined && rectCollide(boss.small.x, boss.small.y, 100, 100, allBullets[i].x, allBullets[i].y, 4, 10)) {
      boss.small.hp -= 5
      if (boss.small.hp <= 0) {
        boss.small = undefined
        allAliens = []
        console.log("Small Boss is now deceased")
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
        allAliens = []
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

// function alienCollide() {
//   for (let i = 0; i < allAliens.length; i++) {
//     if (allAliens[i].x >= player.ship.x - 50 && allAliens[i].y >= 850 - 50 && allAliens[i].x <= player.ship.x + 50 && allAliens[i].y <= 850 + 50) {
//       gameOver = true
//       allAliens = []
//     }
//   }
// }

function alienCollide() {
  for (let i = 0; i < allAliens.length; i++) {
    if (rectCollide(player.ship.x, player.ship.y, 70, 90, allAliens[i].x, allAliens[i].y, 60, 40)) {
      gameOver = true
      game.scene = "DEATH"
      allAliens = []
    }
  }
}

function levelCompleted() {
  if (allAliens.length == 0 && gameOver == false) {
    allBullets = [];
    if (mod()) {
      boss.small = undefined
      boss.big = undefined
    }
    game.ammo = 10;
    game.level++;
    if (!mod()) {
      if (game.level >= 3) {
        for (let x = 0; x < 10; x++) {
          allAliens.push(new Minion(x * 60 + 120, 60));
          allAliens.push(new Minion(x * 60 + 120, 120));
          allAliens.push(new Minion(x * 60 + 120, 180));
        }
      }
      else if (game.level == 2) {
        for (let x = 0; x < 10; x++) {
          allAliens.push(new Minion(x * 60 + 120, 60));
          allAliens.push(new Minion(x * 60 + 120, 120));
        }
      }
    } else {
      allAliens.push("BOSSLEVEL") // Prevent the game from breaking while on boss levels 
      if (game.level % 10 == 5) {
        boss.small = new TinyBoss(width / 2)
      } else {
        boss.big = new MotherShip(width / 2)
      }
    }
  }
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

function mod() {
  if (game.level % 10 == 5 || game.level % 10 == 0) {
    return true
  } else {
    return false
  }
}

/*----------------------------- Instance Classes --------------------------*/

class Player {
  constructor(x) {
    this.x = x;
    this.y = 850;
    this.pic = player.image
  }

  display() {
    imageMode(CENTER)
    image(this.pic, this.x, this.y, 70, 90)
  }

  move() {

  }
}

class Bullet {
  constructor(x) {
    this.x = x - 1
    this.y = 810
    this.speed = 2
  }
  move() {
    fill(255)
    stroke(0)
    rect(this.x, this.y, 4, 10)
    this.y -= 4 * this.speed
  }
}

class Minion {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speed = 5 * 4
    this.pic = allPics[0]
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

class TinyBoss {
  constructor(x) {
    this.x = x;
    this.y = 75;
    this.hp = 50
    this.pic = allPics[1];
  }

  display() {
    imageMode(CENTER);
    image(this.pic, this.x, this.y, 100, 100);
  }

  move() {

  }
}

class MotherShip {
  constructor(x, y) {
    this.x = x;
    this.y = 80;
    this.hp = 500;
    this.pic = allPics[2];
    this.speed = 2;
  }

  display() {
    imageMode(CENTER);
    image(this.pic, this.x, this.y, 200, 100);
  }

  move() {
    this.x += this.speed;
    if (this.x > width - 50 || this.x < 50) {
      this.speed *= -1
      // allAliens.push(new Minion(50, 175))
    }
  }
}

class Asteroids{
  constructor(y){
    this.x = random(30, 770);
    this.y = y;
    this.speed = 2
  }
  display(){
    circle(this.x, this.y, 30)
  }
  move(){
    this.y++
  }
}