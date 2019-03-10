function createPoint(space, pointOptions = null, innerSpace = null) {
    let point = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2), random(0, 1)),
        outerSpace: space
    });

    if (pointOptions) {
        point.merge(pointOptions);
    }

    if (innerSpace) {
        point.innerSpace = innerSpace;
    }

    space.addPoint(point);
    point.show();

    return point;
}