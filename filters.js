function rangeFilter(p1, p2, range) {
    var distance = p2.position.dist(p1.position);
    return (distance < range);
}


// function frequencyFilter(p1, p2, time, frequency) {

// }