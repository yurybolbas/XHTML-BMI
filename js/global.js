//////////////////////////////////////////////////////////////////////////////
//
//   Global Load Handler
//
//////////////////////////////////////////////////////////////////////////////

var onloadGlobalHandler = {
	extraDataLoaded: true,
	actions: {},
	
	addAction: function(name, handler) {
		this.actions[name] = handler;
	}
	,
	
	execute: function(){
		if(!this.extraDataLoaded){
			setTimeout(function(){onloadGlobalHandler.execute()},100);
			return;
		}
		for( var i in this.actions ){
			this.actions[i]();
		}
	}
}


/* set handler on document ready event */
window.onload = function(){onloadGlobalHandler.execute()};

//////////////////////////////////////////////////////////////////////////////
//
// 
//
//////////////////////////////////////////////////////////////////////////////
 
function openWindow (windowName, sourceFile, width, height, attr)
{
	var left = Math.round ((screen.width - width) / 2);
	var top =  Math.round ((screen.height - height) / 2) - 35;

	var newAttr = '';
	if (attr.indexOf('status') < 0)     newAttr += 'status=yes,';
	if (attr.indexOf('menubar') < 0)    newAttr += 'menubar=no,';
	if (attr.indexOf('toolbar') < 0)    newAttr += 'toolbar=no,';
	if (attr.indexOf('resizable') < 0)  newAttr += 'resizable=yes,';
	if (attr.indexOf('scrollbars') < 0) newAttr += 'scrollbars=yes,';
	if (attr.indexOf('location') < 0)   newAttr += 'location=no,';
	newAttr += 'width='  + width;
	newAttr += ',height=' + height;
	newAttr += ',left='   + left;
	newAttr += ',top='    + top;

	var objectWindow = window.open (sourceFile, windowName, newAttr + ((attr != '')?','+attr:''));
	if(objectWindow){
		objectWindow.focus();
	}	

	return objectWindow;
}


//////////////////////////////////////////////////////////////////////////////
//
//  function hoverImg change image within link with fileName
//
//////////////////////////////////////////////////////////////////////////////

function changeImg(oLink,fileName){
	var regExpFileName = /[^\/]+$/ig;
	var oImg = oLink.getElementsByTagName("IMG")[0]; 
	oImg.src = oImg.src.replace(regExpFileName,fileName);
	oImg.width = oImg.width; // hack for opera - bad image rendering after rollover	
}


//////////////////////////////////////////////////////////////////////////////
//
// 
//
//////////////////////////////////////////////////////////////////////////////
 
function printPage ()
{
	if (window.print)
	{
		try{window.print();}
		catch(e){}
	}
}


//////////////////////////////////////////////////////////////////////////////
//
// Calendar
//
//////////////////////////////////////////////////////////////////////////////

function getDaysInMonth(month, year)
{
	var today = new Date();
	month = (month)? month : today.getMonth();	
	year = (year)? year : today.getFullYear();
	var d = new Date(year, month, 0);
	return d.getDate();
}


//////////////////////////////////////////////////////////////////////////////
//
// Find Object
//
//////////////////////////////////////////////////////////////////////////////

var dom = (document.getElementById)?true:false;

function findObj(n, d) 
{
	var x;

	if (!d)
		d = document;

	if (dom)
		x = d.getElementById(n); 

	return x;
}


//////////////////////////////////////////////////////////////////////////////
//
// Dynamic
//
//////////////////////////////////////////////////////////////////////////////

function setSelectedOption(element, value)
{
	for (var i = 0; i < element.length; i++)
	{
		if (element.options[i].value == value)
		{
			element.options[i].selected = true;
		}
	}
}

function getElementValue(element)
{
	var objectElement;

	
	if (typeof(element) == 'string' || element== null)
	{ 
		if (( objectElement = findObj(element) ) == null)
		{
			return false;
		}
	}
	else
	{
		objectElement = element;
	}

	if (objectElement.tagName == 'SELECT')
	{
		if(objectElement.options.length>0 && objectElement.selectedIndex>=0){
			return objectElement.options[objectElement.selectedIndex].value;
		}
	}


	if (objectElement.tagName == 'INPUT' || objectElement.tagName == 'HIDDEN')
	{
		
		if( objectElement.type == 'checkbox' ) {
			return objectElement.checked;
		}
		
		return objectElement.value;
	}
		
	if (objectElement.length && (objectElement[0].type == "radio"))
	{
		for(var i = 0; i < objectElement.length; i++)
		{
			if(objectElement[i].checked)
			{
				return objectElement[i].value;
			}	
		} 			
	}
	
	return false;
}

