//move camera to show earth
function step2(obj){
	requestAnimationFrame(function(){
		var moveStepVec = obj.body.position.clone().sub(world.scene.camera.position).normalize().multiplyScalar(1)

		world.scene.camera.position.set( world.scene.camera.position.x-moveStepVec.x, world.scene.camera.position.y-moveStepVec.y, world.scene.camera.position.z-moveStepVec.z);

		orbitcontrols.update()

		var dis = world.scene.camera.position.distanceTo(obj.body.position)
		if(dis<300){
			step2(obj)

		}else{
			
		    var config = {
					"type":"sun",
					"raduis":4,
					"mass":1,
					"pos":{
						"x":-100,
						"y":0,
						"z":0
					},
					"initVelocity":{
						"x":0,
						"y":0,
						"z":0
					}
				}
			var earth = createEarth(config,world.scene)
			earth.body.setLinearVelocity(new THREE.Vector3(0,0,0))	
			earth.body.setAngularVelocity(new THREE.Vector3(0,0,0))	
			setTimeout(function(){
				rotationObjs(obj,earth)
				setTimeout(function(){
					world.noGravity=false
				},3000)
		    },8000);
			

		}
	})
}



function moveToObj(obj){
	obj.body.setAngularVelocity(new THREE.Vector3(0,0,0))	

	requestAnimationFrame(function(){
		var moveStepVec = obj.body.position.clone().sub(world.scene.camera.position).normalize().multiplyScalar(10)

		world.scene.camera.position.set( world.scene.camera.position.x+moveStepVec.x, world.scene.camera.position.y+moveStepVec.y, world.scene.camera.position.z+moveStepVec.z);

		orbitcontrols.update()
		var dis = world.scene.camera.position.distanceTo(obj.body.position)
		if(dis>200){
			action(obj)

		}else{
			console.log("camera pos:"+world.scene.camera.position.x+","+world.scene.camera.position.y+","+world.scene.camera.position.z)
			setTimeout(function(){
				step2(obj)
		    },3000);
		}
		
	});
}

function rotationObjs(sun,earth){
	earth.body.setAngularVelocity(new THREE.Vector3(0,10,0))	
	sun.body.setAngularVelocity(new THREE.Vector3(1,1,0))	

}
function action(){
	world.noGravity = true
	world.noBlast = true
	world.G = 667.259 

	moveToObj(world.objects[0])
}
function getSimDataName(){
	return "create_process.json"
}
function step(targetPos,speed){

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
	if(world.worldTime==600){
		var targetPos = new THREE.Vector3(-160.72099380041456,15.446825647237672,-14.22057412562574)
	 	//orbitcontrols.target = world.objects[1].body.position
	 	step(world.objects[1].body.position.clone().add(new THREE.Vector3(50,0,50)),1)

	}
	if(world.worldTime==1000){
	 	//orbitcontrols.target = world.objects[0].body.position
	 	

		var targetPos = new THREE.Vector3(-92.06335676214047,273.99516986558245,-83.17108186521611)
	 	step(targetPos,1)

	}
	
}
