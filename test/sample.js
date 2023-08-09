// simple particle test

let emitter
let img

function preload() {
  img = loadImage('effect.png')
}

function setup() {
  createCanvas(400, 400)
  emitter = new Emitter(200, 375)
}

function draw() {
  clear()
  background(0)
  blendMode(ADD)

  let force = createVector(0, -0.1)
  emitter.applyForce(force)

  let dir = map(mouseX, 0, width, -0.1, 0.1)
  let wind = createVector(dir, 0)
  emitter.applyForce(wind)

  emitter.emit(1)
  emitter.show()
  emitter.update()
}



// Instance Classes



class Emitter {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.particles = [];
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.position.x, this.position.y));
    }
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 64;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 7;
  }

  show() {
    // tint(150, 40, 80, this.lifetime);
    imageMode(CENTER);
    image(img, this.pos.x, this.pos.y, this.r, this.r);
    // ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}