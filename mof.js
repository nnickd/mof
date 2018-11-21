var connectRange = 400
var drawRange = 400

var pulseSystem = createForcePoints(pulseForce, 20, 10, 1);

var pairConnectForce = pairForce(drawPointLine, rangeFilter, [drawRange]);
var pairSystem = createForcePairs((p1, p2) => {
  // attract(p1, p2, -1000000, 'charge')

  midAttractRepel(p1, p2, connectRange, 1000, 'mass')

  pairConnectForce(p1, p2);
})

var innerConnectForce = pairForce(drawPointLine, rangeFilter, [200]);
var innerRepelForce = pairForce(attract, rangeFilter, [10, true], [1000000, 'mass']);
var innerAttractForce = pairForce(attract, rangeFilter, [600, false], [-1000000, 'mass']);
var innerPairSystem = createForcePairs((p1, p2) => {
  // attract(p1, p2, -10, 'charge')
  innerRepelForce(p1, p2);
  innerAttractForce(p1, p2);
  // midAttractRepel(p1, p2, connectRange, 300, 'charge')
  innerConnectForce(p1, p2);
})

// var innerSpaceSystem = points => {
//   debugger;

//   for (let point of points) {

//     if (point.parent) {
     
//     }
//   }
// }


var innerSpaceForce = pointForce(point => {
  for (var i = 0; i < point.parent.space.points.length; i++) {
    follow(point.parent, point.parent.space.points[i], -10000, 'mass');
    // follow(point.parent.space.points[i], point.parent,  100, 'mass');
  // midAttractRepel(point.parent, point.parent.space.points[i], 100, 300, 'charge')

  }
}, point => point.parent)
var innerSpaceSystem = createForcePoints(innerSpaceForce)


function setup() {
  createCanvas(1920, 974);
  space = new Space([], [pairSystem, pulseSystem]);
  // space = new Space([], [pairSystem, pulseSystem, absorb, cleanup]);
  freeze = false;
  // space = new Space([], [pairSystem]);
  // space = new Space([], [pairSystem, absorb, cleanup]);
}

function draw() {
  background(66);
  space.update();
}

function mouseClicked() {
  let innerPointOptions = {
    radius: 9,
    maxSpeed: 6,
    // colour: color(0, 127, 255)
  }
  let innerSpace = new Space([], [innerPairSystem, innerSpaceSystem], innerPointOptions, 6);
  // let innerSpace = new Space([], [innerPairSystem, innerSpaceSystem, absorb, cleanup], innerPointOptions, 30);

  let pointOptions = {
    radius: 10,
    maxSpeed: 6,
    mass: 100,
    // colour: color(255, 127, 0)
  }

  let point = createPoint(space, pointOptions, innerSpace)

  // for (let p of point.space.points) {
  //   debugger;
  //   createPoint(p.space,
  //     {
  //       radius: 8,
  //       maxSpeed: 6,
  //       colour: color(240, 100, 100)
  //     }, innerSpace);
  // }
}
// function mouseReleased() {
// }

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
