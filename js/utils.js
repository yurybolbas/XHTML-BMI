function collapsePriceSection(o,vector) {
	var oCollapse = o;
	do{
		oCollapse = oCollapse.parentNode;
	} while(!(oCollapse.nodeName == "DIV" && oCollapse.className.indexOf("bodySection")!=-1));
	
	oCollapse.className = (vector)? "bodySection expandedSection" : "bodySection collapsedSection"	
		
}

function switchSummarySection(o) {
	var oSwitch = o;
	do{
		oSwitch = oSwitch.parentNode;
	} while(!(oSwitch.nodeName == "DIV" && oSwitch.className.indexOf("contentBodyBlock")!=-1));
	
	if (oSwitch.className.match('contentBodyBlockExpanded')) {
		oSwitch.className = oSwitch.className.replace('contentBodyBlockExpanded','contentBodyBlockCollapsed');
	}
	else {
		oSwitch.className = oSwitch.className.replace('contentBodyBlockCollapsed','contentBodyBlockExpanded');	
	}
}

function addLegInTable(tblId){
	var oTbl = document.getElementById(tblId);
	var templateLeg = oTbl.getElementsByTagName("TBODY")[0];
	var tLeg = null;
	var countLegs = 0;
	tNode = templateLeg;
		
	do{
		if(tNode.nodeName == "TBODY"){
			tLeg = tNode;
			countLegs++;
		}
	} while(tNode = tNode.nextSibling);
			
	countLegs-=1;
	
	var tTbl = document.createElement("TABLE");
		tTbl.appendChild(templateLeg.cloneNode(true));
		tTbl.firstChild.style.display = '';			
	var tDiv = document.createElement("DIV");
		tDiv.appendChild(tTbl);		
		tDiv.innerHTML = tDiv.innerHTML.replace(/fakename/g,'name').replace(/\$M([\+-]{0,1}\d*)\$/g, function(s,$1){return countLegs+1+$1*1} );
		oTbl.appendChild(tDiv.firstChild.firstChild);		
}

/* tabsFramework */

var tabsFramework = {
	init: function (idTabsArea){
		var oRollingArea = this.getRollingArea(idTabsArea);
			oRollingArea.style.marginLeft = 0;
		
		var oNavArea = this.getNavArea(idTabsArea);
			oLinks = oNavArea.getElementsByTagName("A");
			for(var i=0; i<oLinks.length && i<2; i++){
				oLinks[i].onclick = function(scope,id,i){ return function(){scope.rolling(id,i);return false} }(this,idTabsArea,i);	
			}		
		
		this.correctionDesign(idTabsArea);
	}
	,
	
	rolling: function (idTabsArea, vector){
		var oRollingArea = this.getRollingArea(idTabsArea); 
		var visibleWidth = parseInt(oRollingArea.parentNode.offsetWidth);		
		var rollingWidth = parseInt(oRollingArea.getElementsByTagName("TABLE")[0].offsetWidth);
		var tOffset = -parseInt(oRollingArea.style.marginLeft) - 1;
		var rOffset = 0;
				
		var oTabLists = oRollingArea.getElementsByTagName("TD");		

		for(var i=0; i<oTabLists.length; i++){
			if(rOffset >= tOffset){
				break;
			}
			rOffset+= oTabLists[i].offsetWidth;			
		}
		if(vector){
			rOffset+= oTabLists[i].offsetWidth + 1;
				if((rollingWidth - rOffset) < visibleWidth){
					rOffset = rollingWidth - visibleWidth - 1;
				}	
		}
		else{
			if(i){
				rOffset-= oTabLists[i-1].offsetWidth - 1;
			}
			else{
				rOffset = 1;
			}			
		}	
		oRollingArea.style.marginLeft = -rOffset+"px";	
	}
	,
	
	correctionDesign: function(idTabsArea){
		var oRollingArea = this.getRollingArea(idTabsArea); 
		var visibleWidth = parseInt(oRollingArea.parentNode.offsetWidth);		
		var rollingWidth = parseInt(oRollingArea.getElementsByTagName("TABLE")[0].offsetWidth);
		var tOffset = -parseInt(oRollingArea.style.marginLeft);		
		var oNavArea = this.getNavArea(idTabsArea);
		if(visibleWidth < rollingWidth) {
			oNavArea.style.display = "";
			oRollingArea.style.marginLeft = "-1px";	
			oRollingArea.parentNode.className += " tabsOuterAreaClip";				
		}
		else {
			oNavArea.style.display = "none";
			oRollingArea.style.marginLeft = 0;		 	
		}	
	}
	,
	
	getRollingArea: function(idTabsArea) {
		return this.getDivByClass(idTabsArea, "tabsRollingArea");
	}
	,
	
	getNavArea: function(idTabsArea) {
		return this.getDivByClass(idTabsArea, "tabsNavArea");
	}
	,
	
	getDivByClass: function(scope, className) {
		var divs = document.getElementById(scope).getElementsByTagName("DIV");
		for (var i in divs) {
			if(divs[i].className && divs[i].className.indexOf(className) != -1){
				return divs[i];
			}
		}
	}
}	