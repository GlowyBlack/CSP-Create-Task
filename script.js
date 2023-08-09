 // AP Create Task Project
let game = { score: 0, highscore: 0, ammo: 10, level: 1, scene: "MENU", sprites: [], debug: false, background: { x: [], y: [], c: [] } }
let volume = { music: { value: 0.5, slider: undefined }, sounds: { value: 0.5, slider: undefined } }
let player = { ship: undefined, cooldown: false, image: undefined }
let boss = { small: undefined, big: undefined }
let allAliens = [];
let allBullets = [];
let allPics = [];
let allShips = [];
let allAsteroids = [];
let allShields = [];
let allSounds = [];
let asteroidSpawn = null;
let gameOver = false;


function preload() {
  player.image = loadImage("assets/images/ship.png") //
  allPics[0] = loadImage("assets/images/alien.png") //
  allPics[1] = loadImage("assets/images/MiniBoss.png") //
  allPics[2] = loadImage("assets/images/BigBoss.png") //
  allPics[3] = loadImage("assets/images/asteroid.png") //
  allPics[4] = loadImage("assets/images/ship0.png") 
  allPics[5] = loadImage("assets/images/ship1.png") //
  allPics[6] = loadImage("assets/images/ship2.png") //
  allSounds["MUSIC"] = loadSound("assets/sounds/backgroundmusic.mp3")
  allSounds["SHOOT"] = loadSound("assets/sounds/shoot.mp3")
  allSounds["TESTMUSIC"] = loadSound("assets/sounds/sus.mp3")
  allSounds["TESTSOUND"] = loadSound("assets/sounds/testfx.mp3")
  game.sprites = loadJSON("shield/sprites.json")

  drawBackground(random(250, 500))
}

function setup() {
  createCanvas(800, 950)
  frameRate(60)

  select("body").attribute("style", "background: black")
  
  player.ship = new Player(width / 2);
  allShields.push(new Shield(width / 2 - 250, 750))
  // allShields.push(new Shield(width / 2, 750))
  allShields.push(new Shield(width / 2 + 250, 750))

  allShips.push(allPics[4])
  allShips.push(allPics[5])
  allShips.push(allPics[6])

  imageMode(CENTER);
  for (let i = 0; i < 10; i++) {
    allAliens.push(new Minion((i * 60 + 120), 60));
  }

  if (localStorage.getItem("HIGHSCORE") != null) {
    game.highscore = Number(localStorage.getItem("HIGHSCORE"))
  } else {
    localStorage.setItem("HIGHSCORE", 0)
  }

  scene()
}

