var fired = false;
var moves = [];

var AMBIENT_INTENSITY = 0.8;
var DIRECTIONAL_INTENSITY = 0.8;

var CUBE_SIZE = 4;
var CUBE_SPACING = 0.1;

var CAMERA_RADIUS = 40;
var CAMERA_RADIUS_LIMIT_LOWER = CAMERA_RADIUS;
var CAMERA_RADIUS_LIMIT_UPPER = CAMERA_RADIUS;

var COMPUTED_ANIMATION_DURATION = 200;
var PLAYER_ANIMATION_DURATION = 1000;

var ROTATION_PLANES_ALPHA = 0.0;

setInterval(function () { fired = false }, PLAYER_ANIMATION_DURATION + 100);

window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');

    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.White();
        new BABYLON.Layer('', 'textures/background.jpg', scene, true);
        var camera = setCamera(canvas, scene);
        setLights(scene);

        var cubes = createCubes(scene);

        var boundingPlanes = createBoundingPlanes(scene)
        addMouseListeners(scene, canvas, camera, boundingPlanes, cubes);        
        addButtons(scene, cubes);
        return scene;
    }

    var scene = createScene();
    //showAxis(scene, 15);
    engine.runRenderLoop(function () {

        scene.render();
    });

});

