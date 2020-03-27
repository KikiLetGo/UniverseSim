function World(){
	this.objects=[]
	this.scene = new MainScene()
	this.worldTime = 0
	this.runing = true
	this.noGravity = false
	this.noBlast = false
	this.G = 66725.9
}
World.prototype.addObject = function(object) {
	this.objects.push(object)
};
World.prototype.removeObject = function(object) {
	this.objects.remove(object)
};


World.prototype.start = function(callback,simData=undefined){
	this.createBodies(simData['bodies'])
	callback(world.scene)
	
}

World.prototype.createBodies = function(bodiesData){
	for(var i=0;i<bodiesData.length;i++){
		bodyData = bodiesData[i]
		if(bodyData['type']=="sun"){
			var sun = createSun(bodyData,this.scene)
			sun.body.setLinearVelocity(new THREE.Vector3(bodyData['initVelocity']['x'],bodyData['initVelocity']['y'],bodyData['initVelocity']['z']))
		}else if(bodyData['type']=="earth"){
			var earth = createEarth(bodyData,this.scene)
			earth.body.setLinearVelocity(new THREE.Vector3(bodyData['initVelocity']['x'],bodyData['initVelocity']['y'],bodyData['initVelocity']['z']))	
		}else{
			var earth = createEarth(bodyData,this.scene)
			earth.body.setLinearVelocity(new THREE.Vector3(bodyData['initVelocity']['x'],bodyData['initVelocity']['y'],bodyData['initVelocity']['z']))	
		}

	}
}