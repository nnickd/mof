var connectRange = 100
var drawRange = 100
var connectForce = pairForce(drawPointLine, rangeFilter, drawRange);
var defp = {
  radius: 10, 
  maxSpeed: 6,
  mass: 30
}

var pairConnectForce = pairForce(drawPointLine, rangeFilter, drawRange);
var pairSystem = createForcePairs((p1, p2) => {

    attract(p1, p2, -100, 'charge')


  if (rangeFilter(p1, p2, connectRange)) {
  // if (rangeFilter(p1, p2, (p1.radius + p2.radius) * 2)) {
    attract(p1, p2, 101, 'charge')
  } 


  // if (!rangeFilter(p1, p2, connectRange)) {
  // attract(p1, p2, -100, 'charge')
  // } else {
  //   attract(p1, p2, 100, 'charge')
  // }

  
  pairConnectForce(p1, p2);
})

var innerConnectForce = pairForce(drawPointLine, rangeFilter, 200);
var innerPairSystem = createForcePairs((p1, p2) => {
  // if (!rangeFilter(p1, p2, connectRange / 10)) {
  //   attract(p1, p2, -1000000, 'mass')

  // } else {

  //   attract(p1, p2, 1000, 'mass')
  // }
  // innerConnectForce(p1, p2);


  // follow(p1, p1.parent);
  // follow(p2, p2.parent);
})


var innerParentSystem = createForcePoints(point => {
  if (point.parent) {
    // debugger;
    retract(point, point.parent, 100 -10000000);
    follow(point.parent, point, -100);
    // nuclear(point.parent, point, 10, 10000)
    
  }
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


  for (var i = 0; i < point.space.points.length; i++) {
    // attract(point, point.space.points[i], -1000000, 'mass')
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
  absorbOn = true;
  maxGroup = 0;
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
    space: new Space([], [innerPairSystem, innerParentSystem
      // , absorb, cleanup
    ]),
    radius: defp.radius,
    maxSpeed: defp.maxSpeed,
    mass: defp.mass
  });
  pointStack.push(parentPoint);
  parentPoint.show();
  // parentPoint.addChildren(maxGroup);

  // parentPoint.addChildren(random() * maxGroup);
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
  } else if (keyCode === LEFT_ARROW) {
    if (absorbOn === true) {
      for (let p of space.points) {
        p.space.systems.push(absorb)
        p.space.systems.push(cleanup)
      }
    }
    absorbOn = false;
  } else if (keyCode === RIGHT_ARROW) {
    if (absorbOn === false) {

      for (let p of space.points) {
      p.space.systems.pop()
      p.space.systems.pop()
      }
    }
    absorbOn = true;
  }
}
