
function Space(points = [], systems = [], pointOptions = null) {
  this.points = points;
  this.systems = systems;
  this.pointOptions = pointOptions;

  this.pointStack = [];
  this.time = 0;
}

Space.prototype.update = function (_pointForce = null) {
  while (this.pointStack.length > 0) {
    this.points.push(this.pointStack.pop());
  }

  for (var i = 0; i < this.systems.length; i++) {
    this.systems[i](this.points);
  }

  for (var i = 0; i < this.points.length; i++) {
    this.points[i].update();
  }
  
  this.time++;
}

Space.prototype.addPoint = function(...points) {
  for (let point of points) {
    this.pointStack.push(point);
  }
}
