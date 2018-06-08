//var nuclearSystem = createForcePairs(nuclear, 30, -20);
// var gravitySystem = createForcePairs(gravity, -10, 100, -100000000000)
// var gravityMagnetSystem = createForcePairs(gravAndMag, -10, 100000000000);

//var gravitySystem = createForcePairs(attract, -10);

// var nuclearSystem = createForcePairs(pairForce(attract, (p1, p2) => {
//   var distance = p2.position.dist(p1.position);
//   return (distance < (p1.radius + p2.radius))
// }), 1000000);
var magnetSystem = createForcePairs(attract, 100, 'charge');


var connectionSystem = createForcePairs(pairForce(drawPointLine, rangeFilter, 100));

//var drawSystem = createForcePoints(point => point.show())


function absorb(points) {
  for (let i in points) {
    if (!points[i].dead) {

      for (let j in points) {
        //if (i != j && !points[j].dead && points[i].color.toString() == points[j].color.toString()) {
        if (i != j && !points[j].dead) {
          if ((points[i].radius + points[j].radius) / 2 > p5.Vector.sub(points[i].position, points[j].position).mag()) {
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

            points[eater].radius = sqrt((eatenArea + eaterArea) / PI)

            points[eater].mixColor(points[eaten].colour)

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





