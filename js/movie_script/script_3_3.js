
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
function step1(targetPos){
	requestAnimationFrame(function(){
		var moveStepVec = targetPos.clone().sub(world.scene.camera.position).normalize().multiplyScalar(10)
		world.scene.camera.position.set( 
			world.scene.camera.position.x+moveStepVec.x,
		 world.scene.camera.position.y+moveStepVec.y,
		  world.scene.camera.position.z+moveStepVec.z);

		world.scene.camera.updateProjectionMatrix();

		orbitcontrols.update()
		
		if(world.scene.camera.position.distanceTo(targetPos)>5){
			step1(targetPos)

		}
	});
}

function action(){
	
	// setTimeout(function(){
	// 	var targetPos = new THREE.Vector3(913.6598379748485,1818.7045781726524,-437.03023352186057)
	// 	step1(targetPos)
	// },5000)
	
	// setTimeout(function(){
	// 	var targetPos = new THREE.Vector3(606.0406645535844,2256.663353335173,-1033.853424209065)
	// 	step1(targetPos)
	// },20000)

	// setTimeout(function(){
	// 	var targetPos = new THREE.Vector3(934.9993086208167,2986.4907800643996,231.10915601556167)
	// 	step1(targetPos)
	// },30000)

	// setTimeout(function(){
	// 	var targetPos = new THREE.Vector3(2630.5602224784275,3875.706786830621,-295.45919912442736)
	// 	step1(targetPos)
	// },90000)

	// setTimeout(function(){
	// 	var targetPos = new THREE.Vector3(-0.005499264677013073,7604.017078699088,0.005252076167826527)
	// 	step1(targetPos)
	// },110000)

	// setTimeout(function(){
	// 	world.objects.forEach(o=>{

	// 		if (o.body.obj_type="earth"){
	// 			follow(o.body)

	// 		}
	// 	})
	// },140000)	

}
function updateScript(){
	console.log('world.worldTime:'+world.worldTime)
	if(world.worldTime==40){
		var targetPos = new THREE.Vector3(913.6598379748485,1818.7045781726524,-437.03023352186057)
	 	step1(targetPos)

	}else if(world.worldTime==960){
		var targetPos = new THREE.Vector3(606.0406645535844,2256.663353335173,-1033.853424209065)
		step1(targetPos)
	

	}else if(world.worldTime==1500){
		var targetPos = new THREE.Vector3(934.9993086208167,2986.4907800643996,231.10915601556167)
		step1(targetPos)
	

	}else if(world.worldTime==2940){
		var targetPos = new THREE.Vector3(2630.5602224784275,3875.706786830621,-295.45919912442736)
		step1(targetPos)

	}else if(world.worldTime==3200){
		var targetPos = new THREE.Vector3(-0.005499264677013073,6604.017078699088,0.005252076167826527)
		step1(targetPos)
	}else if(world.worldTime==5800){
		world.objects.forEach(o=>{

			if (o.body.obj_type="earth"){
				follow(o.body)

			}
		})

	}
	else if(world.worldTime==6120){
		var targetPos = new THREE.Vector3(100000,0,0)

		step1()

	}
}

function getSimDataName(){
	return "3_3.json"
}
