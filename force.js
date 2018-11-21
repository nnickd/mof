function pointForce(force, filter = null, filterParams = [], forceParams = []) {
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

function pairForce(force, filter = null, filterParams = [], forceParams = []) {
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

function createForcePoints(force, ...params) {
  return (points) => {
    for (var i = 0; i < points.length; i++) {
      force(points[i], ...params);
    }
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

function forcePoints(points, force) {
  for (var i = 0; i < points.length; i++) {
    force(points[i]);
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

