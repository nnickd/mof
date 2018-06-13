function Point(options = {}) {
  this.position = createVector(0, 0, 0);
  this.velocity = createVector(0, 0, 0);
  this.acceleration = createVector(0, 0, 0);

  //this.mass = random([50, 50, 50, 50, 100, 100, 100, 150]);
  this.mass = 100;
  // this.charge = random([-1, 1]);
  this.spin = random([-.002, -.0015, -.001, -.005, 0, .005, .001, .0015, .002]);

  // this.colour = color(random([190, 200, 210]), random([25, 35, 45]), random([60, 70, 80]));
  // this.colour = color(random([0, 128, 255]), random([0, 128, 255]), random([0, 128, 255]));

  // this.colour = random([color(255, 0, 0), color(0, 0, 255)])
  push();
  colorMode(HSB, 360, 100, 100);
  this.colour = color(random() * 360, 100, 100);
  pop();
  // debugger;
  this.colorCharge();
  this.radius = 10;

  this.maxSpeed = 10;
  this.dead = false;
  this.points = [];


  for (var option of Object.keys(options)) {
    this[option] = options[option];
  }
}

Point.prototype.tick = function () {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);

  // this.velocity.rotate(this.spin * PI);
}

Point.prototype.show = function () {
  push();
  translate(width / 2, height / 2);
  noStroke()
  colorMode(HSB, 360, 100, 100);
  fill(this.colour);
  
  ellipse(this.position.x, this.position.y, this.radius);
  rotate(this.spin * PI)
  // text(this.charge, this.position.x + this.radius, this.position.y + this.radius)
  pop();
}

Point.prototype.update = function () {
  this.tick();

  this.bounds();
  this.show();

  if (this.space) {
    this.space.update();
  }
}

Point.prototype.bounds = function () {

  // if (
  //   this.position.x <= (-width / 2) - this.radius ||
  //   this.position.x >= (width / 2) + this.radius ||
  //   this.position.y <= (-height / 2) - this.radius ||
  //   this.position.y >= (height / 2) + this.radius
  // ) {
  //   this.position.x = 0;
  //   this.position.y = 0;
  // }

  // if (this.position.x <= (-width / 2) - this.radius)  {

  // }


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



  // if (this.position.x <= -(width / 4) - this.radius) this.position.x = (width / 4) + this.radius;
  // if (this.position.x >= (width / 4) + this.radius) this.position.x = -(width / 4) - this.radius;
  // if (this.position.y <= -(height / 4) - this.radius) this.position.y = (height / 4) + this.radius;
  // if (this.position.y >= (height / 4) + this.radius) this.position.y = -(height / 4) - this.radius;

  // if (this.position.x <= -(width / 4) - this.radius) {
  //   this.velocity.x *= -1;
  //   //this.position.x = (-width / 2) + this.radius;
  // }
  // if (this.position.x >= (width / 4) - this.radius) {
  //   this.velocity.x *= -1;
  //   //this.position.x = (width / 2) - this.radius;
  // }
  // if (this.position.y <= -(height / 4) + this.radius) {
  //   this.velocity.y *= -1;
  //   //this.position.y = (-height / 2) + this.radius;
  // }
  // if (this.position.y >= (height / 4) - this.radius) {
  //   this.velocity.y *= -1;
  //   //this.position.y = (height / 2) - this.radius;
  // }


}


Point.prototype.mixColor = function(colour) {
  this.colour = lerpColor(this.colour, colour, 0.5);

  this.colorCharge();
}

Point.prototype.colorCharge = function() {
  this.charge = (hue(this.colour) - 180);
}