function rangeFilter(p1, p2, range, within = true) {
    var distance = p2.position.dist(p1.position);
    return (within && distance < range) || (!within && distance > range);
}


// function frequencyFilter(p1, p2, time, frequency) {

// }