function PointForce() {
    // Pair Points
    this.attract = function (p1, p2, constant = 10, field = 'mass') {
        var pointer = p5.Vector.sub(p2.position, p1.position).normalize();
        let distance = p2.position.dist(p1.position);
        let force = (p1[field] * p2[field] * constant) / (distance * distance);
        pointer.mult(force);


        p2.acceleration.add(p5.Vector.div(pointer, p2.mass));
        p1.acceleration.add(p5.Vector.div(pointer, p1.mass).rotate(PI / 2));
    }

    this.follow = function (p1, p2, constant = 10, field = 'mass') {
        var pointer = p5.Vector.sub(p2.position, p1.position).add(p1.velocity).normalize();
        let distance = p2.position.dist(p1.position);
        let force = (p1[field] * p2[field] * constant) / (distance * distance);
        pointer.mult(force);
        p2.acceleration.add(p5.Vector.div(pointer, p2.mass));
    }

    this.retract = function (p1, p2, constant = 10, field = 'mass') {
        var pointer = p5.Vector.sub(p2.position, p1.position).normalize();
        let distance = p2.position.dist(p1.position);
        let force = (distance * distance) / (p1[field] * p2[field] * constant);
        pointer.mult(force);

        p2.acceleration.add(p5.Vector.div(pointer, p2.mass));
        p1.acceleration.add(p5.Vector.div(pointer, p1.mass).rotate(PI / 2));
    }

    this.nuclear = (p1, p2, range = 10, constant) => {
        var distance = p2.position.dist(p1.position);
        if (distance < range) {
            this.attract(p1, p2, constant);
        }
    }

    this.gravity = (p1, p2, constant = -10, range = 10, nuclearConstant = -100) => {
        this.attract(p1, p2, constant);
        this.nuclear(p1, p2, range, nuclearConstant);
    }

    this.gravAndMag = (p1, p2, grav = -10, mag = 10000) => {
        this.attract(p1, p2, grav, 'mass');
        this.attract(p1, p2, mag, 'charge');
    }

    this.midAttractRepel = (p1, p2, connectRange, constant, field) => {
        if (!rangeFilter(p1, p2, connectRange)) {
            this.attract(p1, p2, -constant, field)
        } else {
            this.attract(p1, p2, constant, field)
        }
    }

    // Single Point

    this.pulseForce = (point, gt = 20, lt = 10, tick = 1) => {
        point.radius += point.flip ? tick : -tick;
        if (point.radius > gt) {
            point.flip = false;
        }
        if (point.radius < lt) {
            point.flip = true;
        }
    }


}

