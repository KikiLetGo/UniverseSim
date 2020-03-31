var MAX_TAIL_PIONTS = 1000
function Body(config,scene){
	this.scene = scene
	this.config = config
	// Loader
	this.loader = new THREE.TextureLoader();
	this.material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({map: this.loader.load( config.texture ) }),
		0.1, // low friction
		0.9 // high restitution
	);
	this.material.map.wrapS = THREE.RepeatWrapping;
	this.material.map.repeat.set( 1.0, 1.0 );
	this.geometry = new THREE.SphereGeometry( config.raduis ,50,50 );
    this.body = new Physijs.SphereMesh(
		this.geometry,
		this.material,
		mass=config.mass
	);
	this.body.obj_type = config.type

	this.body.position.set(
		config.pos.x,
		config.pos.y,
		config.pos.z
	);
	this.body.raduis = config.raduis;
	var that  = this
	this.body.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
		if(world.noBlast){
			return
		}

		if(that.config.type=='earth'){

			that.blast()
			that.clean()

			that.scene.removeObject(that)
		}
		if(that.config.type=='sun' && other_object.obj_type=='sun'){

			that.blast()
			that.clean()
			that.scene.removeObject(that)

		}
	});
	this.body.name=name
	this.tails=[]
	this.tailSize = 1
	this.tailCounts=100

	


}
Body.prototype.gravityForce = function(objects,debug=false){
		var force = new THREE.Vector3(0,0,0)
		for (var j=0;j < objects.length;j++){
			object = objects[j]
			if (object == this){continue}
			var distance = this.body.position.distanceTo(object.body.position);
			//万有引力公式
			var oneForce = object.body.position.clone().sub(this.body.position).normalize()
						.multiplyScalar( world.G)
						.multiplyScalar( object.body.mass )
						.multiplyScalar( this.body.mass )
						.divideScalar(Math.pow(distance,2));
			force.add(oneForce)	
			
			if(debug){
				alert("oneForce:"+logVector3(oneForce))
				alert("force:"+logVector3(force))
			}


		}
		if(debug){
			alert("all force:"+logVector3(force))
		}
		this.body.applyForce( force, new THREE.Vector3(0,0,0));

}
Body.prototype.showTail = function(){
	var tailsLength = this.tails.length;
	if(tailsLength>MAX_TAIL_PIONTS){
		for (var i=0;i<tailsLength-MAX_TAIL_PIONTS;i++){
			var tail = this.tails[i]
			this.scene.remove(tail)
			this.tails.remove(tail)
		}
	}
	var starsGeometry = new THREE.Geometry();


	var bodySize = this.config.raduis
	for(var i=0;i<this.tailCounts;i++){
		var star = this.body.position.clone()
				   .add(new THREE.Vector3(Math.random(),
				   	Math.random(),
				   	Math.random()).multiplyScalar(bodySize-bodySize/2).multiplyScalar(0.5))

   		starsGeometry.vertices.push( star );
	}
	


	var starsMaterial = new THREE.PointsMaterial( { color: this.config.tailColor,size:this.tailSize } );

	var starField = new THREE.Points( starsGeometry, starsMaterial );

	this.scene.addElement(starField);
	
	this.tails.push(starField)
}


Body.prototype.blast = function(pos){ 
	var particles = []
	var blastGeometry = new THREE.Geometry();
	for ( var i = 0; i < 8000; i ++ ) {

	    var star = new THREE.Vector3();
	    star.x = getNumberInNormalDistribution( this.body.position.x,20);
	    star.y = getNumberInNormalDistribution( this.body.position.y,20);
	    star.z = getNumberInNormalDistribution( this.body.position.z,20);

	    blastGeometry.vertices.push( star );

	}
	var blastMaterial = new THREE.PointsMaterial( { color: 0xff8800,size:5 } );
	var blastField = new THREE.Points( blastGeometry, blastMaterial );
	this.scene.addElement( blastField );

	//light
	var pointLight = new THREE.PointLight(0xffffee, 200, 1000);
	pointLight.castShadow = true;
	bulbMat = new THREE.MeshLambertMaterial( {
					emissive: 0xff0000,
					emissiveIntensity: 0.9,
					transParent:true,
					opacity:0.9,
					color: 0xffffee
				});

	var lightGeometry = new THREE.SphereGeometry( 3.2 ,30,30 );

	pointLight.add( new THREE.Mesh( lightGeometry, bulbMat ) );
	pointLight.position.set(this.body.position.x,this.body.position.y,this.body.position.z)
	this.scene.addElement(pointLight);

    var that = this
    setTimeout(function(){
    	that.scene.remove(blastField)
    	that.scene.remove(pointLight)

    },3000);
}
Body.prototype.clean = function(){
	for(var i=0;i<this.tails.length;i++){
		this.scene.remove(this.tails[i])
		//this.tails.remove(this.tails[i])
		console.log('remove tail:'+i)
	}
	this.tails=[]
			
}

Body.prototype.update = function(){
	if(!world.noGravity){
		this.gravityForce(world.objects)

	}
	this.showTail()
}




