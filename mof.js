const _PointSystem_ = new PointSystem();

function setup() {
  createCanvas(1920, 974);
  let mousePoint = new Point({
    mass: 10000000
  }, [_PointForce_.mouseForce])

  space = new Space([], [_PointSystem_.outerPairSystem, _PointSystem_.pulseSystem]);
  // space = new Space([], [_PointSystem_.outerPairSystem, _PointSystem_.explodeSystem, _PointSystem_.cleanup]);
  freeze = false;
}

function draw() {
  background(66);
  space.update();
}

function mouseClicked() {
  let innerPointOptions = {
    radius: 7,
    maxSpeed: 5,
    mass: 50
  }
  let innerSpace = new Space([], [_PointSystem_.innerPairSystem, _PointSystem_.innerPointSystem], innerPointOptions, 6);

  let pointOptions = {
    radius: 10,
    maxSpeed: 10,
    mass: 1000
  }

  let point = createPoint(space, pointOptions, innerSpace);
  // let point = createPoint(space, pointOptions);
}

function mouseDragged() {
  if (space.time % 3 == 0) {
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
