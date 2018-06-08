function pointForce(force, filter = null) {
  if (filter) {
    return (point) => {
      if (filter(point)) {
        force(point);
      }
    }
  } else {
    return (point) => {
      force(point);
    }
  }
}

function pairForce(force, filter = null) {
  if (filter) {
    return (p1, p2) => {
      if (filter(p1, p2)) {
        force(p1, p2);
      }
    }
  } else {
    return (p1, p2) => {
      force(p1, p2);
    }
  }
}

function groupForce(force, filter = null) {
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

function forcePoints(points, force) {
  for (var i = 0; i < points.length; i++) {
    force(points[i]);
  }
}

function createForcePoints(force, ...params) {
  return (points) => {
    for (var i = 0; i < points.length; i++) {
      force(points[i]);
    }
  }
}

function forcePairs(points, force) {
  var idx = 1;
  for (var i = 0; i < points.length; i++) {
    for (var j = idx; j < points.length; j++) {
      force(points[i], points[j]);
    }
    idx++;
  }
}

function createForcePairs(force, ...params) {
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

function forceGroups(groups, force) {
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
