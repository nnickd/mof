
function Space(points = [], systems = [], pointOptions = null, maxPoints = null) {
  this.points = points;
  this.systems = systems;
  this.pointOptions = pointOptions;
  this.maxPoints = maxPoints;
  this.time = 0;
  this.pointStack = [];
}

Space.prototype.update = function (_pointForce = null) {
  while (this.pointStack.length > 0) {
    debugger;
    this.points.push(this.pointStack.pop());
    if (this.maxPoints && this.points >= this.maxPoints) {
      this.pointStack.length = 0;
    }
  }

  for (var i = 0; i < this.systems.length; i++) {
    this.systems[i](this.points);
  }

  for (var i = 0; i < this.points.length; i++) {
    this.points[i].update();
    if (_pointForce) {
      _pointForce(this.points[i]);
    }
  }
  
  this.time++;
}
