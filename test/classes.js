// vectors can be used to manipulate multiple coordinates at once

class ParticleEmitter {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.objects = []
  }

  create(type, amount) {
    if (type.toUpperCase() == "SMOKE") {
      for (let i = 0; i < amount; i++) {
        this.objects.push(new Smoke(this.x, this.y))
      }
    }
    else if (type.toUpperCase() == "FIRE") {
      for (let i = 0; i < amount; i++) {
        this.objects.push(new Fire(this.x, this.y))
      }
    }
  }

  display() {
    for (let i of this.objects) {
      i.display()
    }

    for (let i = this.objects.length - 1; i >= 0; i--) {
      if (this.objects[i].end()) {
        this.objects.splice(i, 1)
      }
    }
  }

  force(v) {
    for (let i of this.objects) {
      i.force(v)
    }
  }
}

class Smoke {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(0, 0)
    this.velocity = p5.Vector.random2D()
    this.velocity.mult(0.05)
    this.acceleration = createVector(0, 0)
    this.size = 16
    this.time = 500
  }

  display() {
    // tint(128, 128, 128, this.time);
    imageMode(CENTER);
    image(smoke, this.position.x, this.position.y, this.size, this.size);
    // ellipse(this.pos.x, this.pos.y, this.r * 2);

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
    this.time -= 7.5;
  }

  force(v) {
    this.acceleration.add(v)
  }

  end() {
    return this.time < 0
  }
}

class Fire {
  constructor(x, y) {
    this.position = createVector(x, y)
  }

  display() {
    
  }
}