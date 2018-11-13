
var connectRange = 300;
var connectForce = pairForce(drawPointLine, rangeFilter, connectRange);

var pairSystem = createForcePairs((p1, p2) => {
  // attract(p1, p2, -100000, 'charge')
  if (!rangeFilter(p1, p2, connectRange)) {
    attract(p1, p2, -200000000, 'mass')
    // attract(p1, p2, -100000000, 'charge')
  } else {
    attract(p1, p2, 100000000, 'mass')
    // attract(p1, p2, 200000000, 'charge')
  }
  // attract(p1, p2, -10000, 'mass')
  // if (rangeFilter(p1, p2, 1)) {
  //   // p1.velocity.mult(-1)
  //   // p2.velocity.mult(-1)

    // if (p1.space && p2.space) {
    //   absorb(p1.space.points.concat(p2.space.points))
    //   cleanup(p1.space.points.concat(p2.space.points))
    //   mergeSystem(p1.space.points.concat(p2.space.points));
    // }
  //   // attract(p1, p2, 100000000000000000, 'mass', true)
  // }
  connectForce(p1, p2);
})

// var mergeSystem = createForcePairs((p1, p2) => {
//   // if (!rangeFilter(p1, p2, 100)) {
//   // attract(p1, p2, 1000)
//   attract(p1, p2, -10000, 'mass')
//   // } else 


//   // connectForce(p1, kp2);
// })




var innerPairSystem = createForcePairs((p1, p2) => {
  attract(p1, p2, 100, 'charge')
    // if (!rangeFilter(p1, p2, connectRange / 3)) {
    //   attract(p1, p2, -10000, 'mass')

    // } else {

    //   attract(p1, p2, 10000, 'mass')
    // }
  connectForce(p1, p2);
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
  space = new Space([], [pairSystem]);//, absorb, cleanup]);

  pointStack = [];
  freeze = false;
  parentPoint = null;
  time = 0;
  maxGroup = 3;
}

function draw() {
  background(66);
  while (pointStack.length > 0) {
    space.points.push(pointStack.pop());
  }

  space.update(spaceSystem);

  time++;
}

function mouseClicked() {

  // if (mouseIsPressed) {
    // if (parentPoint && parentPoint.space.points.length > maxGroup) {
    //   parentPoint.charge = 0;
    //   parentPoint.mass = 0;
    //   for (var p of parentPoint.space.points) {
    //     parentPoint.charge += p.charge;
    //     parentPoint.mass += p.mass;
    //   }
    //   parentPoint = null;
    // }

     parentPoint = new Point({
       position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
       space: new Space([], [innerPairSystem]), //, absorb, cleanup]),
       radius: 10,
       maxSpeed: 6
     });
     pointStack.push(parentPoint);
     parentPoint.show();


     for (var i = 0; i < maxGroup; i++) {
       point = new Point({
                 position: createVector(mouseX - (width / 2) + random(), mouseY - (height / 2) + random()),
                 colour: parentPoint.colour,
                 radius: parentPoint.radius,
                 maxSpeed: 6
               });
               push();
               colorMode(HSB, 360, 100, 100);
               var c = hue(point.colour) + parentPoint.space.points.length * 60;
               while (c > 360) {
                 c -= 360;
               }
               point.colour = color(c, 60, 75);
               pop();
               parentPoint.space.points.push(point)
               point.show();
     }

    // if (parentPoint) {
    //   point = new Point({
    //     position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
    //     colour: parentPoint.colour,
    //     radius: parentPoint.radius,
    //     maxSpeed: 30
    //   });

    //   push();
    //   colorMode(HSB, 360, 100, 100);
    //   var c = hue(point.colour) + parentPoint.space.points.length * 60;
    //   while (c > 360) {
    //     c -= 360;
    //   }


    //   point.colour = color(c, 60, 75);
    //   pop();

    //   parentPoint.space.points.push(point)
    //   point.show();
    // } else {
    //   parentPoint = new Point({
    //     position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
    //     space: new Space([], [innerPairSystem]),//, absorb, cleanup]),
    //     radius: 10,
    //     maxSpeed: 6
    //   });
    //   pointStack.push(parentPoint);
    //   parentPoint.show();




    // }
  // }
}

function mouseReleased() {
  parentPoint.charge = 0;
  parentPoint.mass = 0;
  for (var p of parentPoint.space.points) {
    parentPoint.charge += p.charge * 2;
    parentPoint.mass += p.mass * 2;
  }
  parentPoint = null;
}

function mouseDragged() {
  if (time % 10 == 0) {
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
    console.log('maxGroup: ', maxGroup)
  } else if (keyCode === DOWN_ARROW) {
    maxGroup--;
    console.log('maxGroup: ', maxGroup)
  }
}
