//var nuclearSystem = createForcePairs(nuclear, 30, -20);
// var gravitySystem = createForcePairs(gravity, -10, 100, -100000000000)
// var gravityMagnetSystem = createForcePairs(gravAndMag, -10, 100000000000);

// var gravitySystem = createForcePairs(attract, -100000000);

// var nuclearSystem = createForcePairs(pairForce(attract, (p1, p2) => {
//   var distance = p2.position.dist(p1.position);
//   return (distance < (p1.radius + p2.radius))
// }), 100000000000000);


// var gravitySystem = createForcePairs(attract, -10);
// // var innerGravitySystem = createForcePairs(attract, 10000);
// var innerGravitySystem = createForcePairs(gravity, -100, 100, 10000)

// var magnetSystem = createForcePairs(attract, 100, 'charge');


// var connectionSystem = createForcePairs(pairForce(drawPointLine, rangeFilter, 150));

//var drawSystem = createForcePoints(point => point.show())


function absorb(points) {
  for (let i in points) {
    if (!points[i].dead) {

      for (let j in points) {
        //if (i != j && !points[j].dead && points[i].color.toString() == points[j].color.toString()) {
        if (i != j && !points[j].dead) {
          // if (points[i].position.x == points[j].position.x && points[i].position.y == points[j].position.y) {
          if ((points[i].radius + points[j].radius) / 2 > p5.Vector.dist(points[i].position, points[j].position)) {
            let eaten = i;
            let eater = j;
            if (points[i].radius > points[j].radius) {
              eaten = j;
              eater = i;
            } else if (points[i].radius < points[j].radius) {
              eaten = i;
              eater = j;
            } else if (points[i].velocity.mag() > points[j].velocity.mag()) {
              eaten = i;
              eater = j;
            } else if (points[j].velocity.mag() > points[i].velocity.mag()) {
              eaten = j;
              eater = i;
            } else if (random([0, 1]) === 1) {
              eaten = j;
              eater = i;
            }
            //debugger
            points[eaten].dead = true;
            points[eater].mass += points[eaten].mass;
            let eatenArea = PI * points[eaten].radius * points[eaten].radius;
            let eaterArea = PI * points[eater].radius * points[eater].radius;
            points[eater].radius = sqrt((eatenArea + eaterArea) / PI);
            points[eater].mixColor(points[eaten].colour);

            if (points[eaten].space) {
              if (!points[eater].space) {
                points[eater].space = new Space([], [innerGravitySystem, connectionSystem, absorb, cleanup])
              }

              for (var p = 0; p < points[eaten].space.points.length; p++) {
                var child = points[eaten].space.points.pop();
                child.colour = points[eater].colour; 
                points[eater].space.points.push(child);
              }
            }
            // let childArea = -PI * points[eaten].radius * points[eaten].radius;
            // eaterArea = -childArea;
            
            // let recurse = (parent) => {
            //   if (parent.space && parent.space.points.length > 0) {
            //     debugger;
            //     for (var p = 0; p < parent.space.points.length; p++) {
            //       childArea += recurse(parent.space.points[p]);
            //     }
            //   } else {
                
            //     childArea += PI * parent.radius * parent.radius;
            //   }
            // }
            // eatenArea = recurse(points[eater]);
            // points[eater].radius = sqrt((eatenArea + eaterArea) / PI);
            // points[eater].mixColor(points[eaten].colour);


            //points[eater].velocity.add(points[eaten].velocity)

            //points[eater].applyForce(p5.Vector.mult(points[eaten].velocity, points[eaten].mass))
          }

        }
      }
    }
  }
}

function cleanup(points) {
  for (let i = points.length - 1; i >= 0; i--) {
    //debugger;
    if (points[i].dead) {
      points.splice(i, 1)
    }
  }
}





