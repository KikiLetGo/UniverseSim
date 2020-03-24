
function moveToObj(obj){
	requestAnimationFrame(function(){
		var moveStepVec = obj.body.position.clone().sub(world.scene.camera.position).normalize().multiplyScalar(10)

		world.scene.camera.position.set( world.scene.camera.position.x+moveStepVec.x, world.scene.camera.position.y+moveStepVec.y, world.scene.camera.position.z+moveStepVec.z);

		orbitcontrols.update()
		var dis = world.scene.camera.position.distanceTo(obj.body.position)
		if(dis>200){
			action(obj)

		}
		
	});
}
function action(){

	moveToObj(world.objects[0])
}
function getSimDataName(){
	return "test.json"
}
