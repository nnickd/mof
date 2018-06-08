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