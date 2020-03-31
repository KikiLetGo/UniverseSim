function MainScene(){
	this.renderer = new THREE.WebGLRenderer({ antialias:true});
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMapSoft = true;
	this.renderer.shadowMapType=THREE.PCFSoftShadowMap;
	document.getElementById( 'viewport' ).appendChild( this.renderer.domElement );
	
	this.render_stats = new Stats();
	this.render_stats.domElement.style.position = 'absolute';
	this.render_stats.domElement.style.top = '1px';
	this.render_stats.domElement.style.zIndex = 100;
	document.getElementById( 'viewport' ).appendChild( this.render_stats.domElement );

	this.physics_stats = new Stats();
	this.physics_stats.domElement.style.position = 'absolute';
	this.physics_stats.domElement.style.top = '50px';
	this.physics_stats.domElement.style.zIndex = 100;
	document.getElementById( 'viewport' ).appendChild( this.physics_stats.domElement );
	// Loader
	this.loader = new THREE.TextureLoader();

	this.scene = new Physijs.Scene;
	this.scene.setGravity(new THREE.Vector3( 0, 0, 0 ));
	var mainScene=this
	this.scene.addEventListener(
		'update',
		function() {
			mainScene.onUpdate()
			
		}
	);	
	this.createCamera()
	this.createLights()
	this.createBackground()
	this.scene.simulate();
	this.render(this.render,this.renderer,this.render_stats,this.scene,this.camera)

}
MainScene.prototype.createCamera = function(){
	this.camera = new THREE.PerspectiveCamera(
		35,
		window.innerWidth / window.innerHeight,
		1,
		100000
	);
	this.camera.position.set( 100, 2100, -200 );
	this.camera.lookAt( this.scene.position );
	this.scene.add( this.camera );
}

MainScene.prototype.createLights = function(){
	this.light = new THREE.AmbientLight( 0xFFFFFF );
	this.scene.add( this.light );
}

MainScene.prototype.createBackground = function(){

	//创建一个圆形的材质，记得一定要加上texture.needsUpdate = true;
    let canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    let context = canvas.getContext("2d");
    context.fillStyle = "#aaaaaa";

    //canvas 创建圆
    // http://www.w3school.com.cn/tags/canvas_arc.asp
    context.arc(50,50,45,0,2*Math.PI);
    context.fill();

    // 创建材质
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
	var starsGeometry = new THREE.Geometry();

	for ( var i = 0; i < 500000; i ++ ) {

	    var star = new THREE.Vector3();
	    star.x = getNumberInNormalDistribution( -3100,1000);
	    star.y = getNumberInNormalDistribution( 0,5000);
	    star.z = getNumberInNormalDistribution( 0,10000);

	    starsGeometry.vertices.push( star );

	}

	var starsMaterial = new THREE.PointsMaterial( { color: 0xaaaaaa,size:20,map:texture } );

	var starField = new THREE.Points( starsGeometry, starsMaterial );

	this.scene.add( starField );

}




MainScene.prototype.render = function(fun,renderer,render_stats,scene,camera) {
	renderer.render( scene, camera );
	render_stats.update();
	requestAnimationFrame( function(){
		fun(fun,renderer,render_stats,scene,camera)
	} );

};

MainScene.prototype.addObject = function(object){
	this.scene.add(object.body)
	world.addObject(object)
}
MainScene.prototype.addElement = function(element){
	this.scene.add(element)
}
MainScene.prototype.remove = function(element){
	this.scene.remove(element)
}
MainScene.prototype.removeObject = function(object){
	this.scene.remove(object.body)
	world.removeObject(object)

}


MainScene.prototype.onWindowResize = function(){
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();

	this.renderer.setSize( window.innerWidth, window.innerHeight );
}

MainScene.prototype.onUpdate = function(){
	//this.render()
	if(!world.runing){
		return
	}
	for (var i=0;i<world.objects.length;i++){
		if(world.objects[i].update != undefined){
			world.objects[i].update()
		}
	}
	world.worldTime++
	$('#timezone').text(getTimeWithNum(world.worldTime))
	updateScript()
	
	console.log(this.camera.position)

	this.scene.simulate( undefined, 1 );
}
