Array.prototype.indexOf = function(val) { 
	for (var i = 0; i < this.length; i++) { 
	if (this[i] == val) return i; 
	} 
	return -1; 
};
Array.prototype.remove = function(val) { 
	var index = this.indexOf(val); 
	if (index > -1) { 
	this.splice(index, 1); 
	} 
};

function loadXMLDoc(url,callback)
{
	xmlhttp=null;
	if (window.XMLHttpRequest){// code for Firefox, Opera, IE7, etc.
		xmlhttp=new XMLHttpRequest();
	}else if (window.ActiveXObject){// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp!=null){
	  xmlhttp.onreadystatechange=function(){
	  	if (xmlhttp.readyState==4){// 4 = "loaded"
			if (xmlhttp.status==200){// 200 = "OK"
				callback(xmlhttp.responseText)
			}
			else{
				alert("数据异常:" + xmlhttp.statusText);
			}
		}
	  };
	  xmlhttp.open("GET",url,true);
	  xmlhttp.send(null);
	}
	else{
	  alert("Your browser does not support XMLHTTP.");
	}
}

function getTimeWithNum(num){
	var h = parseInt(num/(60*60))
	var m = parseInt((num-h*60*60)/(60))
	var s = num-h*60*60-m*60
	if(h<10){
		h="0"+h
	}
	if(m<10){
		m="0"+m
	}
	if(s<10){
		s="0"+s
	}
	var time = h+":"+m+":"+s
	return time
}
