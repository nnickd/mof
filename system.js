function attract(p1, p2, constant = 10, field = 'mass') {
  var pointer = p5.Vector.sub(p2.position, p1.position).normalize();
  let distance = p2.position.dist(p1.position);
  let force = (p1[field] * p2[field] * constant) / (distance * distance);
  pointer.mult(force);

  p2.acceleration.add(p5.Vector.div(pointer, p2.mass));
  p1.acceleration.add(p5.Vector.div(pointer, p1.mass).rotate(PI / 2));
}

function nuclear(p1, p2, range = 10, constant) {
  var distance = p2.position.dist(p1.position);
  if (distance < range) {
    attract(p1, p2, constant);
  }
}


function gravity(p1, p2, constant = -10, range = 10, nuclearConstant = -100) {
  attract(p1, p2, constant);
  nuclear(p1, p2, range, nuclearConstant);
}

function gravAndMag(p1, p2, grav = -10, mag = 10000) {
  attract(p1, p2, grav, 'mass');
  attract(p1, p2, mag, 'charge');
}


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

            //points[eater].mixColor(points[eaten]._color)

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


//var gravitySystem = createForcePairs(attract, -10);

// var nuclearSystem = createForcePairs(pairForce(attract, (p1, p2) => {
//   var distance = p2.position.dist(p1.position);
//   return (distance < (p1.radius + p2.radius))
// }), 1000000);

//var nuclearSystem2 = createForcePairs(pairForce(attract, (p1, p2) => {
// var distance = p2.position.dist(p1.position);
// return (distance < (p1.radius + p2.radius) * 6 && distance > (p1.radius + p2.radius)) 
//}), -1000000);

//var nuke = function (p1, p2) {
//  nuclearSystem(p1, p2);
//  nuclearSystem2(p1, p2);
//}