var enableBot=(enableBot)?true:false;

function botItem(name,type,present,value,items,mask){
 	this.name=name;
  	this.type=type;
 	this.present=present;
 	this.value=value;
	this.items=[];
	if(items && mask){
		for(var j=i=0; i<items.length; i++){
			if(items[i][2] & mask){
				this.items[j]={};
				this.items[j].text=items[i][0];
				this.items[j].val=items[i][1];					
				j++;
			}
		}
	}
	else if(items){
		for(var i=0; i<items.length; i++){
			this.items[i]={};
			this.items[i].text=items[i][0];
			this.items[i].val=items[i][1];					
		}
	}	
return this;		
}

function initBotObject(o,items,mask){
	items = (items)?items:o[4];
	return new botItem(o[0],o[1],o[2],o[3],items,mask);
}

function initBotObjects(){
	tripType = initBotObject(tripType);
	origin[0] = initBotObject(origin[0],cities,1);
	origin[1] = initBotObject(origin[1]);

	fakeOrigin[0] = initBotObject(fakeOrigin[0]);
	fakeOrigin[1] = initBotObject(fakeOrigin[1]);
	
	destination[0] = initBotObject(destination[0],cities,2);
	destination[1] = initBotObject(destination[1]);

	fakeDestination[0] = initBotObject(fakeDestination[0]);
	fakeDestination[1] = initBotObject(fakeDestination[1]);	
	

	departMonth[0] = initBotObject(departMonth[0],month);
	departDay[0] = initBotObject(departDay[0],day);
	departYear[0] = initBotObject(departYear[0]);
	departTime[0] = initBotObject(departTime[0],time);
	departDate[0] = initBotObject(departDate[0]);	

	departMonth[1] = initBotObject(departMonth[1],month);
	departDay[1] = initBotObject(departDay[1],day);
	departYear[1] = initBotObject(departYear[1]);
	departTime[1] = initBotObject(departTime[1],time);
	departDate[1] = initBotObject(departDate[1]);	
	
	// if date Control is Edit Box
	if(dateType==2){
		if(dateFormat==0){
			departDate[0].value = ''+(parseInt(departMonth[0].value)+1)+'/'+departDay[0].value+'/'+departYear[0].value;
			departDate[1].value = ''+(parseInt(departMonth[1].value)+1)+'/'+departDay[1].value+'/'+departYear[1].value;			
		}
		else{
			departDate[0].value = ''+departDay[0].value+'/'+(parseInt(departMonth[0].value)+1)+'/'+departYear[0].value;
			departDate[1].value = ''+departDay[1].value+'/'+(parseInt(departMonth[1].value)+1)+'/'+departYear[1].value;			
		}
	}

	numOfAdults = initBotObject(numOfAdults);
	numOfSeniors = initBotObject(numOfSeniors);
	numOfYouths = initBotObject(numOfYouths);
	numOfChildren = initBotObject(numOfChildren);
	numOfInfantsSeat = initBotObject(numOfInfantsSeat);
	numOfInfantsLap = initBotObject(numOfInfantsLap);
	
	classOfTravel = initBotObject(classOfTravel);
	fareOption = initBotObject(fareOption);	

	directFlights = initBotObject(directFlights);
	SearchType = initBotObject(SearchType);	

	formType = initBotObject(formType);	
	followAction = initBotObject(followAction);	
	
	for(var i=0; i<preferedAirlines.length; i++){
		preferedAirlines[i] = initBotObject(preferedAirlines[i]);	
	
	}
	
	/* initilization fields for TDP1.1 begin */
	if(typeBot==3){	
		packagesType = initBotObject(packagesType);	
		numOfRooms = initBotObject(numOfRooms);	
		preferredCar = initBotObject(preferredCar);
		formAction = initBotObject(formAction);			
		advancedSearchLink = initBotObject(advancedSearchLink);		
	}
	/* initilization fields for TDP1.1 end */	
	
}

