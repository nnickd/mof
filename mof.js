const _PointSystem_ = new PointSystem();




var pairSystem = _Force_.createForcePairs((p1, p2) => {
  // _PointForce_.attract(p1, p2, -10000000, 'charge');
  // _PointForce_.nuclear(p1, p2, 10, -100);





  // let x = map(p1.outerSpace.time, p1.outerSpace.hmmm[0], p1.outerSpace.hmmm[1], p1.outerSpace.hmmm[2], p1.outerSpace.hmmm[3]);

  // if (p1.outerSpace.time > p1.outerSpace.hmmm[1]) {
  //   p1.outerSpace.hmmm[0] = p1.outerSpace.hmmm[1];
  //   p1.outerSpace.hmmm[1] += p1.outerSpace.hmmm[4];
  //   p1.outerSpace.hmmm[2] *= -1;
  //   p1.outerSpace.hmmm[3] *= -1;
  // }
  



// if (p1.name != 'player' && p2.name != 'player' && 
// if(_PointFilter_.rangeFilter(p1, p2, 500))

    // _PointForce_.contact(p1, p2, -10);
  // _PointForce_.attract(p1, p2, 100, 'mass', 400);
  _PointForce_.attract(p1, p2, 3, 'mass');


  // _PointForce_.contact(p1, p2, -100);
  // outerAttractForce(p1, p2);
  // outerRepelForce(p1, p2);
  // outerDrawForce(p1, p2);
})




function setup() {
  createCanvas(1920, 974, WEBGL);
  // player = new Point({
  //   mass: 10,
  //   colour: color(0, 100, 100),
  //   // forces: [function (point) {
  //   //   _PointForce_.followMouse(point);
  //   // }],
  //   position: createVector(0, 0, 0),
  //   radius: 40,
  //   name: 'player'
  // })
  

  space = new Space([], [pairSystem]);
  // space = new Space([player], [pairSystem]);
  space.hmmm = [0, 100, -1000, 1000, 100]
  freeze = false;
  time = 1;
  _camera = createVector(width / 2, height / 2, 1000)
}


function draw() {
  background(66);
  // perspective(PI / 3.0, width / height, 0.1, 500);
  camera(_camera.x, _camera.y, _camera.z, width / 2, height / 2, 0, 0, 1, 0);
  if (keyCode == TAB) {
    orbitControl();
  }
  // camera(width / 2, height / 2, _camera.z, _camera.x, _camera.y, 0, 0, 1, 0);
  // push()
  // translate(width / 2, height / 2)
  space.update();
  // camera(0, 0, 20 + sin(frameCount * 0.01) * 100, 0, 0, 0, 0, 1, 0);
  // pop();
  time++;
}

function mouseClicked() {

  // let vel = createVector(random(1, 3), 0);

  // vel.rotate(map(random(0, 12), 0, 12, 0, TWO_PI  ))

  // createPoint(space, {
  //   velocity: vel
  // })
  if (keyCode != TAB)
    createPoint(space)

}

function mouseDragged() {
  mouseClicked();
}

// function mouseReleased() {
// }

// function mouseClicked() {
// }

function keyPressed() {
  if (keyCode === DELETE) {
    space.points = [];
  }
  if (keyCode === ENTER) {
    freeze = !freeze;
    if (freeze) {
      noLoop();
    } else {
      loop();
    }
  }

  if (keyCode === LEFT_ARROW) {
    _camera.x -= 10;
  }
  if (keyCode === RIGHT_ARROW) {
    _camera.x += 10;
  }
  if (keyCode === UP_ARROW) {
    _camera.y -= 10;
  }
  if (keyCode === DOWN_ARROW) {
    _camera.y += 10;
  }
}
function mouseWheel(event) {
  debugger;
  // print(event.delta);
  //move the square according to the vertical scroll amount
_camera.z += event.delta 
  // _camera.x = event.x;
// _camera.y = event.y;
  //uncomment to block page scrolling
  //return false;
}