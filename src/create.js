function createPoint(space, pointOptions = null, innerSpace = null) {
    let parentPoint = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2)),
        parentSpace: space
    });

    if (pointOptions) {
        parentPoint.merge(pointOptions);
    }

    if (innerSpace) {
        parentPoint.space = innerSpace;
    }

    space.addPoint(parentPoint);
    parentPoint.show();

    return parentPoint;
}