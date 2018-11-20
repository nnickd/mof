var connectRange = 100
var drawRange = 100
var connectForce = pairForce(drawPointLine, rangeFilter, drawRange);

var pairConnectForce = pairForce(drawPointLine, rangeFilter, drawRange);
var pairSystem = createForcePairs((p1, p2) => {
  // attract(p1, p2, -100000, 'charge')
  // if (time % 3 == 0) {

  if (!rangeFilter(p1, p2, connectRange)) {
    attract(p1, p2, -20000000000, 'mass')
  //   // attract(p1, p2, -100000000, 'charge')
  } else {
    attract(p1, p2, 2000000000000, 'mass')
  //   // attract(p1, p2, 200000000, 'charge')
  }
  // }
  pairConnectForce(p1, p2);
})

var innerConnectForce = pairForce(drawPointLine, rangeFilter, 200);
var innerPairSystem = createForcePairs((p1, p2) => {
  // attract(p1, p2, 1000, 'charge')
  if (!rangeFilter(p1, p2, connectRange / 10)) {
    attract(p1, p2, -1000000, 'mass')

  } else {

    attract(p1, p2, 10000000000, 'mass')
  }
  innerConnectForce(p1, p2);
})



var centerForce = createForcePoints((point) => {

  point.radius += point.flip ? 1 : -1;

  if (point.radius > 20) {
    point.flip = false;
  }
  if (point.radius < 10) {
    point.flip = true;
  }

})


var spaceSystem = point => {
  // var mousePoint = new Point({ position: createVector(mouseX - (width / 2), mouseY - (height / 2)), mass: 100}); 
  // // if (!rangeFilter(mousePoint, point, 200)) {
  //   follow(mousePoint, point, -100000000);

  // } else {
  // follow(mousePoint, point, 100000);

  // }
  for (var i = 0; i < point.space.points.length; i++) {
    attract(point, point.space.points[i], -1000000, 'mass')
    // follow(point, point.space.points[i], -10, 'mass')
    // follow(point.space.points[i], point, 100, 'mass')
    // if (rangeFilter(point, point.space.points[i], 2 * (point.radius + point.space.points[i].radius))) {
    //   follow(point, point.space.points[i], 100, 'mass')
    // }
    drawPointLine(point, point.space.points[i]);
  }
}


function setup() {
  createCanvas(1920, 974);
  // space = new Space([], []);
  // space = new Space([], [pairSystem]);
  // space = new Space([], [pairSystem, centerForce]);
  space = new Space([], [pairSystem, absorb, cleanup]);

  pointStack = [];
  freeze = false;
  maxGroup = 6;
}

function draw() {
  background(66);
  while (pointStack.length > 0) {
    space.points.push(pointStack.pop());
  }
  // if (time % 2 == 0) {
  space.update(spaceSystem);
  // }

}

function mouseClicked() {
  let parentPoint = new Point({
    position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
    // space: new Space([], [innerPairSystem, centerForce]), //, absorb, cleanup]),
    space: new Space([], [innerPairSystem, absorb, cleanup]),
    radius: 10,
    maxSpeed: 3
  });
  pointStack.push(parentPoint);
  parentPoint.show();
  parentPoint.addChildren(maxGroup);
}


// function mouseReleased() {
// }

function mouseDragged() {
  if (space.time % 5 == 0) {
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
  } else if (keyCode === UP_ARROW) {
    maxGroup++;
    // console.log('maxGroup: ', maxGroup)
  } else if (keyCode === DOWN_ARROW) {
    maxGroup--;
    // console.log('maxGroup: ', maxGroup)
  }
}
