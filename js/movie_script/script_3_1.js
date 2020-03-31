
function follow(target){
	world.scene.camera.lookAt(target.position)

	requestAnimationFrame(function(){

		var targetPos = target.position.clone()
		var moveStepVec = targetPos.sub(world.scene.camera.position).normalize().multiplyScalar(1)
		world.scene.camera.position.set( 
			world.scene.camera.position.x+moveStepVec.x,
		 world.scene.camera.position.y+moveStepVec.y,
		  world.scene.camera.position.z+moveStepVec.z);
		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
		if(world.worldTime<6100){
			follow(target)
		}
	});
	
}
function step1(targetPos,speed){
	requestAnimationFrame(function(){
		var moveStepVec = targetPos.clone().sub(world.scene.camera.position).normalize().multiplyScalar(speed)
		world.scene.camera.position.set( 
			world.scene.camera.position.x+moveStepVec.x,
		 world.scene.camera.position.y+moveStepVec.y,
		  world.scene.camera.position.z+moveStepVec.z);

		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
		
		if(world.scene.camera.position.distanceTo(targetPos)>5){
			step1(targetPos,speed)

		}
	});
}
function accelerate(targetPos,speed){
	requestAnimationFrame(function(){
		var moveStepVec = targetPos.clone().sub(world.scene.camera.position).normalize().multiplyScalar(speed)
		world.scene.camera.position.set( 
			world.scene.camera.position.x+moveStepVec.x,
		 world.scene.camera.position.y+moveStepVec.y,
		  world.scene.camera.position.z+moveStepVec.z);

		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
		
		if(world.scene.camera.position.distanceTo(targetPos)>5){

			accelerate(targetPos,speed*1.08)

		}
	});
}

function action(){


}
function updateScript(){
	console.log('world.worldTime:'+world.worldTime)
	if(world.worldTime==240){
		var targetPos = new THREE.Vector3(913.6598379748485,1818.7045781726524,-437.03023352186057)
	 	step1(targetPos,5)

	}else if(world.worldTime==500){
		var targetPos = new THREE.Vector3(228.57436268964264,2050.1207778832477,-275.69926533349803)
		step1(targetPos,5)
	

	}else if(world.worldTime==700){
		var targetPos = new THREE.Vector3(107.430898950805,2990.042126138564,-1770.4250420217977)
		step1(targetPos,5)

	}else if(world.worldTime==1050){
		var targetPos = new THREE.Vector3(82877.62747822126,424573.82591790735,-116899.01786575446)
		accelerate(targetPos,10)
	}
}

function getSimDataName(){
	return "3_1.json"
}
