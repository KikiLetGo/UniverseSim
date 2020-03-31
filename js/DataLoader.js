function DataLoader(){

}

DataLoader.prototype.loadSimData = function(name,callback){
	var savedData = $.cookie('sim_data')
	if(savedData != undefined){
		callback(eval('(' + savedData + ')'))
	}else{
		loadXMLDoc("/sim_data/"+name,function(data){
			callback(eval('(' + data + ')'))
		})
	}
	
}