function createPoint(space, pointOptions = null, innerSpace = null) {
    let point = new Point({
        position: createVector(mouseX - _camera.x, mouseY - _camera.y, random(100, 1000)),
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