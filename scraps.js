function setup() {
    createCanvas(1920, 974);

    //space = new Space([], [gravitySystem, nuclearSystem, absorb, cleanup])
    // space = new Space([], [nuclearSystem])
    // space = new Space([], [magnetSystem, absorb, cleanup]);
    space = new Space([], [magnetSystem, connectionSystem]);

    pointStack = [];
    freeze = false;

    // rSlider = createSlider(3, 50, 10);
    // rSlider.position(20, 20);
    // rOld = rSlider.value();

    // mSlider = createSlider(1, 1000, 100);
    // mSlider.position(20, 50);
    // mOld = mSlider.value();
}

function draw() {
    background(127);
    while (pointStack.length > 0) {
        space.points.push(pointStack.pop());
    }

    space.update();
    // space.update(point => {
    //   var rNew = rSlider.value();
    //   var mNew = mSlider.value();
    //   if (rOld !== rNew) {
    //     point.radius = rNew;
    //   }
    //   debugger;
    //   if (mOld !== mNew) {
    //     space.systems[0] = createForcePairs(attract, mNew, 'charge');
    //   }
    // });
}

function mouseClicked() {
    // var rNew = rSlider.value();
    // var mNew = mSlider.value();
    // if (rOld === rNew && mOld === mNew) {
    var point = new Point({
        position: createVector(mouseX - (width / 2), mouseY - (height / 2))
    });
    pointStack.push(point);
    point.show();
    // }
    // rOld = rNew;
    // mOld = mNew;

}


function mouseDragged() {
    mouseClicked();
}

function keyPressed() {
    if (keyCode === DELETE) {
        space.points = [];
    } else if (keyCode === ENTER) {
        freeze = !freeze;
        if (freeze) {
            noLoop();
        } else {
            loop();
        }
    }
}
