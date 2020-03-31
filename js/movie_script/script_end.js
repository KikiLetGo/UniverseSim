
function action(){

}
function getSimDataName(){
	return "1_2.json"
}

function step(targetPos){
	requestAnimationFrame(function(){
		var moveStepVec = targetPos.clone().sub(world.scene.camera.position).normalize().multiplyScalar(5)
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
function follow(target){
	world.scene.camera.lookAt(target.position)

	requestAnimationFrame(function(){

		var targetPos = target.position.clone()
		var moveStepVec = targetPos.sub(world.scene.camera.position).normalize().multiplyScalar(2)
		world.scene.camera.position.set( 
			world.scene.camera.position.x+moveStepVec.x,
		 world.scene.camera.position.y+moveStepVec.y,
		  world.scene.camera.position.z+moveStepVec.z);
		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
		follow(target)
	});
	
}
function updateScript(){
	if(world.worldTime==260){
		//var targetPos = new THREE.Vector3(1464.3065963525944,2243.2793344709926,-107.32350829269947)
		var targetPos = new THREE.Vector3(-787.7956871247471,-203.94457133043068,-1053.2618038722103)

	 	step(targetPos)

	}
	if(world.worldTime==560){
		world.objects.forEach(o=>{

			if (o.config.type=="earth"){
				follow(o.body)
			}
		})
	}
	
}