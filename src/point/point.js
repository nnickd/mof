function Point(options = {}, forces = []) {
  this.position = createVector(0, 0, 0);
  this.velocity = createVector(0, 0, 0);
  this.acceleration = createVector(0, 0, 0);
  
  this.forces = forces;
  this.life = null;
  this.dead = false;
  this.flip = true;
  this.draw = ['drawWobbly'];
  // this.draw = [random(['drawEllipse', 'drawRect'])];

  
  this.mass = 100;
  this.spin = random([-.02, -.015, -.01, -.05, 0, .05, .01, .015, .02]);
  this.charge = random([-1, 1]);
  this.radius = 10;
  this.maxSpeed = 10;

  push();
  colorMode(HSB, 360, 100, 100);
  this.colour = color(random() * 360, 100, 100);
  pop();

  this.merge(options);
  this.colorCharge();
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
}

Point.prototype.update = function () {
  if (this.forces) {
    for (let force of this.forces) {
      force(this);
    }
  }
  
  this.tick();
  this.bounds();
  this.show();
  
  if (this.space) {
    this.space.update();
  }
  this.time++;
}

Point.prototype.bounds = function () {
  if (this.position.x < -(width / 2)) {
    this.position.x = -(width / 2);
    this.velocity.x *= -1;
  }

  else if (this.position.x > (width / 2)) {
    this.position.x = (width / 2);
    this.velocity.x *= -1;
  }
  if (this.position.y < -(height / 2)) {
    this.position.y = -(height / 2);
    this.velocity.y *= -1;
  }

  else if (this.position.y > (height / 2)) {
    this.position.y = (height / 2);
    this.velocity.y *= -1;
  }
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
