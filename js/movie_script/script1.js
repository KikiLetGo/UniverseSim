var throungGalaxySpeed=100
function throungGalaxy(earth){
	
	var moveStepVec = earth.body.position.clone().sub(world.scene.camera.position).normalize().multiplyScalar(1)
	world.scene.camera.position.set( world.scene.camera.position.x+moveStepVec.x*throungGalaxySpeed, world.scene.camera.position.y+moveStepVec.y*throungGalaxySpeed, world.scene.camera.position.z+moveStepVec.z*throungGalaxySpeed);
	orbitcontrols.target = earth.body.position.clone();
	orbitcontrols.update()
	if(world.scene.camera.position.distanceTo(earth.body.position)<=1000){
		return
	}
	if(world.scene.camera.position.distanceTo(earth.body.position)<=10000&&throungGalaxySpeed>2){
			throungGalaxySpeed = throungGalaxySpeed-1

	}else if(throungGalaxySpeed<400){
		throungGalaxySpeed++

	}
	requestAnimationFrame(function(){
		
		throungGalaxy(earth)
	});
}
function showEarth(earth){
	var moveStepVec = earth.body.position.clone().sub(world.scene.camera.position).normalize().multiplyScalar(1)



	//rotation
	if(world.scene.camera.position.distanceTo(earth.body.position)<=300){
		// moveStepVec.x=moveStepVec.x+0.9
		// moveStepVec.y=moveStepVec.y+0.8
		// moveStepVec.z=moveStepVec.z-0.9


	}else{
		world.scene.camera.position.set( world.scene.camera.position.x+moveStepVec.x, world.scene.camera.position.y+moveStepVec.y, world.scene.camera.position.z+moveStepVec.z);

		orbitcontrols.target = earth.body.position.clone();
		orbitcontrols.update()
		requestAnimationFrame(function(){
			showEarth(earth)
		});
	
	}
	
}



function landInEath(){
	world.objects.forEach(o=>{

		if (o.body.obj_type="earth"){
			world.scene.camera.position.set( o.body.position.x, o.body.position.y+10, o.body.position.z );
			//orbitcontrols.target = o.body.position.clone();
			orbitcontrols.update()
			requestAnimationFrame(function(){
				landInEath()
			});

		}
	})
}
function action(){

	world.objects.forEach(o=>{

		if (o.body.obj_type="earth"){
			world.scene.camera.position.set( o.body.position.x+100, o.body.position.y+100, o.body.position.z-130000 );
			world.scene.camera.lookAt( o.body.position );
			world.scene.camera.updateProjectionMatrix();
			
			o.tailSize = 0.1
			o.tailCounts = 50

			throungGalaxy(o)
			showEarth(o)

		}
	})
}
function getSimDataName(){
	return "lonely_earth.json"
}

function step(targetPos){
	requestAnimationFrame(function(){
		var moveStepVec = targetPos.clone().sub(world.scene.camera.position).normalize().multiplyScalar(1)
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
	if(world.worldTime==540){
		var targetPos = new THREE.Vector3(180.73370024003341,217.02473038884608,-534.4098546564292)
	 	step(targetPos)

	}
	// if(world.worldTime==940){
	// 	var targetPos = new THREE.Vector3(11.70510438918805,98.93415191997623,-142.6314570930058)
	//  	step(targetPos)

	// }
}
