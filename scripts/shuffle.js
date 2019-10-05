function shuffle(scene, cubes) {
    var counter = 0;
    var i = setInterval(function () {
        var move = randomMove();
        rotate(scene, cubes, move.axis, move.row, true, move.invert);
        counter++;
        if (counter === 20) {
            clearInterval(i);
        }
    }, COMPUTED_ANIMATION_DURATION);
}

function randomMove() {
    var axis = Math.floor(Math.random() * 3);
    var row = Math.floor(Math.random() * 3);
    var invert = !!Math.floor(Math.random() * 2);

    if (axis === 0)
        axis = 'x';
    else if (axis === 1)
        axis = 'y';
    else if (axis === 2)
        axis = 'z';

    return { axis, row, invert }
}