
function watch3Body(){
	requestAnimationFrame(function(){
		world.scene.camera.position.set( world.scene.camera.position.x+1, world.scene.camera.position.y+1, world.scene.camera.position.z+1);

		orbitcontrols.update()
		
		watch3Body()
	});
}
function action(){

	world.scene.camera.position.set( 10,0, -3000 );
	world.scene.camera.lookAt( world.scene);
	world.scene.camera.updateProjectionMatrix();
	orbitcontrols.update()
	watch3Body()


}
function getSimDataName(){
	return "only_3body.json"
}
