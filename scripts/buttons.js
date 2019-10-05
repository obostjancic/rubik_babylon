function addButtons(scene, cubes) {
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var UiPanel = new BABYLON.GUI.StackPanel();
    UiPanel.width = "220px";
    UiPanel.fontSize = "14px";
    UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(UiPanel);
    var solveButton = BABYLON.GUI.Button.CreateSimpleButton("but1", "Solve");
    solveButton.paddingTop = "10px";
    solveButton.width = "100px";
    solveButton.height = "50px";
    solveButton.color = "white";
    solveButton.background = "green";
    solveButton.onPointerDownObservable.add(()=> {
        solve(scene, cubes)
    });

    var shuffleButton = BABYLON.GUI.Button.CreateSimpleButton("but1", "Shuffle");
    shuffleButton.paddingTop = "10px";
    shuffleButton.width = "100px";
    shuffleButton.height = "50px";
    shuffleButton.color = "black";
    shuffleButton.background = "orange";
    shuffleButton.onPointerDownObservable.add(()=> {
        shuffle(scene, cubes)
    });
    UiPanel.addControl(shuffleButton);
    UiPanel.addControl(solveButton);
}