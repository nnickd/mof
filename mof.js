const _PointSystem_ = new PointSystem();

function setup() {
  createCanvas(1920, 974);
  space = new Space([], [_PointSystem_.outerPairSystem, _PointSystem_.absorb, _PointSystem_.cleanup]);
}

function draw() {
  background(66);
  space.update();
}

function mouseClicked() {

  let vel = createVector(random(1, 3), 0);

  vel.rotate(map(random(0, 12), 0, 12, 0, TWO_PI  ))

  createPoint(space, {
    velocity: vel
  })


}

function mouseDragged() {
  mouseClicked();
}

// function mouseReleased() {
// }

// function mouseClicked() {
// }

// function keyPressed() {
// }
