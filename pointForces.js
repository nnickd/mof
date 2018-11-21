function pulseForce (point, gt = 20, lt = 10, tick = 1) {
    point.radius += point.flip ? tick : -tick;
    if (point.radius > gt) {
        point.flip = false;
    }
    if (point.radius < lt) {
        point.flip = true;
    }
}