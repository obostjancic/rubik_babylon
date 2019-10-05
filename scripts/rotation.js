function rotate(scene, cubes, axis, row, isComputed = false, invert = false, isSolver = false) {
    if (!isSolver)
        moves.push({ axis, row, invert });

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                if (axis === 'x' && i == row)
                    rotateCube(scene, cubes[i][j][k], 'x', isComputed, invert)
                else if (axis === 'y' && j == row)
                    rotateCube(scene, cubes[i][j][k], 'y', isComputed, invert)
                else if (axis === 'z' && k == row)
                    rotateCube(scene, cubes[i][j][k], 'z', isComputed, invert)
            }
        }
    }
    var newCubes = [[[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]]];

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                if (axis === 'x' && i == row) {
                    if (!invert)
                        newCubes[i][RCTM.x[j][k][1]][RCTM.x[j][k][2]] = cubes[i][j][k];
                    else
                        newCubes[i][RCTMi.x[j][k][1]][RCTMi.x[j][k][2]] = cubes[i][j][k];
                }
                else if (axis === 'y' && j == row) {
                    if (!invert)
                        newCubes[RCTM.y[i][k][0]][j][RCTM.y[i][k][2]] = cubes[i][j][k];
                    else
                        newCubes[RCTMi.y[i][k][0]][j][RCTMi.y[i][k][2]] = cubes[i][j][k];
                }
                else if (axis === 'z' && k == row) {
                    if (!invert)
                        newCubes[RCTM.z[i][j][0]][RCTM.z[i][j][1]][k] = cubes[i][j][k];
                    else
                        newCubes[RCTMi.z[i][j][0]][RCTMi.z[i][j][1]][k] = cubes[i][j][k];
                }
                else
                    newCubes[i][j][k] = cubes[i][j][k];
            }
        }
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                cubes[i][j][k] = newCubes[i][j][k];
            }
        }
    }
    return cubes;
}

function rotateCube(scene, cube, axis, isComputed, invert) {
    cube.bakeCurrentTransformIntoVertices();
    var pivotTranslate = cube.position.subtract(new BABYLON.Vector3(0, 0, 0));
    cube.setPivotMatrix(BABYLON.Matrix.Translation(pivotTranslate.x, pivotTranslate.y, pivotTranslate.z));

    var rotation = new BABYLON.Animation("rotation" + axis, "rotation." + axis, 60, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    var rotValue = cube.rotationValues[axis];
    rotation.setKeys([{
        frame: 0,
        value: rotValue
    },
    {
        frame: (isComputed) ? 5 : 30,
        value: (!invert) ? rotValue + Math.PI / 2 : rotValue - Math.PI / 2
    },
    ]);
    if (Math.abs(cube.rotationValues[axis]) > 2 * Math.PI)
        cube.rotationValues[axis] = 0;

    cube.animations = new Array();
    cube.animations.push(rotation);
    scene.beginAnimation(cube, 0, (isComputed) ? 5 : 30, false);

    return cube;
}

function findById(cubes, id) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                if (cubes[i][j][k].myid === id)
                    return [i, j, k];
            }
        }
    }
    return cubes;
}