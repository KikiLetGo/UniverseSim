function suitableSpeed(subject,object){
	var directionVec3 = object.body.position.clone().sub(subject.body.position).normalize()
	var moveDirectionVec3 = new THREE.Vector3(directionVec3.x*10,directionVec3.y,directionVec3.z)
	return moveDirectionVec3;
}