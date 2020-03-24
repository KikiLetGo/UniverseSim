function DataLoader(){

}

DataLoader.prototype.loadSimData = function(name,callback){
	loadXMLDoc("/sim_data/"+name,function(data){
		callback(eval('(' + data + ')'))
	})
}