function Point(options = {}, forces = []) {
  this.position = createVector(0, 0, 0);
  this.velocity = createVector(0, 0, 0);
  this.acceleration = createVector(0, 0, 0);

  //this.mass = random([50, 50, 50, 50, 100, 100, 100, 150]);
  this.mass = 100;
  this.life = null;
  // this.charge = random([-1, 1]);
  this.spin = random([-.02, -.015, -.01, -.05, 0, .05, .01, .015, .02]);
  this.forces = forces;
  // this.colour = color(random([190, 200, 210]), random([25, 35, 45]), random([60, 70, 80]));
  // this.colour = color(random([0, 128, 255]), random([0, 128, 255]), random([0, 128, 255]));

  // this.colour = random([color(255, 0, 0), color(0, 0, 255)])
  push();
  colorMode(HSB, 360, 100, 100);
  this.colour = color(random() * 360, 100, 100);
  // this.colour = color(random([60, 120, 180, 240, 300, 360]), 100, 100);
  pop();
  // this.points = [];
  this.radius = 10;
  this.maxSpeed = 10;
  this.dead = false;
  this.flip = true;
  this.merge(options);
  this.colorCharge();
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

  // var step = frameCount % 20;
  // var angle = map(step, 0, 20, 0, TWO_PI);
  // var cos_a = cos(angle);
  // var sin_a = sin(angle);
  // // Equivalent to rotate(angle);
  // applyMatrix(cos_a, sin_a, -sin_a, cos_a, this.position.x,  this.position.y);  // push();
  // translate((width / 2) + this.position.x, (height / 2) + this.position.y);
  // stroke(this.colour);
  // strokeWeight(3);
  // line(0, 0, this.velocity.x + this.maxSpeed, this.velocity.y + this.maxSpeed)
  // pop();



  ellipse(this.position.x, this.position.y, this.radius);
  // rect(this.position.x, this.position.y, this.radius, this.radius);
  // rotate(this.spin * PI)

  pop();

  // push()
  // translate(this.position.x - (width / 2), this.position.y - (height / 2));
  // noStroke()
  // colorMode(HSB, 360, 100, 100);
  // fill(this.colour);

  // var mid = this.velocity.copy().normalize().mult(this.radius);
  // var left = mid.copy().rotate(-PI * 2 / 3);
  // var right = mid.copy().rotate(PI * 2 / 3);
  // triangle(left.x, left.y, mid.x, mid.y, right.x, right.y);
  // triangle(-left.x, -left.y, -mid.x, -mid.y, -right.x, -right.y);
  // pop()
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

Point.prototype.addChildren = function (maxGroup, options = null) {
  if (this.space) {
    for (var i = 0; i < maxGroup; i++) {
      point = new Point({
        position: createVector(mouseX - (width / 2) + random(), mouseY - (height / 2) + random()),
        colour: this.colour,
        radius: this.radius,
        maxSpeed: 6,
        parent: this
      });


      push();
      colorMode(HSB, 360, 100, 100);
      var c = hue(point.colour) + this.space.points.length * 60;
      while (c > 360) {
        c -= 360;
      }
      point.colour = color(c, 60, 75);
      pop();

      if (options) {
        point.merge(options);
      }
      this.space.pointStack.push(point)
      point.show();
    }
  }


  // this.charge = 0;
  // this.mass = 0;
  // for (var p of this.space.points) {
  //   this.charge += p.charge * 2;
  //   this.mass += p.mass * 2;
  // }
}