function scene() {
  push()
  background(0)
  for (i = 0; i < 250; i++) {
    fill(game.background.c[i])
    circle(game.background.x[i], game.background.y[i], 2)
  }
  pop()

  if (game.scene == "MENU") {
    push();
    textFont("Open Sans");
    textSize(36);
    textAlign(CENTER);
    fill(255);
    text("Space Invaders Ripoff", width / 2, height / 4);
    text("High Score: "+game.highscore, width/2, height / 4 + 100);
    fill(255, 255, 255, 0);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2 - 150, height * (3 / 4), 175, 50);
    rect(width / 2 + 150, height * (3 / 4), 175, 50);
    rect(width / 2, height - 160, 175, 50);

    fill(255);
    textSize(24);
    text("Play", width / 2 - 150, height * (3 / 4) + 7.5);
    text("Controls", width / 2 + 150, height * (3 / 4) + 8);
    text("Settings", width / 2, height - 160 + 7.5);
    pop()
  }

  if (game.scene == "GUIDE") {
    push();
    textFont("Open Sans");
    textSize(36);
    textAlign(CENTER);
    fill(255, 255, 255, 0);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2 , height * (3 / 4), 175, 50);
    fill(255)
    text("Controls", width / 2, height / 4);
    textSize(20)
    text("Right Arrow - move right", width / 2, height / 4 + 60);
    text("Left Arrow - move left", width / 2, height / 4 + 80);
    text("E - Shoot Bullet", width / 2, height / 4 + 100);
    text("R - Reload Bullet", width / 2, height / 4 + 120);
    textSize(24);
    text("Back", width / 2 , height * (3 / 4) + 7.5);
    pop()
  }

  if (game.scene == "SETTINGS") {
    push()
    
    textFont("Open Sans")
    textSize(36)
    textAlign(CENTER)
    fill(255, 255, 255, 0)
    stroke(255)
    rectMode(CENTER)
    rect(width / 2 , height * (3 / 4), 175, 50)
    fill(255)
    text("Settings", width / 2, height / 4)
    
    textSize(18)
    text("Music", width / 2, height / 4 + 75)
    let tmp = posAdjust(width / 2 + 22.5, height / 4 + 105, 160, 20, CENTER)
    volume.music.slider = createSlider(0, 10, volume.music.value * 10)
    volume.music.slider.style('width', '130px')
    volume.music.slider.position(tmp.x, tmp.y)
    text("Sound Effects", width / 2, height / 4 + 155)
    tmp = posAdjust(width / 2 + 22.5, height / 4 + 185, 160, 20, CENTER)
    volume.sounds.slider = createSlider(0, 10, volume.sounds.value * 10)
    volume.sounds.slider.style('width', '130px')
    volume.sounds.slider.position(tmp.x, tmp.y)
    fill(255, 255, 255, 0)
    stroke(255)
    rectMode(CENTER)
    rect(width / 2 , height / 4 + 250, 175, 50)
    text("Test Music", width / 2, height / 4 + 255)
    rect(width / 2 , height / 4 + 325, 175, 50)
    text("Test Sounds", width / 2, height / 4 + 330)
    
    textSize(24)
    text("Back", width / 2 , height * (3 / 4) + 7.5)
    
    pop()
  }

  if (game.scene == "DEATH") {
    // DEATH
    // Add explosion effect
    let tmp = { x: player.ship.x - 70 / 0.5, y: player.ship.y - 90 / 0.5 }
    let explode = select("#explode")
    explode.position(tmp.x, tmp.y + 50)
    explode.removeAttribute("hidden")
    explode.play()
    allSounds["MUSIC"].stop()
    setTimeout(function() {
      explode.attribute("hidden", "")
      explode.position(width * 2, 0)
      clearInterval(asteroidSpawn)
      game.scene = "END"
      scene()
    }, 1850)
  }

  if (game.scene == "END") {
    // END
    // PUT CLEANUP/RESTART CODE HERE
    if (gameOver == false) { return }
    
    push()
    textFont("Open Sans")
    textSize(36)
    textAlign(CENTER)
    if (game.score > game.highscore) {
      localStorage.setItem('HIGHSCORE', Number(game.score))
      game.highscore = game.score
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

function draw() {
  if (game.scene != "GAME") { return }
  
  push()
  background(0)
  for (i = 0; i < 250; i++) {
    fill(game.background.c[i])
    circle(game.background.x[i], game.background.y[i], 2)
  }
  pop()  
  fill(255)
  textFont("Open Sans")
  textSize(24)
  text("Score: " + game.score, 675, 30)
  text("Ammo: " + game.ammo, 675, 60)
  text("Lives: " + (player.ship.hp + 1), 675, 90)
  imageMode(CENTER);

  if (game.level % 10 != 5 && game.level % 10 != 0) {
    for (let i = 0; i < allAliens.length; i++) {
      allAliens[i].display()
      allAliens[i].move()
    }
  } else if (game.level % 10 == 5 && boss.small != undefined) {
    boss.small.display()
    boss.small.move();
    for (let i = 0; i < allAliens.length; i++) {
      allAliens[i].display()
      allAliens[i].move()
    }
  } else if (game.level % 10 == 0 && boss.big != undefined) {
    boss.big.display();
    boss.big.move();
    //print("testing allaliens" + allAliens.length)
    for (let i = 0; i < allAliens.length; i++) {
      allAliens[i].display()
      allAliens[i].move()
    }
  }

  for (let i = 0; i < allAsteroids.length; i++) {
    allAsteroids[i].display()
    allAsteroids[i].move()
    if (allAsteroids[i].y > height + 100) {
      allAsteroids.splice(i, 1)
      i--
    }
  }

  // for (let i of allShields) {
  //   i.draw()
  // }

  player.ship.display()

  for (let i = 0; i < allBullets.length; i++) {
    allBullets[i].move();
    if (allBullets[i].y < 0) {
      allBullets.splice(i, 1)
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

  shipShot();
  alienShot();
  // shieldShot();
  // shieldShotTest2() (real shot thing)


  asteroidShot();
  bossShot();
  alienCollide();
  asteroidCollide();
  levelCompleted();
}

function mousePressed() {
  if (game.scene == "MENU") {
    if (mouseCollide(mouseX, mouseY, width / 2 - 150, height * (3 / 4), 175, 50)) {
      clearInterval(asteroidSpawn)
      // asteroidSpawn = setInterval(callAsteroids, 3000)
      allSounds["MUSIC"].play()
      // allSounds["MUSIC"].setVolume(game.volume.slider.value() / 10) 
      allSounds["SHOOT"].setVolume(volume.sounds.value)
      allSounds["MUSIC"].setVolume(volume.music.value) // temporary volume change (i went deaf)
      allSounds["MUSIC"].loop()
      // game.volume.slider.remove()
      game.scene = "GAME"
    }
    else if (mouseCollide(mouseX, mouseY, width / 2 + 150, height * (3 / 4), 175, 50)) {
      game.scene = "GUIDE"
      scene()
    }
    else if (mouseCollide(mouseX, mouseY, width / 2, height - 160, 175, 50)) {
      game.scene = "SETTINGS"
      scene()
    }
  }
  else if (game.scene == "GUIDE" || game.scene == "SETTINGS") {
    if (mouseCollide(mouseX, mouseY, width / 2 , height * (3 / 4), 175, 50)) {
      if (game.scene == "SETTINGS") {
        volume.music.value = volume.music.slider.value() / 10
        volume.sounds.value = volume.sounds.slider.value() / 10
        volume.music.slider.remove()
        volume.sounds.slider.remove()
      }
      game.scene = "MENU"
      scene()
    }
    if (mouseCollide(mouseX, mouseY, width / 2 , height / 4 + 250, 175, 50) && game.scene == "SETTINGS") {
      allSounds["TESTMUSIC"].setVolume(volume.music.slider.value() / 10)
      allSounds["TESTMUSIC"].play()
    } else if (mouseCollide(mouseX, mouseY, width / 2 , height / 4 + 325, 175, 50) && game.scene == "SETTINGS") {
      allSounds["TESTSOUND"].playMode('restart')
      allSounds["TESTSOUND"].setVolume(volume.sounds.slider.value() / 10)
      allSounds["TESTSOUND"].play()
    }
  }
  else if (game.scene == "END") {
    if (gameOver == true && mouseCollide(mouseX, mouseY, width / 2, height * (3 / 4), 175, 50)) {
      game.score = 0
      game.ammo = 10
      game.level = 1
      game.scene = "MENU"
      gameOver = false
      setup()
    }
  }

  if (game.debug == true) {
    console.log(mouseX + " | " + mouseY)
    console.log(mouseCollide(mouseX, mouseY, width / 2 - 150, height * (3 / 4), 175, 50) + " | Play")
    console.log(mouseCollide(mouseX, mouseY, width / 2 + 150, height * (3 / 4), 175, 50) + " | Guide")
    console.log(mouseCollide(mouseX, mouseY, width / 2, height - 160, 175, 50) + " | Settings")
    console.log(mouseCollide(mouseX, mouseY, width / 2, height * (3 / 4), 175, 50) + " | Menu")
  }
}

function mouseReleased() {
  if (game.scene == "SETTINGS") {
    allSounds["TESTMUSIC"].stop()
  }
}

function keyPressed() {
  if (key.toLowerCase() == 'e') {
    if (game.ammo > 0 && gameOver == false) {
      allSounds["SHOOT"].play()
      allBullets.push(new NewBullet(player.ship.x))
      game.ammo--
    }
  }
  if (key.toLowerCase() == 'r') {
      game.ammo = 10
      // player.cooldown = true
      // setTimeout(function() { player.cooldown = false }, 1000)
  }
  if (key.toLowerCase() == 't') {
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
  // if (key.toLowerCase() == 'd' && game.debug == true) {
  //   allAliens = []
  //   console.log(game.level + 1)
  // }
}

function levelCompleted() {
  if (allAliens.length == 0 && gameOver == false) {
    allBullets = []
    allAsteroids = []
    clearInterval(asteroidSpawn)
    // asteroidSpawn = setInterval(callAsteroids, 3000, game.level)
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
        asteroidSpawn = setInterval(callAsteroids, 3000, game.level)
      }
      else if (game.level == 2) {
        for (let x = 0; x < 10; x++) {
          allAliens.push(new Minion(x * 60 + 120, 60));
          allAliens.push(new Minion(x * 60 + 120, 120));
        }
        asteroidSpawn = setInterval(callAsteroids, 3000, game.level)
      }
    } else {
      allAliens.push(new Minion(width * 2, 0, true)) // Spawn ghost minion to prevent breaking
      asteroidSpawn = setInterval(callAsteroids, 3000, game.level)
      if (game.level % 10 == 5) {
        boss.small = new TinyBoss(width / 2)
      } else {
        boss.big = new MotherShip(width / 2)
      }
    }
  }
}