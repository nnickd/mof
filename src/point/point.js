function Point(options = {}, forces = []) {
  this.position = createVector(0, 0, 0);
  this.velocity = createVector(0, 0, 0);
  this.acceleration = createVector(0, 0, 0);
  
  this.forces = forces;
  this.life = null;
  this.dead = false;
  this.flip = true;
  // this.draw = ['drawWobbly', 12];
  // this.draw = _DrawSpace_.draw(this, 'drawWobbly', [7]);


  this.draw = ['drawEllipse'];
  this.bound = ['toroidal'];
  // this.draw = [random(['drawEllipse', 'drawRect'])];
  // this.bound = [random(['walls', 'toroidal'])];

  
  this.mass = 100;
  this.spin = random([-.02, -.015, -.01, -.05, 0, .05, .01, .015, .02]);
  this.charge = random([-1, 1]);
  this.radius = 10;
  this.maxSpeed = 10;

  push();
  colorMode(HSB, 360, 100, 100);
  this.colour = color(random() * 360, 100, 100);
  pop();

  this.colorCharge();
  this.merge(options);
  this.time = 0;
}

Point.prototype.tick = function () {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
  // this.velocity.rotate(this.spin * PI);
}


Point.prototype.show = function () {
  for (let draw of this.draw) {
    _DrawSpace_[draw](this);
  } 
  // this.draw()

}
Point.prototype.bounds = function () {
  for (let bound of this.bound) {
    _PointBounds_[bound](this);
  } 
}

Point.prototype.update = function () {
  if (this.forces) {
    for (let force of this.forces) {
      force(this);
    }
  }
  
  this.tick();
  // this.bounds();
  this.show();
  
  if (this.space) {
    this.space.update();
  }
  this.time++;
}


Point.prototype.mixColor = function (colour) {
  this.colour = lerpColor(this.colour, colour, 0.5);
  this.colorCharge();
}

Point.prototype.colorCharge = function () {
  this.charge = (hue(this.colour) - 179);
}

Point.prototype.merge = function (options) {
  for (var option of Object.keys(options)) {
    this[option] = options[option];
  }
}

Point.prototype.applyForce = function(force) {
  // this.acceleration.add(force.div(this.mass))
  this.acceleration.add(p5.Vector.div(force, this.mass))
}