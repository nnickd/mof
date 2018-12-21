function DrawSpace() {
    this.drawPointLine = function(p1, p2) {
        push()
        translate(width / 2, height / 2);
        var colour = lerpColor(p1.colour, p2.colour, 0.5);
        colour.setAlpha(100);
        stroke(colour);
        // strokeWeight(p1.radius < p2.radius ? p1.radius : p2.radius);
        strokeWeight((p1.radius + p2.radius) / 2);
        // line(p1.position.x, p1.position.y, p2.position.x, p2.position.y)
        line(p1.position.x + p1.velocity.x, p1.position.y + p1.velocity.y, p2.position.x + p2.velocity.x, p2.position.y + p2.velocity.y)
        pop()
    }

    this.drawEllipse = function (point) {
        push();
        translate(width / 2, height / 2);
        noStroke()
        colorMode(HSB, 360, 100, 100);
        fill(point.colour);
        ellipse(point.position.x, point.position.y, point.radius);
        // rotate(this.spin * PI)
        pop();
    }

    this.drawRect = function (point) {
        push();
        translate(width / 2, height / 2);
        noStroke()
        colorMode(HSB, 360, 100, 100);
        fill(point.colour);
        rect(point.position.x, point.position.y, point.radius, point.radius);
        // rotate(this.spin * PI)
        pop();
    }
}