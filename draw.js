function drawPointLine(p1, p2) {
    push()
    translate(width / 2, height / 2);
    stroke(180);
    line(p1.position.x, p1.position.y, p2.position.x, p2.position.y)
    pop()

    attract(p1, p2, -100000000)
}