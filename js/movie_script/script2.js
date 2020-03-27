function showEarth(){
	world.objects.forEach(o=>{

		if (o.body.obj_type="earth"){
			world.scene.camera.position.set( o.body.position.x+100, o.body.position.y+100, o.body.position.z-1000 );
			world.scene.camera.lookAt( o.body.position );
			world.scene.camera.updateProjectionMatrix();
			animeCamera(o.body)

		}
	})
}

function animeCamera(object){
	var moveStepVec = object.position.clone().sub(world.scene.camera.position).normalize().multiplyScalar(1)
	world.scene.camera.position.set( world.scene.camera.position.x+moveStepVec.x, world.scene.camera.position.y+moveStepVec.y, world.scene.camera.position.z+moveStepVec.z);
	//world.scene.camera.lookAt(targetPos);

	orbitcontrols.target = object.position.clone();
	orbitcontrols.update()
	requestAnimationFrame(function(){
		animeCamera(object)
	});

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
	showEarth()
}
function getSimDataName(){
	return "3_1.json"
}
function updateScript(){
	
}
