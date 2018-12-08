const _PointSystem_ = new PointSystem();

function setup() {
  createCanvas(1920, 974);
  // let mousePoint = new Point({
  //   mass: 10000000
  // }, [_PointForce_.mouseForce])

  let blackHole = new Point({
    mass: 100000000000000000000000000,
    colour: color(0, 0, 0)
  }, [_PointForce_.immobilize])

  space = new Space([], [
    _PointSystem_.outerPairSystem
    // , _PointSystem_.pulseSystem
    // , _PointSystem_.splitSystem
    , _PointSystem_.explodeSystem
    // , _PointSystem_.absorb
    , _PointSystem_.cleanup
  ]);

  freeze = false;
  dragVec = null;
}

function draw() {
  background(66);
  space.update();

  if (dragVec) {
    push()
    translate(width / 2, height / 2);
    stroke(1);
    line(dragVec.x, dragVec.y, mouseX - (width / 2), mouseY - (height / 2))
    pop()
  }
}



function mouseClicked() {
  if (dragVec) {
    dragVec.sub(createVector(mouseX - (width / 2), mouseY - (height / 2)))

    let pointOptions = {
      radius: 10,
      maxSpeed: 20,
      mass: 10,
      acceleration: dragVec.div(10)
    }

    createPoint(space, pointOptions);

    dragVec = null;
  } else {
    dragVec = createVector(mouseX - (width / 2), mouseY - (height / 2))
  }
}


// function mouseClicked() {
  // let innerPointOptions = {
  //   radius: 7,
  //   maxSpeed: 5,
  //   mass: 50
  // }
  // let innerSpace = new Space([], [_PointSystem_.innerPairSystem, _PointSystem_.innerPointSystem], innerPointOptions, 6);

  // let pointOptions = {
  //   radius: 10,
  //   maxSpeed: 3,
  //   mass: 10
  // }

  // // let point = createPoint(space, pointOptions, innerSpace);
  // let point = createPoint(space, pointOptions);
// }

// function mouseDragged() {
//   if (space.time % 3 == 0) {
//     mouseClicked();
//   }
// }

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
