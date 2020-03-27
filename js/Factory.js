function createSun(bodyConfig,scene){
	bodyConfig.texture = './images/sunTexture.jpeg'
	bodyConfig.tailColor = 0xffff00
	var sun = new Body(bodyConfig,scene)
	scene.addObject(sun)
	//init rotation
	sun.body.applyImpulse(new THREE.Vector3(bodyConfig.mass*10,0,0),
			new THREE.Vector3(1,1,1).multiplyScalar(bodyConfig.raduis))

	return sun
}

function createEarth(bodyConfig,scene){
	if(bodyConfig.texture==undefined){
		bodyConfig.texture = './images/earthTexture.jpeg'
	}
	bodyConfig.tailColor = 0x00ffff

	var earth = new Body(bodyConfig,scene)
	scene.addObject(earth)
	earth.body.applyImpulse(new THREE.Vector3(bodyConfig.mass*10,0,0),
			new THREE.Vector3(1,1,1).multiplyScalar(bodyConfig.raduis))

	return earth
}