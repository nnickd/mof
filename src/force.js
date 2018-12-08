function Force() {
  this.pointForce = function (force, forceParams = [], filter = null, filterParams = []) {
    if (filter) {
      return (point) => {
        if (filter(point, ...filterParams)) {
          force(point, ...forceParams);
        }
      }
    } else {
      return (point) => {
        force(point, ...forceParams);
      }
    }
  }

  this.pairForce = function (force, forceParams = [], filter = null, filterParams = []) {
    if (filter) {
      return (p1, p2) => {
        if (filter(p1, p2, ...filterParams)) {
          force(p1, p2, ...forceParams);
        }
      }
    } else {
      return (p1, p2) => {
        force(p1, p2, ...forceParams);
      }
    }
  }

  this.groupForce = function(force, filter = null) {
    if (filter) {
      return (...points) => {
        if (filter(...points)) {
          force(...points);
        }
      }
    } else {
      return (...points) => {
        force(...points);
      }
    }
  }

  this.createForcePoints = function(force, ...params) {
    return (points) => {
      for (var i = 0; i < points.length; i++) {
        force(points[i], ...params);
      }
    }
  }

  this.createForcePairs = function(force, ...params) {
    return (points) => {
      var idx = 1;
      for (var i = 0; i < points.length; i++) {
        for (var j = idx; j < points.length; j++) {
          force(points[i], points[j], ...params);
        }
        idx++;
      }
    }
  }

  this.forcePoints = function(points, force) {
    for (var i = 0; i < points.length; i++) {
      force(points[i]);
    }
  }

  this.forcePairs = function(points, force) {
    var idx = 1;
    for (var i = 0; i < points.length; i++) {
      for (var j = idx; j < points.length; j++) {
        force(points[i], points[j]);
      }
      idx++;
    }
  }

  this.forceGroups = function(groups, force) {
    for (var i = 0; i < groups.length; i++) {
      force(...groups[i]);
    }
  }

  //function pointPairs(points) {
  //  var idx = 1;
  //  var pairs = []
  //  for (var i = 0; i < points.length; i++) {
  //    for (var j = idx; j < points.length; j++) {
  //      pairs.push(points[i], points[j]);
  //    }
  //    idx++;
  //  }
  //  return pairs;
  //}

}
