
//https://www.youtube.com/watch?v=7adUs4o2_JM
//https://codepen.io/LFCProductions/pen/YzNBgEd?editors=1010

let ball = {x:0,y:0,speed:0.01,t:0,radius:20};
let posRadius = 7;
let mousePos = null;
let pointToMove = null
let moving = true
let drawn = true

let points = [
    {x:ball.x,y:ball.y},
    {x:70,y:200},
    {x:395,y:130},
    {x:120,y:350} 
]

function setup() {
  createCanvas(600, 600)
  angleMode(RADIANS)
}


function draw() {
  background(0)
  noFill()
  stroke(255)
  bezier(points[0].x,points[0].y, points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
  drawPoints()
  checkIfCursorInPoint()
  // mousePoint()
  isMouseOverPoint()
 
  moveInBezierCurve() 
}

function moveInBezierCurve() {
  let a;
  let x;
  let y;
  let [p0, p1, p2, p3] = points;
    //Calculate the coefficients based on where the ball currently is in the animation
  let cx = 3 * (p1.x - p0.x);
  let bx = 3 * (p2.x - p1.x) - cx;
  let ax = p3.x - p0.x - cx - bx;

  let cy = 3 * (p1.y - p0.y);
  let by = 3 * (p2.y - p1.y) - cy;
  let ay = p3.y - p0.y - cy -by;

  let t = ball.t;

  //Increment t value by speed
  ball.t += ball.speed;
  //Calculate new X & Y positions of ball
  let xt = ax*(t*t*t) + bx*(t*t) + cx*t + p0.x;
  let yt = ay*(t*t*t) + by*(t*t) + cy*t + p0.y;

  if(ball.t > 1){
    ball.t=1;
  }

  //We draw the ball to the canvas in the new location
  ball.x = xt;
  ball.y = yt;


  //Calculating Tangent of the Curvetrepl
  let steps = 12
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    // Get the location of the point
    x = bezierPoint(points[0].x, points[1].x, points[2].x, points[3].x, t);
    y = bezierPoint(points[0].y, points[1].y, points[2].y, points[3].y, t);
    // Get the tangent points
    let tx = bezierTangent(points[0].x, points[1].x, points[2].x, points[3].x, t);
    let ty = bezierTangent(points[0].y, points[1].y, points[2].y, points[3].y, t);
    // Calculate an angle from the tangent points
    a = atan2(ty, tx);
    // a += PI;
    stroke(255, 102, 0);
    line(x, y, cos(a) * 30 + x, sin(a) * 30 + y);
    // The following line of code makes a line
    // inverse of the above line
    // line(x, y, cos(a)*-30 + x, sin(a)*-30 + y);
    stroke(0);
    ellipse(x, y, 10, 10);
  }
  
  // else if(ball.x >=)
  // rotate(sin(a)*30)
  drawBall();
  resetMatrix()  
  if(key == 'p'){
    print(a) 
  }
}

function drawBall() {
  fill(255);
  rectMode(CENTER)
  rect(ball.x,ball.y,ball.radius, 30);
  rectMode(CORNER)
}

function drawPoints() {
    fill(255,0,0)
    points.forEach(point => {
        circle(point.x,point.y,posRadius);
        fill(255,0,0)
        //Deal with text
        // ctx.font = "11px Arial";
          text(`(${point.x},${point.y})`,point.x,point.y+30);
    });
}

function isMouseOverPoint(point) { 
  let dx = mouseX
  let dy = mouseY
  return(dx*dx+dy*dy<posRadius*posRadius);
}

function mouseCircleCollide(x, y, cx, cy, d) {
  if (this.dist(x, y, cx, cy) <= d / 2) {
    return true
  }
  return false
}

function checkIfCursorInPoint(){
    if(mouseX && mouseY){
        points.forEach(point => {
          if (point != pointToMove) {
            if (mouseCircleCollide(mouseX, mouseY, point.x, point.y, 7)) {
              pointToMove = point;
            }
          }
        })
    }
}

function rotateItem() {
  
}
function mouseDragged() {
  if (pointToMove != null) {
    if(pointToMove === points[0]){
      points[0].x = mouseX;
      points[0].y = mouseY;
      ball.x = mouseX;
      ball.y = mouseY;
      return
    }
    let pointIndex = points.indexOf(pointToMove);
    //if (pointIndex < 0) {
    //  points[0].x = mouseX;
    //  points[0].y = mouseY;
    //}
    points[pointIndex].x = mouseX;
    points[pointIndex].y = mouseY;
  } 
}


function keyPressed() {
  if(key == 'r'){
    ball.t = 0;
  }

}