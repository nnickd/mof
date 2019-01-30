const _PointSystem_ = new PointSystem();

function setup() {
  createCanvas(1920, 974);
  space = new Space([], []);
}

function draw() {
  background(66);
  space.update();
}

// function mouseClicked() {
// }

// function mouseDragged() {
// }

// function mouseReleased() {
// }

// function mouseClicked() {
// }

// function keyPressed() {
// }
