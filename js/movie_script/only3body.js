
function watch3Body(){
	requestAnimationFrame(function(){
		world.scene.camera.position.set( world.scene.camera.position.x+1, world.scene.camera.position.y+1, world.scene.camera.position.z+1);

		orbitcontrols.update()
		
		watch3Body()
	});
}
function action(){

	world.scene.camera.position.set( world.scene.camera.position.x,world.scene.camera.position.y+20, world.scene.camera.position.z );
	world.scene.camera.lookAt( world.scene);
	world.scene.camera.updateProjectionMatrix();
	orbitcontrols.update()
	// watch3Body()


}
function getSimDataName(){
	return "only_3body.json"
}

function step(targetPos){
	requestAnimationFrame(function(){
		var moveStepVec = targetPos.clone().sub(world.scene.camera.position).normalize().multiplyScalar(10)
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
	if(world.worldTime==360){
		//var targetPos = new THREE.Vector3(1464.3065963525944,2243.2793344709926,-107.32350829269947)
		var targetPos = new THREE.Vector3(723.1410311725988,4281.689360546741,-1836.6580579372755)

	 	step(targetPos)

	}
	if(world.worldTime>=680 && world.worldTime<1480){
		world.scene.camera.position.set( 
			world.scene.camera.position.x,
		 world.scene.camera.position.y-10,
		  world.scene.camera.position.z+10);

		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
	}else if(world.worldTime>=1480){
		world.scene.camera.position.set( 
			world.scene.camera.position.x+10,
		 world.scene.camera.position.y,
		  world.scene.camera.position.z-10);

		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
	}
}