function updateControlsState(){
	var botParams=null;
	var tVal=null;
	var tMonth=null;
	var tDay=null;	
	var tYear=null;
	var tTime=null;
	var tDate1=null;
	var tDate2=null;	
	var today=new Date();
	
	if(botParams=getCookie("botparams")){
		
		// tripType - no cookie
	
		tVal=getCookieItem("originCode0",botParams)
		if(tVal!=null){
			origin[0].value=tVal;
			destination[1].value=tVal;
		}

		tVal=getCookieItem("destinationCode0",botParams)
		if(tVal!=null){
			origin[1].value=tVal;
			destination[0].value=tVal;
		}		
		
		/* departure date 0 */
		
		tMonth=getCookieItem("departureMonth0",botParams);
		tDay=getCookieItem("departureDay0",botParams);	
		tYear=getCookieItem("departureYear0",botParams);
		tTime=getCookieItem("departureTime0",botParams);		

		if(tMonth!=null && tDay!=null && tYear!=null){
			tDate1=new Date(tYear,tMonth,tDay);
			if(tDate1 > today){
				departMonth[0].value=tMonth;
				departDay[0].value=tDay;
				departYear[0].value=tYear;
				
				// if date Control is Edit Box
				if(dateType==2){
					if(dateFormat==0){
						departDate[0].value = ''+(parseInt(departMonth[0].value)+1)+'/'+departDay[0].value+'/'+departYear[0].value;
					}
					else{
						departDate[0].value = ''+departDay[0].value+'/'+(parseInt(departMonth[0].value)+1)+'/'+departYear[0].value;
					}
				}				
			}
		}

		tVal=getCookieItem("departureTime0",botParams)
		if(tVal!=null){
			departTime[0].value=tVal;
		}		
		
		
		/* departure date 1 */
		
		tMonth=getCookieItem("departureMonth1",botParams);
		tDay=getCookieItem("departureDay1",botParams);	
		tYear=getCookieItem("departureYear1",botParams);
		tTime=getCookieItem("departureTime1",botParams);
		
		tDate1=new Date(departYear[0].value,departMonth[0].value,departDay[0].value);				
		
		if(tMonth!=null && tDay!=null && tYear!=null){
			tDate2=new Date(tYear,tMonth,tDay);
			if(tDate2 <= tDate1){
				tDate2=null;	
			}
		}	
		if(!tDate2){
			tDate2=new Date(tDate1.getTime()+60*60*24*1000);
			tMonth=tDate2.getMonth();
			tDay=tDate2.getDate();
			tYear=tDate2.getFullYear();				
		}
		departMonth[1].value=tMonth;
		departDay[1].value=tDay;
		departYear[1].value=tYear;		
			
		// if date Control is Edit Box
		if(dateType==2){
			if(dateFormat==0){
				departDate[1].value = ''+(parseInt(departMonth[1].value)+1)+'/'+departDay[1].value+'/'+departYear[1].value;
			}
			else{
				departDate[1].value = ''+departDay[1].value+'/'+(parseInt(departMonth[1].value)+1)+'/'+departYear[1].value;
			}
		}			
		
		tVal=getCookieItem("departureTime1",botParams)
		if(tVal!=null){
			departTime[1].value=tVal;
		}			
		
		/* */
		
		var passNames=["numOfAdults", "numOfSeniors", "numOfYouths", "numOfChildren", "numOfInfantsLap", "numOfInfantsSeat"];
		for(var i=0; i<passNames.length; i++){
			tVal=getCookieItem(passNames[i],botParams)
			if(tVal!=null && eval(passNames[i]+".present")){
				eval(passNames[i]+".value=tVal");
			}			
		}

		/* */
		
		tVal=getCookieItem("classOfTravel",botParams)
		if(tVal!=null){
			classOfTravel.value=tVal;
		}			
		
		/* */
		
		tVal=getCookieItem("directFlights",botParams)
		if(tVal!=null){
			directFlights.value=tVal;
		}	
		
		if(typeBot==1){
		
			/* */
			
			tVal=getCookieItem("searchMethod",botParams)
			if(tVal!=null){
				SearchType.value=tVal;
			}	
			
			/* */
			
			tVal=getCookieItem("fareOption",botParams)
			if(tVal!=null){
				fareOption.value=tVal;
			}			
		}
		
	/* update fields for TDP1.1 begin */		
	
	/* update fields for TDP1.1 end */				
		
	}
}

