function solve(scene, cubes) {
    if (moves.length > 0) {
        var i = setInterval(function () {
            var move = moves[moves.length - 1];
            rotate(scene, cubes, move.axis, move.row, true, !move.invert, true);
            moves.pop();
            if (moves.length === 0) {
                clearInterval(i);
            }
        }, COMPUTED_ANIMATION_DURATION);
    }
}