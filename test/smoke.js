let particle
let smoke

function preload() {
  smoke = loadImage("effect.png")
}

function setup() {
  createCanvas(512, 512)
  particle = new ParticleEmitter(width / 2, height / 2)
}

// particles should be drawn before the ship to prevent gray ball on ship

function draw() {
  background(0)

  let diry = map(mouseY, 0, height, -0.1, 0.1)
  let wind = createVector(0, diry)
  particle.force(wind)

  particle.create("SMOKE", 1)
  particle.display()
}