function setElementValue(element, value)
{
	var objectElement;

	if (typeof(element) != 'object' || element== null)
	{ 
		if (( objectElement = findObj(element) ) == null)
		{
			return false;
		}
	}
	else
	{
		objectElement = element;
	}

	if (objectElement.tagName == 'SELECT')
	{
		setSelectedOption(objectElement, value);

		return true;
	}

	if (objectElement.tagName == 'INPUT' || objectElement.tagName == 'HIDDEN')
	{

		if( objectElement.type == 'checkbox' ) {
			objectElement.checked = value ? true : false;
			return true;
		}
	
		objectElement.value = value;

		return true;
	}

	if (objectElement.length && (objectElement[0].type == "radio"))
	{
		for(var i = 0; i < objectElement.length; i++)
		{			
			if(objectElement[i].value == value)
			{
				objectElement[i].checked = true;
				return true;
			}	
		} 			
	}	
	
	return false;
}

//////////////////////////////////////////////////////////////////////////////
//
// Cookie
//
//////////////////////////////////////////////////////////////////////////////

function getCookie(name) {
	var a,start,end;
	a=' '+document.cookie+';';
	start=a.indexOf(' '+name+'=');
	if (start==-1) return null;
	start+=name.length+2;
	end=a.indexOf(';',start);
	return unescape(a.substring(start,end));
}

function getCookieItem(name,cookie) {
	var a,start,end;
	a=cookie+'~';
	start=a.indexOf(name+'=');
	if (start==-1) return null;
	start+=name.length+1;
	end=a.indexOf('~',start);
	return a.substring(start,end);
}

