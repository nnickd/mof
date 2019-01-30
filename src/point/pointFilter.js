function PointFilter() {
    this.rangeFilter = function (p1, p2, range, within = true) {
        var distance = p2.position.dist(p1.position);
        return (within && distance < range) || (!within && distance > range);
    }

    this.collideFilter = function (p1, p2) {
        if (p1.life || p2.life) return false;

        var distance = p2.position.dist(p1.position);
        return distance < (p1.radius + p2.radius) / 2;
    }

}
