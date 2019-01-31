const _PointForce_ = new PointForce();
const _Force_ = new Force();
const _PointFilter_ = new PointFilter();
const _DrawSpace_ = new DrawSpace();
const _PointBounds_ = new PointBounds();

// Draw
var drawPointLine = _DrawSpace_.drawPointLine;

// Filters
var rangeFilter = _PointFilter_.rangeFilter;



// Inner Forces
var innerOuterDrawForce = _Force_.pairForce(drawPointLine, [], rangeFilter, [0, false]);
var innerSpaceForce = _Force_.pointForce(point => {
    _PointForce_.attract(point.parent, point, -1000, 'mass');

    innerOuterDrawForce(point.parent, point);
}, [], point => point.parent)

var explodeForce = _Force_.pairForce(_PointForce_.explodeForce, [3], _PointFilter_.collideFilter)
var splitForce = _Force_.pairForce(_PointForce_.splitForce, [], _PointFilter_.collideFilter)


function PointSystem() {
    this.pulseSystem = _Force_.createForcePoints(_PointForce_.pulseForce, 20, 10, 1);

    // Outer Forces
    var outerDrawRange = 100;
    var outerDrawForce = _Force_.pairForce(drawPointLine, [], rangeFilter, [outerDrawRange]);

    var outerRepelConstant = -10000000000000;
    var outerRepelField = 'mass';
    var outerRepelRange = 150;
    var outerRepelWithinRange = true;
    var outerRepelForce = _Force_.pairForce(_PointForce_.attract, [outerRepelConstant, outerRepelField], rangeFilter, [outerRepelRange, outerRepelWithinRange]);

    var outerAttractConstant = -100;
    var outerAttractField = 'mass';
    var outerAttractRange = 110;
    var outerAttractWithinRange = false;
    var outerAttractForce = _Force_.pairForce(_PointForce_.attract, [outerAttractConstant, outerAttractField], rangeFilter, [outerAttractRange, outerAttractWithinRange]);
    this.outerPairSystem = _Force_.createForcePairs((p1, p2) => {
        // _PointForce_.attract(p1, p2, -10000000, 'charge');
        _PointForce_.attract(p1, p2, -10, 'mass');
        // outerAttractForce(p1, p2);
        // outerRepelForce(p1, p2);
        // outerDrawForce(p1, p2);
    })

    // Inner Forces
    var innerDrawRange = 50;
    var innerDrawForce = _Force_.pairForce(drawPointLine, [], rangeFilter, [innerDrawRange]);

    var innerRepelConstant = 10;
    var innerRepelField = 'mass';
    var innerRepelRange = 40;
    var innerRepelWithinRange = true;
    var innerRepelForce = _Force_.pairForce(_PointForce_.attract, [innerRepelConstant, innerRepelField], rangeFilter, [innerRepelRange, innerRepelWithinRange]);

    var innerAttractConstant = -10;
    var innerAttractField = 'mass';
    var innerAttractRange = 60;
    var innerAttractWithinRange = false;
    var innerAttractForce = _Force_.pairForce(_PointForce_.attract, [innerAttractConstant, innerAttractField], rangeFilter, [innerAttractRange, innerAttractWithinRange]);
    this.innerPairSystem = _Force_.createForcePairs((p1, p2) => {
        // _PointForce_.midAttractRepel(p1, p2, 50, 100, 'charge')
        // _PointForce_.attract(p1, p2, -10000000, 'charge');
        innerAttractForce(p1, p2);
        innerRepelForce(p1, p2);
        // innerDrawForce(p1, p2);
    })

    this.innerPointSystem = _Force_.createForcePoints(innerSpaceForce)



    this.explodeSystem = _Force_.createForcePairs(explodeForce)
    this.splitSystem = _Force_.createForcePairs(splitForce)


    this.absorb = function (points) {
        for (let i in points) {
            if (!points[i].deads) {

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
                            if (points[eater].radius < 20) {


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


                            // points[eater].velocity.add(points[eaten].velocity)

                            // points[eater].applyForce(p5.Vector.mult(points[eaten].velocity, points[eaten].mass))
                        }

                    }
                }
            }
        }
    }

    this.cleanup = function (points) {
        for (let i = points.length - 1; i >= 0; i--) {
            if (points[i].dead) {
                points.splice(i, 1)
            }
        }
    }
}