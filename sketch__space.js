
function Space(points = [], systems = []) {
  this.points = points;
  this.systems = systems;
}

Space.prototype.update = function() {
  for (var i = 0; i < this.systems.length; i++) {  
    this.systems[i](this.points);
  }
  for (var i = 0; i < this.points.length; i++) {  
    this.points[i].update();
  }
}
