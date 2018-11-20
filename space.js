
function Space(points = [], systems = []) {
  this.points = points;
  this.systems = systems;
  this.time = 0;
}

Space.prototype.update = function (_pointForce = null) {
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
