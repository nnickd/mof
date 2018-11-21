function createPoint(space, pointOptions = null, innerSpace = null) {
    let parentPoint = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2))
    });

    if (pointOptions) {
        parentPoint.merge(pointOptions);
    }

    if (innerSpace) {
        parentPoint.space = innerSpace;
        if (innerSpace.maxPoints) {
            parentPoint.addChildren(innerSpace.maxPoints, innerSpace.pointOptions)
        }
    }

    space.points.push(parentPoint);
    parentPoint.show();

    return parentPoint;
}