const _PointSystem_ = new PointSystem();

function setup() {
  createCanvas(1920, 974);
  // space = new Space([], [_PointSystem_.pairSystem]);
  space = new Space([], [_PointSystem_.outerPairSystem, _PointSystem_.pulseSystem]);
  freeze = false;
}

function draw() {
  background(66);
  space.update();
}

function mouseClicked() {
  let innerPointOptions = {
    radius: 10,
    maxSpeed: 6,
    mass: 200
  }
  let innerSpace = new Space([], [_PointSystem_.innerPairSystem, _PointSystem_.innerPointSystem], innerPointOptions, 0);
  // let innerSpace = new Space([], [innerPairSystem, innerPointSystem], innerPointOptions, 6);

  let pointOptions = {
    radius: 10,
    maxSpeed: 12,
    mass: 100
  }

  let point = createPoint(space, pointOptions, innerSpace);
}

function mouseDragged() {
  if (space.time % 10 == 0) {
    mouseClicked();
  }
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
  // else if (keyCode === UP_ARROW) {
  // } else if (keyCode === DOWN_ARROW) {
  // } else if (keyCode === LEFT_ARROW) {
  // } else if (keyCode === RIGHT_ARROW) {
  // }
}
