

var connectForce = pairForce(drawPointLine, rangeFilter, 150);

transX = 0;
transY = 0;
 


var pairSystem = createForcePairs((p1, p2) => {
    attract(p1, p2, -1000, 'charge')
  if (rangeFilter(p1, p2, 2 * (p1.radius + p2.radius))) {
    // p1.velocity.mult(-1)
    // p2.velocity.mult(-1)
    // attract(p1, p2, 100000, 'mass', true)
  }
  connectForce(p1, p2);
})

var innerPairSystem = createForcePairs((p1, p2) => {
  // if (!rangeFilter(p1, p2, 100)) {
  // attract(p1, p2, 1000)
    attract(p1, p2, -10)
  // } else 
  
  if (rangeFilter(p1, p2, 2 * (p1.radius + p2.radius))) {
    attract(p1, p2, 100)
  }
  connectForce(p1, p2);
})

var spaceSystem = point => {
  for (var i = 0; i < point.space.points.length; i++) {
    attract(point, point.space.points[i], -100, 'mass', true)
    if (rangeFilter(point, point.space.points[i], 2 * (point.radius + point.space.points[i].radius))) {
      attract(point, point.space.points[i], 100000, 'mass', true)
    }
    // connectForce(point, point.space.points[i]);
  }
}


function setup() {
  createCanvas(1920, 974);
  // space = new Space([], []);
  space = new Space([], [pairSystem, absorb, cleanup]);

  pointStack = [];
  freeze = false;
  parentPoint = null;
}

function draw() {
  background(127);
  while (pointStack.length > 0) {
    space.points.push(pointStack.pop());
  }

  space.update(spaceSystem);
}

function mouseClicked() {
  if (mouseIsPressed) {
    if (parentPoint && parentPoint.space.points.length > 5) {
      parentPoint.charge = 0;
      parentPoint.mass = 0;
      for (var p of parentPoint.space.points) {
        parentPoint.charge += p.charge;
        parentPoint.mass += p.mass;
      }
      parentPoint = null;
    }

    if (parentPoint) {
      point = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
        colour: parentPoint.colour,
        radius: parentPoint.radius
      });

      push();
      colorMode(HSB, 360, 100, 100);
      var c = hue(point.colour) + parentPoint.space.points.length;
      while (c > 360) {
        c -= 360;
      }


      point.colour = color(c, 60, 75);
      pop();

      parentPoint.space.points.push(point)
      point.show();
    } else {
      parentPoint = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
        space: new Space([], [innerPairSystem, absorb, cleanup]),
        radius: 6
      });
      pointStack.push(parentPoint);
      parentPoint.show();
    }
  }
}

function mouseReleased() {

  parentPoint.charge = 0;
  parentPoint.mass = 0;
  for (var p of parentPoint.space.points) {
    parentPoint.charge += p.charge;
    parentPoint.mass += p.mass;
  }
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
