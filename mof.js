
var gravitySystem = createForcePairs(attract, -100000000000);
// var innerGravitySystem = createForcePairs(attract, 10000);
var innerGravitySystem = createForcePairs(gravity, -100, 100, 100)


function setup() {
  createCanvas(1920, 974);

  //space = new Space([], [gravitySystem, nuclearSystem, absorb, cleanup])
  // space = new Space([], [nuclearSystem])
  // space = new Space([], [magnetSystem, absorb, cleanup]);
  // space = new Space([], [magnetSystem, connectionSystem]);
  space = new Space([], [gravitySystem, connectionSystem, absorb, cleanup]);

  pointStack = [];
  freeze = false;
  parentPoint = null;
}

function draw() {
  background(127);
  while (pointStack.length > 0) {
    space.points.push(pointStack.pop());
  }

  // space.update();
  space.update(point => {

    // push()
    // beginShape();
    // fill(30);
    // translate(width / 2, height / 2);
    for (var i = 0; i < point.space.points.length; i++) {
      attract(point, point.space.points[i], 10000)
      // vertex(point.space.points[i].position.x, point.space.points[i].position.y);
    }
    // endShape(CLOSE);
    // pop();
  });
}

function mouseClicked() {
  if (mouseIsPressed) {
    if (parentPoint) {

      if (parentPoint.space.points.length >= 5) {
        childPoint = new Point({
          position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
          space: new Space([], [innerGravitySystem, connectionSystem, absorb, cleanup]),
          radius: 30,
        // colour: color(66, 66, 66),
        });
        parentPoint.space.points.push(childPoint);
        parentPoint = childPoint;
      }

      point = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
        colour: color(66, 66, 66),
        radius: parentPoint.radius / 2
      });

      parentPoint.space.points.push(point)
      point.show();
    } else {
      parentPoint = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
        space: new Space([], [innerGravitySystem, connectionSystem, absorb, cleanup]),
        radius: 10
      });
      pointStack.push(parentPoint);
      parentPoint.show();
    }

  }




}

function mouseReleased() {
  parentPoint = null;
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
