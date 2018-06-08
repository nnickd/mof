
//var gravitySystem = createForcePairs(attract, -10);

var nuclearSystem = createForcePairs(pairForce(attract, (p1, p2) => {
  var distance = p2.position.dist(p1.position);
  return (distance < (p1.radius + p2.radius))
}), 1000000);

//var nuclearSystem2 = createForcePairs(pairForce(attract, (p1, p2) => {
// var distance = p2.position.dist(p1.position);
// return (distance < (p1.radius + p2.radius) * 6 && distance > (p1.radius + p2.radius)) 
//}), -1000000);

//var nuke = function (p1, p2) {
//  nuclearSystem(p1, p2);
//  nuclearSystem2(p1, p2);
//}





//var nuclearSystem = createForcePairs(nuclear, 30, -20);
// var gravitySystem = createForcePairs(gravity, -10, 100, -100000000000)
// var gravityMagnetSystem = createForcePairs(gravAndMag, -10, 100000000000);
var magnetSystem = createForcePairs(attract, 100, 'charge');


//var drawSystem = createForcePoints(point => point.show())

function setup() {
  //createCanvas(300, 300);
  createCanvas(1920, 974);
  //space = new Space([], [gravitySystem, nuclearSystem, absorb, cleanup])

  // space = new Space([], [nuclearSystem])
  space = new Space([], [magnetSystem])
  pointStack = [];
  freeze = false;
}

function draw() {
  background(127);
  //space.systems[0] = createForcePairs(attract, random(1, 1000));
  while (pointStack.length > 0) {
    space.points.push(pointStack.pop());
  }
  space.update();
}

function mouseClicked() {
  var point = new Point({
    position: createVector(mouseX - (width / 2), mouseY - (height / 2))
  });
  pointStack.push(point);
  point.show();
}


function mouseDragged() {
  mouseClicked();
}

function keyPressed() {
  if (keyCode === DELETE) {
    space.points = [];
  } else if (keyCode === ENTER) {
    freeze = !freeze;
    if (freeze) {
      noLoop();
    } else {
      loop();
    }
  }
}