if(enableBot){
	initBotObjects();
	updateControlsState();
}	

/*   UI functions    */

function drawBotControl(control,type,tagParam,param){
	var str="";
	type=(type)?type:(control.present)?control.type:"hidden";
	
	switch (type){
		case "select":
			str+='<select name="' + control.name + '" id="' + control.name + '" ' + tagParam + ' >';		
			for(var i=0; i<control.items.length; i++){
				str+='<option value="' + control.items[i].val + '" ' + ((control.value==control.items[i].val)?'selected="selected"':'') + '>' + control.items[i].text + '</option>';
			}
			str+='</select>';					
			break;
			
		case "text":
		case "hidden":
			str+='<input type="' + type + '" value="' + ( control.value != 'null' ? control.value : '' ) + '" name="' + control.name + '" id="' + control.name + '" ' + tagParam + ' />';		
			break;
			
		case "radio":
			str+='<input type="' + type + '" value="' + control.items[param].val + '" name="' + control.name + '" id="' + control.name + param + '" ' + ((control.value==control.items[param].val)?'checked="checked"':'') + ' ' + tagParam + ' />';				
			break;
			
		case "checkbox":
			str+='<input type="' + type + '" value="' + control.items[0].val + '" name="' + control.name + '" id="' + control.name + '" ' + ((control.value==control.items[0].val)?'checked="checked"':'') + ' ' + tagParam + ' />';				
			break;
	}
	return str;
}



function changeTripType(val,typeBot){
	var oReturnTime=document.getElementById('idReturnTimeBlock');
	if(typeBot==0){
		oReturnTime.style.visibility=(val=="RT")?"visible":"hidden";
	}
	else{
		oReturnTime.style.display=(val=="RT")?"block":"none";
	}

}

function changeSearchType(val,typeBot){
//alert(val)
}



