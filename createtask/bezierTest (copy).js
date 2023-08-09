// Define the Bezier curve
let curve = new Bezier(x1, y1, x2, y2, x3, y3, x4, y4);

// Define a variable to keep track of the current position on the curve
let t = 0;

// Define the step size for moving along the curve
let step = 0.01;

function draw() {
  // Clear the canvas
  clear();

  // Calculate the current position on the curve
  let point = curve.get(t);

  // Calculate the tangent vector at the current position
  let tangent = curve.derivative(t);

  // Rotate the coordinate system so that the image will be rotated to match the tangent vector
  rotate(tangent.heading());

  // Draw the image at the current position on the curve
  image(img, point.x, point.y);

  // Increment the current position on the curve
  t += step;

  // If we've reached the end of the curve, start over
  if (t > 1) {
    t = 0;
  }
}
