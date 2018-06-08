

function setup() {
  createCanvas(1920, 974);

  //space = new Space([], [gravitySystem, nuclearSystem, absorb, cleanup])
  // space = new Space([], [nuclearSystem])
  // space = new Space([], [magnetSystem, absorb, cleanup]);
  space = new Space([], [magnetSystem, connectionSystem]);

  pointStack = [];
  freeze = false;
}

function draw() {
  background(127);
  while (pointStack.length > 0) {
    space.points.push(pointStack.pop());
  }

  space.update();
  // space.update(point => {
  // });
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
