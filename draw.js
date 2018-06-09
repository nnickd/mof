function drawPointLine(p1, p2) {
    push()
    translate(width / 2, height / 2);
    var colour = lerpColor(p1.colour, p2.colour, 0.5);
    colour.setAlpha(100);
    stroke(colour);
    
    line(p1.position.x, p1.position.y, p2.position.x, p2.position.y)
    pop()

}