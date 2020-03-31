
function action(){

}
function getSimDataName(){
	return "1_1.json"
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
function updateScript(){
	if(world.worldTime==260){
		//var targetPos = new THREE.Vector3(1464.3065963525944,2243.2793344709926,-107.32350829269947)
		var targetPos = new THREE.Vector3(965.4100392940618,-592.7998881459257,1782.2939568557176)

	 	step(targetPos)

	}
	if(world.worldTime==760){
		//var targetPos = new THREE.Vector3(1464.3065963525944,2243.2793344709926,-107.32350829269947)
		var targetPos = new THREE.Vector3(1841.817558196047,-341.8140600506345,-968.1587573046293)

	 	step(targetPos)

	}
}