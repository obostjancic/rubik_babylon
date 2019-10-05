function addMouseListeners(scene, canvas, camera, boundingPlanes, cubes) {
    var startingPoint;
    var currentMesh;

    var getBoundingPlanePosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { for (var p in boundingPlanes) if (boundingPlanes[p] == mesh) return true; return false; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;

        }

        return null;
    }

    var dragInit;
    var dragDiff;
    var pickInfo;

    var onPointerDown = function (e) {

        if (e.button !== 0) {
            return;
        }

        if (parseInt(navigator.appVersion) > 3) {

            var evt = e ? e : window.event;
            dragInit = { x: evt.x, y: evt.y };

            pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { for (var p in boundingPlanes) if (boundingPlanes[p] == mesh) return false; return true; });
            if (pickInfo.hit) {

                startingPoint = getBoundingPlanePosition(evt);
                if (startingPoint) {
                    setTimeout(function () { camera.detachControl(canvas) }, 0);
                }
            }
        }
    };

    var onPointerUp = function (evt) {
        startingPointBackup = startingPoint;
        if (startingPoint && !fired) {
            fired = true;
            camera.attachControl(canvas, true);
            startingPoint = null;

            var current = getBoundingPlanePosition(evt);

            if (!current) {
                return;
            }

            dragDiff = {
                x: evt.x - dragInit.x,
                y: evt.y - dragInit.y
            }

            var facingPlane = getFacingPlane(startingPointBackup);
            var rotationDir = getRotationDir(facingPlane, dragDiff);

            currentMesh = pickInfo.pickedMesh;
            currentMeshPosition = findById(cubes, currentMesh.myid)
            clickedBoxCoords = { x: currentMeshPosition[0], y: currentMeshPosition[1], z: currentMeshPosition[2] }
            rotate(scene, cubes, rotationDir.axis, clickedBoxCoords[rotationDir.axis], false, rotationDir.invert);
            
            return true;
        }
    }
    // ----------------------------------------------------------------------------
    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
    }


}

function getFacingPlane(point) {
    if (Math.abs(Math.abs(point.x) - Math.abs(CAMERA_RADIUS)) < 0.001) {
        return (point.x > 0) ? 'yz' : 'iyz';
    }
    else if (Math.abs(Math.abs(point.y) - Math.abs(CAMERA_RADIUS)) < 0.001) {
        return (point.y > 0) ? 'xz' : 'ixz';
    }
    else if (Math.abs(Math.abs(point.z) - Math.abs(CAMERA_RADIUS)) < 0.001) {
        return ((point.z > 0) ? 'xy' : 'ixy');
    }
}

function getRotationDir(facingPlane, dragDiff) {
    if (facingPlane === 'xy')
        if (Math.abs(dragDiff.x) > Math.abs(dragDiff.y))
            return { axis: 'y', invert: dragDiff.x > 0 }
        else
            return { axis: 'x', invert: dragDiff.y > 0 }
    else if (facingPlane === 'ixy')
        if (Math.abs(dragDiff.x) > Math.abs(dragDiff.y))
            return { axis: 'y', invert: dragDiff.x > 0 }
        else
            return { axis: 'x', invert: dragDiff.y < 0 }
    else if (facingPlane === 'xz')
        if (Math.abs(dragDiff.x) > Math.abs(dragDiff.y))
            return { axis: 'z', invert: dragDiff.x < 0 }
        else
            return { axis: 'x', invert: dragDiff.y > 0 }
    else if (facingPlane === 'ixz')
        if (Math.abs(dragDiff.x) > Math.abs(dragDiff.y))
            return { axis: 'z', invert: dragDiff.x > 0 }
        else
            return { axis: 'x', invert: dragDiff.y > 0 }
    else if (facingPlane === 'yz')
        if (Math.abs(dragDiff.x) > Math.abs(dragDiff.y))
            return { axis: 'y', invert: dragDiff.x > 0 }
        else
            return { axis: 'z', invert: dragDiff.y < 0 }
    else if (facingPlane === 'iyz')
        if (Math.abs(dragDiff.x) > Math.abs(dragDiff.y))
            return { axis: 'y', invert: dragDiff.x > 0 }
        else
            return { axis: 'z', invert: dragDiff.y > 0 }
}