function setCookie(name,value,expires,path,domain,secure) {
//	alert(name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : ""))
    document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

function deleteCookie(name,path,domain) {
  if (getCookie(name)) {
  	setCookie(name,0,new Date("Thu, 01-Jan-70 00:00:01 GMT"),path,domain,null)
  }
}	



function fillDateFields(edit,m,d,y,type,deltaDays,extParam){
	var extParam=(extParam)?extParam:0;
	var arrDate=[];
		arrDate=parseDate(getElementValue(edit),type);	
	if((!extParam && arrDate)  || (extParam && arrDate &&arrDate[2]==(new Date().getFullYear()) ) ){
		setElementValue(m,arrDate[0]);		
		setElementValue(d,arrDate[1]);		
		setElementValue(y,arrDate[2]);
		return true;	
	}
	else{
		if(fillDateFields.arguments.length<6){
			setElementValue(m,'');		
			setElementValue(d,'');		
			setElementValue(y,'');
		}
		else{
			var tDate = new Date(new Date().getTime()+deltaDays*60*60*24*1000);
			setElementValue(m,tDate.getMonth());		
			setElementValue(d,tDate.getDate());		
			setElementValue(y,tDate.getFullYear());
		}	
		return false;					
	}
}

function fillDateEdit(edit,m,d,y,type){
	var strDate='';
	if(type==0){
		strDate = ''+(parseInt(getElementValue(m),10)+1)+'/'+getElementValue(d)+'/'+getElementValue(y);
	}
	else{
		strDate = ''+getElementValue(d)+'/'+(parseInt(getElementValue(m),10)+1)+'/'+getElementValue(y);
	}
	setElementValue(edit,strDate);		
}


function trim(s) {
    var retVal = s;
    if (s && s!="" && s != null){
        retVal = s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
    }
	return retVal;
}

function changeLanguge(lang){
     var form = document.forms["ChangeLanguageForm"];
     form.elements["language"].value = lang;
     form.submit();
     return false;
 }

function getHrefParameter(name, defaultValue,location_) {
	var key = name + "=";
	if (!location_) 
		location_=location;

	var index1 = location_.href.indexOf(key);
	if (index1 == -1) {
		return defaultValue;
	}

	var index2 = location_.href.indexOf("&", index1 + key.length);
	if (index2 == -1) {
		index2 = location_.href.length;
	}
	return unescape(location_.href.substring(index1 + key.length, index2));

}


function getDealID(location_)
{
	if (deal_id != -1)
	{
		return deal_id;
	}
	else
	{
		return getHrefParameter('deal_id','-1',location_);
	}
}

//////////////////////////////////////////////////////////////////////////////
//
//  number - number for formatting
//  minFract - minimal digit's number of fraction (from 0 to maxFract)
//  maxFract - maximal digit's number of fraction (from 0 to ...)
//  decimal - (optional) output separator between integral part and fraction;
//  thousand - (optional) output separator between thousands;
//
//////////////////////////////////////////////////////////////////////////////

function formatFloat(number,minFract,maxFract,decimal,thousand){
	decimal = (decimal)? decimal: ".";
	thousand = (thousand)? thousand: " ";	
	var rightZero = "";
	var powered = Math.pow(10,maxFract);
	var integer = "";
	
	number = Math.round(number*powered)/powered;

	var arrNum = (""+number).split('.');
	
	if(arrNum.length<2){
		arrNum[1]="";
	}
	
	for(var i=arrNum[1].length; i<minFract; i++){
		rightZero += "0";
	}
	
	if(!(arrNum[1] || minFract)){
		decimal="";
	}
	
	for(var i=arrNum[0].length; i>0;){
		i-=3;
		if(i<=0){
			integer=arrNum[0].substr(0,i+3)+integer;
		}
		else{
			integer=thousand+arrNum[0].substr(i,3)+integer;		
		}
	}
	
	return (integer+decimal+arrNum[1]+rightZero);
}


//////////////////////////////////////////////////////////////////////////////
//
// Travelers
//
//////////////////////////////////////////////////////////////////////////////

function showSearchRooms(containerId, numberOfRoom,refreshContainerId){
	var oAllRoomsContainer = document.getElementById(containerId);
	var tRoomsList = [];
	var tNode = oAllRoomsContainer.firstChild;
		
	do{
		if(tNode.nodeName == "DIV"){
			tRoomsList[tRoomsList.length] = tNode;
		}
	} while(tNode = tNode.nextSibling);
	
	if(numberOfRoom > tRoomsList.length-1){
		for(var i=tRoomsList.length-1; i<numberOfRoom; i++){
		var newRoom = tRoomsList[0].cloneNode(true);
			newRoom.id = newRoom.id.replace(/\$M\$/g,(i+1));	
			newRoom.innerHTML = newRoom.innerHTML.replace(/\$M\$/g,(i+1)).replace(/fakename/g,'name');
			oAllRoomsContainer.appendChild(newRoom);
			newRoom.style.display = 'block';			
		}
	
	}
	else {
		for(var i=tRoomsList.length-1; i>numberOfRoom; i--){
			oAllRoomsContainer.removeChild(tRoomsList[i]);
		}	
	
	}
	
	var oRefreshContainer = document.getElementById(refreshContainerId);	
	
	/* fix for FF beg */
	var ofixDivForFF = document.getElementById("idRoomsFixDivForFF");
	ofixDivForFF.style.display = (ofixDivForFF.style.display == "none")? "block" : "none";	
	/* fix for FF end */
		
}


function showAgesForTraveller(trvl){
	if(typeof(trvl)=='string'){
		trvl = document.getElementById(trvl);		
	}
	
	var trvlValue = trim(trvl.value);
	
	if(!trvlValue){
		trvlValue = 0;	
	}
	if(/^\d$/.test(trvlValue)){
		var oTemp = trvl 
		do{
			oTemp = oTemp.parentNode;
		} while(oTemp.nodeName != "TR");
		
		var agesTD = oTemp.getElementsByTagName("TD")[1];
		var agesInputs = agesTD.getElementsByTagName("INPUT");
		
		if(agesInputs.length-1 < trvlValue){
			var ageTemplate = agesInputs[0].parentNode.parentNode;
			for(var i=agesInputs.length-1; i<trvlValue; i++){
				var tObj = ageTemplate.cloneNode(true);
					tObj.innerHTML = tObj.innerHTML.replace(/\$N\$/g,(i+1)).replace(/fakename/g,'name');
					agesTD.appendChild(tObj);
					tObj.style.display = 'block';
			}
		}
		else {
			for(var i=agesInputs.length-1; i>trvlValue; i--){
				var tObj = agesInputs[agesInputs.length-1].parentNode.parentNode; 			
				agesTD.removeChild(tObj);
			}	
		}
		
		return true;
	}
	
	
}


//////////////////////////////////////////////////////////////////////////////
//
//  strDate MUST BE according to  dateFormatSettings.dateEntryFormat
// 
//  return {day:day,month:month,year:year} or NULL if Error
//
//////////////////////////////////////////////////////////////////////////////

function parseDate(strDate, extraDate){
	var tDate = dateFormatSettings.parseDate(strDate, extraDate);

	if(tDate){
		return {day:tDate.getDate(),month:tDate.getMonth(),year:tDate.getFullYear()};
	}
	else{
		return null;
	}
}


//////////////////////////////////////////////////////////////////////////////
//
//	{day:day,month:month,year:year}
//
//  return strDate
//
//////////////////////////////////////////////////////////////////////////////

function formatDate(date){
	var tDate = new Date(date.year,date.month,date.day);
	if(tDate != 'NaN'){
		return dateFormatSettings.formatDate(tDate);
	}
	else{
		return "";
	}
}


//////////////////////////////////////////////////////////////////////////////
//
//  dateFormatSettings.parseDate(strDate)
//  return Date or false if Error
//  
//  dateFormatSettings.formatDate(date)
//  return DateString according to dateFormatSettings.dateEntryFormat;
// 
//  dateFormatSettings.dateEntryFormat support next format:
//	[m]m*[d]d#yyyy, mm*dd#yyyy, mmm*dd#yyyy and all combination of examples;
//  legend: m - month, d - day, y - year , * - first separator, # - second separator	  
//  
//////////////////////////////////////////////////////////////////////////////

dateFormatSettings = new function (){
	try{
		this.dateEntryFormat = Constants.dateEntryPattern.toLowerCase();
	}
	catch(e){
		this.dateEntryFormat = "mm/dd/yyyy";	
	}
	
	this.strConstants = {
		months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	}	
	
	/*
	var tElms = this.dateEntryFormat.match(/([\[\]mdy]+)|([^\[\]mdy]+)/gi); 
	
	this.sep1 = tElms[1];
	this.sep2 = tElms[3];
	this.part1 = tElms[0];
	this.part2 = tElms[2];
	this.part3 = tElms[4];
	*/
	
	this.getDatePatternStructure = function(strPattern){
		var tElms = strPattern.match(/([\[\]mdy]+)|([^\[\]mdy]+)/gi); 	
		var patternObj = {};
			patternObj.sep1 = tElms[1];
			patternObj.sep2 = tElms[3];
			patternObj.part1 = tElms[0];
			patternObj.part2 = tElms[2];
			patternObj.part3 = tElms[4];		
		
		return patternObj;
	}

	/* private property */
	this.dateEntryFormatStructure = this.getDatePatternStructure(this.dateEntryFormat);
	
	/* private property */
	this.dateSystemFormatStructure = this.getDatePatternStructure("mm/dd/yyyy");	
	
	/* public method */	
	this.parseDate = function(strDate, extraDate){
		return this.coreParseDate(strDate, extraDate, this.dateEntryFormatStructure)
	}	
	
	/* public method */	
	this.parseSystemDate = function(strDate, extraDate){
		return this.coreParseDate(strDate, extraDate, this.dateSystemFormatStructure)
	}			
	
	/* private method */
	this.coreParseDate = function(strDate, extraDate, patternStructure){
		if(!(extraDate instanceof Date)){
			extraDate = new Date(); /* parameter year is used in entry "ddmmm"  */
		}
		
		var tDate = [];
		var posSep1 = 0;
		var posSep2 = 0;	
		
		var d = 0;
		var m = 0;
		var y = 0;		
		
		posSep1 = strDate.indexOf(patternStructure.sep1);
		
		if(posSep1 == -1){
			strDate = strDate.replace(/ /ig,"");
			/* parsing according to [D]DMMM or [D]DMMMYY or [D]DMMMYYYY */			
			tDate = strDate.match(new RegExp("^([0-9]{1,2})("+this.strConstants.months.join("|")+")([0-9]{4}|[0-9]{2})*$", "i"));
			if(!tDate){
				return false;
			}
			d = tDate[1];
			m = tDate[2];
			if(!tDate[3]){
				m = this.strConstants.months.join(",").toUpperCase().indexOf(m.toUpperCase())/4 + 1;
				y = (m < (extraDate.getMonth()+1))? extraDate.getFullYear()+1 : extraDate.getFullYear();
			}
			else{
				y = tDate[3];
			}			
		}
		else{
			 /* parsing according to pattern this.dateEntryFormat */
			posSep2 = strDate.indexOf(patternStructure.sep2, posSep1 + patternStructure.sep1.length);		

			if(posSep2 == -1){
				return false;
			}
					
			tDate[0] = strDate.substring(0, posSep1);
			
			if(!this.checkWithPattern(tDate[0], patternStructure.part1)){
				return false;
			}
	
			tDate[1] = strDate.substring(posSep1 + patternStructure.sep1.length, posSep2);
			
			if(!this.checkWithPattern(tDate[1], patternStructure.part2)){
				return false;
			}
	
			tDate[2] = strDate.substring(posSep2 + patternStructure.sep2.length);
			
			if(!this.checkWithPattern(tDate[2], patternStructure.part3)){
				return false;
			}
		
			eval(patternStructure.part1.substr(1,1) + "=tDate[0]");
			eval(patternStructure.part2.substr(1,1) + "=tDate[1]");
			eval(patternStructure.part3.substr(1,1) + "=tDate[2]");
		}

		
		y = parseInt(y, 10);	
		if(y<100){			
			y += 2000; /*  max/min year is 2000/2099 in format YY,  */
		}
		
		if(isNaN(m)){ /* for MMM - months format  */
			m = this.strConstants.months.join(",").toUpperCase().indexOf(m.toUpperCase())/4 + 1;
		}
		m = parseInt(m, 10);
		if(m<1 || m>12){
			return false;
		}
		else{
			m--;
		}
		
		d = parseInt(d, 10);		
		
		if(d<1 || d>getDaysInMonth(m+1,y)){
			return false;
		}			

		return new Date(y,m,d);
	};
	
	/* public method */	
	this.formatDate = function(date){
		return this.coreFormatDate(date, this.dateEntryFormatStructure)
	}	
	
	/* public method */	
	this.formatSystemDate = function(date){
		return this.coreFormatDate(date, this.dateSystemFormatStructure)
	}		
	
	/* private method */	
	this.coreFormatDate = function (date, patternStructure){
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		var strPart1 = this.transformByPattern(eval(patternStructure.part1.substr(1,1)), patternStructure.part1)
		var strPart2 = this.transformByPattern(eval(patternStructure.part2.substr(1,1)), patternStructure.part2)
		var strPart3 = this.transformByPattern(eval(patternStructure.part3.substr(1,1)), patternStructure.part3)
		
		return 	strPart1 + patternStructure.sep1 + strPart2 + patternStructure.sep2 + strPart3;
	};	
	
	this.checkWithPattern = function(strDate, formatCode){
		var strPattern = '';
		switch(formatCode){
			case "[d]d":
			case "[m]m":
				strPattern = "^[0-9]{1,2}$";
				break;
				
			case "dd":
			case "mm":
				strPattern = "^[0-9]{1,2}$";
				break;
							
			case "yy":			
				strPattern = "^[0-9]{2}$";
				break;
				
			case "yyyy":
				strPattern = "^[0-9]{4}|[0-9]{2}$";
				//strPattern = "^[0-9]{4}$";
				break;

			case "mmm":
				strPattern = "^(" + this.strConstants.months.join("|") + ")$";
				break;
				
			default:
				alert("error: unknown format of Constants.dateEntryFormat");
				return null;
		}

		return new RegExp(strPattern, "ig").test(strDate);
	
	};
	
	this.transformByPattern = function(date, formatCode){
		var strDate = '';
		switch(formatCode){
		
			case "[m]m":
				date++;

			case "[d]d":
				strDate = "" + date;
				break;
				

			case "mm":			
				date++;
				
			case "dd":
			case "yy":			
				strDate = "0" + date;
				strDate = strDate.substr(strDate.length-2,2);
				break;


			case "mmm":
				strDate = this.strConstants.months[date];
				break;
				
			case "yyyy":
				strDate = "000" + date;
				strDate = strDate.substr(strDate.length-4,4);				
				break;
								
			default:
				alert("error: unknown format of Constants.dateEntryFormat");
				return null;
		}

		return strDate;
	
	};	
				
	return this;
}();


//////////////////////////////////////////////////////////////////////////////
//
//  Tool Tip
//
//////////////////////////////////////////////////////////////////////////////

var toolTip = {
	oToolTip: null,
	oCurrentOver: null,
	timerHandlerOver: null,	
	timerHandlerOut: null,
	displayDelay: 300,	
		
	init: function (o) {
		if (!this.oToolTip) {
			this.oToolTip = document.createElement('DIV');
			this.oToolTip.className = 'toolTip';
			this.oToolTip.innerHTML = '';
			document.body.appendChild(this.oToolTip);
		}
	}
	,
	
	over: function (o, e) {
		this.init(o);
		
		if(this.timerHandlerOut){
			clearTimeout(this.timerHandlerOut);
			this.timerHandlerOut = null;
		}

		if(this.oCurrentOver != o){
			if(this.timerHandlerOver){
				clearTimeout(this.timerHandlerOver);
				this.timerHandlerOver = null;
			}		
		
			this.oCurrentOver = o;
			this.oToolTip.style.display = 'none';
			
			var arrDivs = o.getElementsByTagName("DIV");
			var oTtoolTipInfo = null;
			for(var i=0; i<arrDivs.length; i++){
				if(arrDivs[i].className == "toolTipInfo"){
					oTtoolTipInfo = arrDivs[i];
					break;
				}
			}
			
			if(!oTtoolTipInfo){
				return;
			}
			
			this.oToolTip.innerHTML = '<table border="0" cellspacing="0" cellpadding="0"><tr><td>'+oTtoolTipInfo.innerHTML+'</td></tr></table>';
			
			if (!o.onmouseout){ o.onmouseout = function () {toolTip.out(this)}};
			if (!o.onmousemove){ o.onmousemove = function (evt) {toolTip.move(this,evt)}};
			
			this.timerHandlerOver = setTimeout(function(){if(!toolTip.timerHandlerOut){toolTip.setDisplay();} toolTip.timerHandlerOver=null;},this.displayDelay);			
			
		}
		this.setPosition(e);
		if(!this.timerHandlerOver){
			this.setDisplay();
		}
	}
	,
	
	out: function (o) {
		this.oToolTip.style.display = 'none';
		this.timerHandlerOut = setTimeout(function(){clearTimeout(toolTip.timerHandlerOver);toolTip.timerHandlerOver=null;toolTip.oCurrentOver=null},50);
	}
	,
	
	move: function (o, e) {
		this.setPosition(e);
	}
	,
	
	setDisplay: function(){
		this.oToolTip.style.display = 'block';	
	}
	,
	
	setPosition: function (e) {
		var x, y;
		e = (e) ? e : window.event;
		
		if (e.pageX || e.pageY){
			x = e.pageX;
			y = e.pageY;
		}
		else if (e.clientX || e.clientY){
			x = e.clientX + document.body.scrollLeft;
			y = e.clientY + document.body.scrollTop;
		}		
		
		this.oToolTip.style.left = x + 10;
		this.oToolTip.style.top = y + 5;
	}	

}



var ajax = {
	config: {
		url: "",
		timeout: 0,
		cache: false,
		method: "GET",
		successToken: "!@#success#@!",		 
		dataType: "html"
	}
	,
/*
url:			string.					mandatory
params:			object.					optional - default: undefined
extraParams:	object.					optional - default: undefined
form:			string id/DOMObject.	optional - default: undefined
method:			"POST"/"GET"			optional - default: method="GET" if params & extraParams & form are undefined else "POST"
cache:			true/false				optional - default: false
success:		function handler		optional - default: undefined
error:			function handler		optional - default: undefined
successToken:	string					optional - default: "!@#success#@!"
dataType: 		"html"/"json"			optional - default: "html"
options: 		object					optional - default: undefined. Use this property for transfer custom parameters into callback functions
interstConfig:  config of interstitialFramework;
*/
	/* public method */
	request: function (config){
		var method = config.method || (config.params || config.extraParams || config.form) ? "POST" : "GET";
		var url = config.url;
		var cache = (typeof(config.cache)!="undefined") ? config.cache : this.config.cache;
		var successToken = (typeof(config.successToken)=="string") ? config.successToken : this.config.successToken;
		var dataType = (config.dataType) ? config.dataType : this.config.dataType;
		var data = "";
			data = this.urlEncode(config.params);
			if(config.extraParams){
				var extraData = this.urlEncode(config.extraParams);
				data += (data) ? "&"+extraData : extraData; 
			}
			if(config.form){
				var formData = this.serializeForm(config.form);
				data += (data) ? "&"+formData : formData; 				
			}

		
		if (data && method == "GET") {
			url += (url.match(/\?/) ? "&" : "?") + data;
			data = null;
		}	
		
		if (!cache && method == "GET") {
			var now = (new Date()).getTime();
			url += (url.match(/\?/) ? "&" : "?") + "noCache=" + now;			
		}			

		
		var _onreadystatechange = function(){
			if(httpRequest.readyState == 4){
			
				if(config.interstConfig){
					interstitialFramework.hide(config.interstConfig);			
				}			
				
				if(1 || _httpStatus()){
					if(httpRequest.responseText.indexOf(successToken) != -1){
						_success();
					}
					else{
						_error();					
					}
				}
				else{
					_error();
				}
				httpRequest = null;
			}
			
		};
		
		if(config.interstConfig){
			interstitialFramework.show(config.interstConfig);			
		}
		
		try{
			var httpRequest = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();		
			httpRequest.open(method, url, true);
			httpRequest.onreadystatechange = _onreadystatechange;
			httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequest.send(data);			
		}	
		catch(e){}
		
		function _success(){
			var data = "";
			switch(dataType.toLowerCase()){
				case "html":
					data = httpRequest.responseText;
					break;
				case "json":
					try{
						eval("data="+httpRequest.responseText);
					}					
					catch(e){
						data = null;
					}
					break;
			}
		
			if(config.success){
				config.success(data, config)
			}
		};
		
		function _error(){
			if(config.error){
				config.error(httpRequest, config)
			}

		};	
		
		function _httpStatus(){
			var s = httpRequest.status;
			if(( s >= 200 && s < 300 ) || s == 304 || s == 1223){
				return true;
			}
			else {
				return false;
			}	
		};		
		
	}
	,
	/* public method */	
	serializeForm: function(form){
		if(typeof form == 'string') {
			form = (document.getElementById(form) || document.forms[form]);
		}
		
		var el, name, val, disabled, data = ''
		for(var i=0; i<form.elements.length; i++){
			el = form.elements[i];
			disabled = form.elements[i].disabled;
			name = form.elements[i].name;
			val = form.elements[i].value;
			
			if (!disabled && name){
				switch (el.type){
					case "select-one":
					case "select-multiple":
						for (var j=0; j<el.options.length; j++){
							var opt = el.options[j];
							if (opt.selected){
								data += encodeURIComponent(name) + '=' + encodeURIComponent(((opt.hasAttribute) ? opt.hasAttribute('value') : opt.attributes['value'].specified) ? opt.value : opt.text) + '&';
							}
						}	
						break;
					case "radio":
					case "checkbox":
						if (el.checked) {
							data += encodeURIComponent(name) + '=' + encodeURIComponent(val) + '&';
						}
						break;
					case "file":
					case undefined:
					case "reset":
					case "button":
						break;
					default:
						data += encodeURIComponent(name) + '=' + encodeURIComponent(val) + '&';
				}
			}
		}
		data = data.substr(0, data.length - 1);
		return data;	
	} 
	,
	/* privat method */
    urlEncode : function(o){
        if(!o){
            return "";
        }
        var buf = [];
        for(var key in o){
            var ov = o[key], k = encodeURIComponent(key);
            var type = typeof ov;
            if(type == 'undefined'){
                buf.push(k, "=&");
            }else if(type != "function" && type != "object"){
                buf.push(k, "=", encodeURIComponent(ov), "&");
            }else if(ov instanceof Array){
                if (ov.length) {
                 for(var i = 0, len = ov.length; i < len; i++) {
                     buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
                 }
             } else {
                 buf.push(k, "=&");
             }
            }
        }
        buf.pop();
        return buf.join("");
    }	
}


var errorFramework = {
	cache: {},
	/*
	params configuration:
		elm: string Id or DOM object of field. - MANDATORY
		status: "valid"/"error". default: "valid",
		msg: string of error message.
		msgOptions: "add"/"ins"/"blank"/"miss" - default: "add"
		isForce: true/false. default: false. if it's TRUE script skip Cache functionality. It's needs if DOM was updated.
	*/
	setFieldStatus: function(params){
		var p = params;
		var oField = (typeof(p.elm)=="string") ? document.getElementById(p.elm) : p.elm;
		p.status = (p.status) ? p.status : "valid";
		
		if(p.status == "error"){
			this.addCss("errorField",oField);				
		}
		else{
			this.removeCss("errorField",oField);		
		}
		
		p.msgOptions = (p.msgOptions) ? p.msgOptions : "add";			
		if(p.msgOptions != "miss") {
			var oMsgArea = this.getErrorMsgArea(oField, p.isForce);
			if(oMsgArea){
				var oMsgCont = this.getElementsByClassName("errorNotice", oMsgArea)[0];			
				if(p.status == "error"){
					var tMsg = (p.msg) ? p.msg+"<br>" : "";
					switch(p.msgOptions){
						case "add":
							oMsgCont.innerHTML += tMsg;
							break;
					}
					
					this.removeCss("errorNoticeOff",oMsgArea);		
				}
				else {
					oMsgCont.innerHTML = "";
					
					this.addCss("errorNoticeOff",oMsgArea);													
				}
			}	
		}
	}
	,
	/* privat */
	getErrorMsgArea: function(o, isForce){
		var fieldHash = this.getHash(o.id);
		if(!isForce && this.cache[fieldHash]){
			return this.cache[fieldHash];
		}
		else {
			var	o1 = o;
			while(o1 && o1.tagName!="BODY"){
				var o2 = o1.previousSibling;
				while(o2){
					if(o2.tagName){
						var tNodes = this.getElementsByClassName("errorNoticeOuter",o2);
					 	if(tNodes[0]){
							this.cache[fieldHash] = tNodes[0];
							return tNodes[0];
						}
					}	
					o2 = o2.previousSibling;
				}
				o1 = o1.parentNode;
			}
		}
	}
	,
	/* privat */	
	getHash: function(s){
		return escape(s).replace(/[\W]/gi,'_');	
	}
	,
	/* privat */	
	getElementsByClassName: function(className, o){
		var tNodes = [];
		var tClass = new RegExp('\\b'+className+'\\b');
		if (tClass.test(o.className)){
			tNodes.push(o);
		}			
		var elms = o.getElementsByTagName('*');
		for (var i=0; i<elms.length; i++){
			if (tClass.test(elms[i].className)){
				tNodes.push(elms[i]);
			}	
		}
		return tNodes;
	} 
	,
	/* privat */		
	addCss: function(className, o){
		var tClass = new RegExp('\\b'+className+'\\b');
		if(!tClass.test(o.className)){
			o.className += " "+className;
		}	
	}
	,
	/* privat */		
	removeCss: function(className, o){
		var tClass = new RegExp('\\b'+className+'\\b',"g");
		if(tClass.test(o.className)){
			o.className = o.className.replace(tClass,"");
		}	
	}
		
}


/* scrolling to DOM element by ID is global function */
function scrollToElement(id){
	var o = document.getElementById(id);
	if(o){
		if(!o.currentStyle){
			self.location.hash = "";		
		}
		self.location.hash = id;		
	}
}