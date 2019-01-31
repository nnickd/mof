function PointBounds() {
    this.walls = function (point) {
        if (point.position.x < -(width / 2)) {
            point.position.x = -(width / 2);
            point.velocity.x *= -1;
        }

        else if (point.position.x > (width / 2)) {
            point.position.x = (width / 2);
            point.velocity.x *= -1;
        }
        if (point.position.y < -(height / 2)) {
            point.position.y = -(height / 2);
            point.velocity.y *= -1;
        }

        else if (point.position.y > (height / 2)) {
            point.position.y = (height / 2);
            point.velocity.y *= -1;
        }
    }

    this.toroidal = function (point) {
        if (point.position.x < -(width / 2)) {
            point.position.x = (width / 2);
        }
        else if (point.position.x > (width / 2)) {
            point.position.x = -(width / 2);
        }

        if (point.position.y < -(height / 2)) {
            point.position.y = (height / 2);
        }
        else if (point.position.y > (height / 2)) {
            point.position.y = -(height / 2);
        }
    }

}