var errArr=[];
var errElement=null;
var errFlag=false;
var alphanumMask= /^[a-zA-Z0-9 !"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]*$/;

function submitBOTform(){
	errArr.length=0;
	errElement=null;
	errFlag=false;
	
	var form=document.getElementById(origin[0].name).form;
	
	if (tdpIsValidationRequried)
	{	
	
	var orig=form[origin[0].name];
	
	if(getElementValue(orig)==""){
		pushError(orig,err1)
	}
	else if(!alphanumMask.test(getElementValue(orig))){
		pushError(orig,err3)
	}
	
	var dest=form[destination[0].name];
	
	if(getElementValue(dest)==""){
		pushError(dest,err2)
	}
	else if(!alphanumMask.test(getElementValue(dest))){
		pushError(dest,err4)
	}

	if(!errFlag){
		if(getElementValue(orig)==getElementValue(dest)){
			pushError(orig,err5)		
		}
	}
	
	var errDate=false;
	if(dateType==2){
		if(!fillDateFields(departDate[0].name,departMonth[0].name,departDay[0].name,departYear[0].name,dateFormat)){
			pushError(form[departDate[0].name],err8);
			errDate=true;
		}
		if(getElementValue(form[tripType.name])=="RT" && !fillDateFields(departDate[1].name,departMonth[1].name,departDay[1].name,departYear[1].name,dateFormat)){
			pushError(form[departDate[1].name],err9)
			errDate=true;
		}
	}
	
	if(!errDate){
		if(!boundsDate(getElementValue(departMonth[0].name),getElementValue(departDay[0].name),getElementValue(departYear[0].name))){
			pushError(((dateType==2)?form[departDate[0].name]:form[departMonth[0].name]),err10);
			errDate=true;
		}
		if(getElementValue(form[tripType.name])=="RT"){
			if(!boundsDate(getElementValue(departMonth[1].name),getElementValue(departDay[1].name),getElementValue(departYear[1].name))){
				pushError(((dateType==2)?form[departDate[1].name]:form[departMonth[1].name]),err10);
				errDate=true;
			}
			if(!errDate){
				var depDate= new Date(getElementValue(departYear[0].name),getElementValue(departMonth[0].name),getElementValue(departDay[0].name));
				var retDate= new Date(getElementValue(departYear[1].name),getElementValue(departMonth[1].name),getElementValue(departDay[1].name));			
				if(depDate.getTime() > retDate.getTime()){
					pushError(((dateType==2)?form[departDate[0].name]:form[departMonth[0].name]),err11);
				}
			}	
		}
	}
	
	var passArr=[numOfAdults, numOfSeniors, numOfYouths, numOfChildren, numOfInfantsSeat, numOfInfantsLap];	
	var passToFocus=passArr[0].name;
	for(var i=0; i<passArr.length; i++){
		if(passArr[i].present){
			passToFocus=passArr[i].name;
			break;
		}
	}
	
	switch(checkNumPassengers([passArr[0].name, passArr[1].name, passArr[2].name, passArr[3].name, passArr[4].name, passArr[5].name])){
		case 1:
				pushError(form[passToFocus],err6);
				break;
			
		case 2:
				pushError(form[passToFocus],err7);
				break;	

		case 3:
				pushError(form[passToFocus],err7);
				break;	
	}
	
	
	if(errFlag){
		alert(errArr.join('\n'));
		errElement.focus();		
		return false;
	}	
	
	
	/* filling Fields */	
	
	var actionItem=0;
	
	if(typeBot < 3){	
		if(getElementValue(form[tripType.name])=="RT"){
			setElementValue(form[destination[1].name],getElementValue(form[origin[0].name]));
			setElementValue(form[origin[1].name],getElementValue(form[destination[0].name]))						
		}
		
			actionItem=0;
		if(getElementValue(form[SearchType.name])=="1"){
			actionItem=1
		}
		setElementValue(form[followAction.name],followAction.items[actionItem].val)	
	}
	else{
	 /* filling Fields for TDP1.1 begin */
	 
		switch(getElementValue(form[packagesType.name])){
			case "FH":
				actionItem=2;
				break;
			case "FHC":
				actionItem=3;
				break;
			case "FC":
				actionItem=4;
				break;
		}
		setElementValue(form[followAction.name],followAction.items[actionItem].val);
		form.action=formAction.items[actionItem].val;

	 /* filling Fields for TDP1.1 end */	
	}
	
	}
	
	form.submit();
}

	/* check functions */
	
function pushError(field,ErrStr){
	if(!errFlag){
		errFlag=true;
		errElement=field;
	}
	errArr[errArr.length]=ErrStr;	
}	

function checkNumPassengers(arrPsngs){
	try{	
		if(arrPsngs.length==6){
			var arrPsngsVal=[];
			var psngNum=0;
			for(var i=0; i<arrPsngs.length; i++){
				arrPsngsVal[i]=parseInt(getElementValue(arrPsngs[i]));
				psngNum+=arrPsngsVal[i];			
			}
			if(psngNum==0){
				return 3;
			}
			if(psngNum>9){
				return 1;
			}
			if(((arrPsngsVal[0]+arrPsngsVal[1])==0) || (arrPsngsVal[0]+arrPsngsVal[1] < arrPsngsVal[4]+arrPsngsVal[5])){
				return 2;
			}
			return 0;	
		}
		return -1;	
	}
	catch(e){
		return -1;
	}
}	

function boundsDate(m,d,y,interval){
	var deltaDay=(interval)?interval:331;
	var date1 = new Date(y,m,d);
	var today = new Date();
		today.setHours(0,0,0,0)
		
	if(today.getTime()>date1.getTime()){
		return false;
	}
	if(new Date(today.getTime()+deltaDay*60*60*24*1000)<date1.getTime()){
		return false;
	}
	return true;	
}


try{registerJS("js/bot_script1_1.js");}
catch(e){}