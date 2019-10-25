
function createBoundingPlanes(scene) {
    var yellow = new BABYLON.StandardMaterial("yellow", scene);
    yellow.alpha = ROTATION_PLANES_ALPHA;
    yellow.diffuseColor = BABYLON.Color3.Yellow();

    var cyan = new BABYLON.StandardMaterial("cyan", scene);
    cyan.alpha = ROTATION_PLANES_ALPHA;
    cyan.diffuseColor = BABYLON.Color3.Teal();

    var magenta = new BABYLON.StandardMaterial("magenta", scene);
    magenta.alpha = ROTATION_PLANES_ALPHA;
    magenta.diffuseColor = BABYLON.Color3.Magenta();

    var planeDimensions = { width: 2 * CAMERA_RADIUS, height: 2 * CAMERA_RADIUS }

    var xy = BABYLON.MeshBuilder.CreatePlane("xy", planeDimensions, scene);
    xy.position.z = CAMERA_RADIUS;
    xy.material = yellow;

    var yz = BABYLON.MeshBuilder.CreatePlane("yz", planeDimensions, scene);
    yz.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);
    yz.position.x = CAMERA_RADIUS;
    yz.material = magenta;

    var xz = BABYLON.MeshBuilder.CreatePlane("xz", planeDimensions, scene);
    xz.rotate(BABYLON.Axis.X, 3 * Math.PI / 2, BABYLON.Space.WORLD);
    xz.position.y = CAMERA_RADIUS;
    xz.material = cyan;

    var ixy = BABYLON.MeshBuilder.CreatePlane("ixy", planeDimensions, scene);
    ixy.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.WORLD);
    ixy.position.z = -CAMERA_RADIUS;
    ixy.material = yellow;

    var iyz = BABYLON.MeshBuilder.CreatePlane("iyz", planeDimensions, scene);
    iyz.rotate(BABYLON.Axis.Y, 3 * Math.PI / 2, BABYLON.Space.WORLD);
    iyz.position.x = -CAMERA_RADIUS;
    iyz.material = magenta;

    var ixz = BABYLON.MeshBuilder.CreatePlane("ixz", planeDimensions, scene);
    ixz.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
    ixz.position.y = -CAMERA_RADIUS;
    ixz.material = cyan;

    return [xy, xz, yz, ixy, ixz, iyz];
}

function createCubes(scene) {
    var cubes = [[[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]],
    [[null, null, null], [null, null, null], [null, null, null]]];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                var mat = new BABYLON.StandardMaterial("mat", scene);
                var texture = new BABYLON.Texture("textures/atlas.jpg", scene);
                mat.diffuseTexture = texture;
                mat.specularTexture = texture;

                var faceUV = new Array(6);
                for (var face = 0; face < 6; face++) {
                    faceUV[face] = new BABYLON.Vector4(face / 7, 0, (face + 1) / 7, 1);
                }
                // inside faces
                if (i != 0)
                    faceUV[3] = new BABYLON.Vector4(0, 0, 0, 0)
                if (i != 2)
                    faceUV[2] = new BABYLON.Vector4(0, 0, 0, 0)
                if (j != 0)
                    faceUV[5] = new BABYLON.Vector4(0, 0, 0, 0)
                if (j != 2)
                    faceUV[4] = new BABYLON.Vector4(0, 0, 0, 0)
                if (k != 0)
                    faceUV[1] = new BABYLON.Vector4(0, 0, 0, 0)
                if (k != 2)
                    faceUV[0] = new BABYLON.Vector4(0, 0, 0, 0)
                //wrap set
                var options = {
                    faceUV: faceUV,
                    wrap: true,
                    size: CUBE_SIZE
                };


                var cube = BABYLON.MeshBuilder.CreateBox('cube', options, scene);
                cube.material = mat;
                cube.position = new BABYLON.Vector3((i - 1) * (CUBE_SIZE + CUBE_SPACING), (j - 1) * (CUBE_SIZE + CUBE_SPACING), (k - 1) * (CUBE_SIZE + CUBE_SPACING))
                cube.myid = i + '' + j + '' + k;
                cubes[i][j][k] = cube;
                cube.rotationValues = { x: 0, y: 0, z: 0 };
            }
        }
    }
    return cubes;
}

function setCamera(canvas, scene) {
    var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2.2, 5, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(-20, 20, -20));
    camera.attachControl(canvas, true);
    //camera.radius = CAMERA_RADIUS - 1;
    camera.lowerRadiusLimit = CAMERA_RADIUS - 1;
    camera.upperRadiusLimit = CAMERA_RADIUS - 1;
    scene.activeCamera = camera;

    return camera;
}

function setLights(scene) {

    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            for (var k = -1; k < 2; k++) {
                var ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(i, j, k), scene);
                ambient.intensity = AMBIENT_INTENSITY;
                var directional = new BABYLON.DirectionalLight("directional", new BABYLON.Vector3(i, j, k), scene);
                directional.intensity = DIRECTIONAL_INTENSITY;
            }
        }
    }

}