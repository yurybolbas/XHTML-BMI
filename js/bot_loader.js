var botTypeParam="BotType";
var getParams=location.search.substring(1)+"&";
var posBotParam=getParams.indexOf(botTypeParam+"=");
var botParamValue="";
	if(posBotParam!= -1){
		var posBotDataParam=posBotParam+botTypeParam.length+1;
		botParamValue=getParams.substring(posBotDataParam,getParams.indexOf("&",posBotDataParam)); 
		//alert("Get:"+botParamValue);		
	}
	else{
		botParamValue=getCookie(botTypeParam);
		//alert("Cookie:"+botParamValue);	
	}
	
	botParamValue=1; //(botParamValue=="3")?"3":"1";	
	setCookie(botTypeParam,botParamValue); 

	document.write('<sc'+'ript type="text/JavaScript" src="js/bot_data_temp.js"></sc'+'ript>');
	
if(botParamValue=="3"){
	document.write('<sc'+'ript type="text/JavaScript" src="js/bot_packages.js"></sc'+'ript>');
}
else{
	document.write('<sc'+'ript type="text/JavaScript" src="js/bot_main.js"></sc'+'ript>');
}

	document.write('<sc'+'ript type="text/JavaScript" src="../js/bot_script1_1.js"></sc'+'ript>');

try{registerJS("js/bot_loader.js");}
catch(e){}