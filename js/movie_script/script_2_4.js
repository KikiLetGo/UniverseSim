
function action(){
	world.scene.camera.position.set( world.scene.camera.position.x+500, world.scene.camera.position.y-1000, world.scene.camera.position.z);
	//world.scene.camera.lookAt(targetPos);
	world.scene.camera.updateProjectionMatrix();

	orbitcontrols.update()
}
function getSimDataName(){
	return "2_4.json"
}

function step(targetPos){
	requestAnimationFrame(function(){
		var moveStepVec = targetPos.clone().sub(world.scene.camera.position).normalize().multiplyScalar(2.5)
		world.scene.camera.position.set( 
			world.scene.camera.position.x+moveStepVec.x,
		 world.scene.camera.position.y+moveStepVec.y,
		  world.scene.camera.position.z+moveStepVec.z);

		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
		
		if(world.scene.camera.position.distanceTo(targetPos)>5){
			step(targetPos)

		}
	});
}
function updateScript(){
	if(world.worldTime==100){
		//var targetPos = new THREE.Vector3(1464.3065963525944,2243.2793344709926,-107.32350829269947)
		var targetPos = new THREE.Vector3(2972.1255626883867,5133.321607045656,-1808.2169243074209)

	 	step(targetPos)

	}
	
}