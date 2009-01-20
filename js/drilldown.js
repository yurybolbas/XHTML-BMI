/* Drilldown */

var drillDownFramework = {
	transactionCode: 1,
	isControlActive: false,
	timerHandler: null,
	
	oSource: null,
	sourceValue: "",
	minChars: 3,
	queryDelay: 300,	
	queryTimerHandler: null,
	
	loadedData: null,
	cachePool:{},
	
	oDrillDown: null,
	oDrillDownItems: null,
	
	countItems: 0,
	activeItem: 0,
	itemHeight: 0,
	maxVisibleItems: 10,
	
	returnValue: null,
	returnFunction: null,
	
	msgs: {
		txtLoading: "Loading...",
		txtNoItems: "No flight found.",
		txtMinChars: "Please type 3 or more letters."
	}
	,
	curText: "",
	curVal: "",
	config:{}	
	,
	
	isblurFaked: false,
	
	
	init: function(config){
		if(!this.oDrillDown){
			this.oDrillDown = document.createElement('DIV');
			this.oDrillDown.id = 'drillDown';
			this.oDrillDown.innerHTML = '<div class="drillDownIfrCont"><iframe src="javascript:false" name="drillDownIfr" id="drillDownIfr" frameborder="0" scroll="none"></iframe></div><table cellspacing="0" cellpadding="0" border="0"><tr><td><div id="drillDownItems"></div></td></tr></table>';
			document.body.insertBefore(this.oDrillDown,document.body.firstChild);
			
			this.oDrillDownItems = document.getElementById("drillDownItems");
			this.oDrillDownIframe = document.getElementById("drillDownIfr");			
			
			this.oDrillDown.onmouseover = function(){drillDownFramework.onMouseOverHandlerDrillDown()};			
			this.oDrillDown.onmouseout = function(){drillDownFramework.onMouseOutHandlerDrillDown()};
			this.oDrillDownItems.onfocus = function(){drillDownFramework.onFocusHandlerDrillDown()};
				
		}
		
				
	}
	,
	
	destruction: function(){
		//alert("destruction")			

	}
	,
/*
config structure:

textField - string(id)/DOM object.  Reference to Input Field
valField - string(id)/DOM object.  Reference to hidden Field
cbSelect - funcion Handler. Custom function runs when setSelectionItem pass.
cbBlur - funcion Handler. Custom function runs when onBlur fires.
msgs - object. Reference to object with msgs.
ajax: {  data has free format and depends on ajax engine
	url: String
}


*/
		
	open: function(config){
		wrDb("open beg","#aaa")
		this.init();
		if(this.config.textField != config.textField){
			// need refactoring
			this.config = config; 
			this.oSource = (typeof(config.textField) == "string") ? document.getElementById(config.textField) : config.textField;
			this.curText = this.oSource.value;
			this.oValueField = (typeof(config.valField) == "string") ? document.getElementById(config.valField) : config.valField;
			this.curVal = this.oValueField.value;						
			
			
			
			if(config.msgs){
				this.msgs = config.msgs;
			}
		
			//this.oSource = oSource;
			//this.returnFunction = returnFunction;
			//this.returnValue = null;
			
			
			this.setPosition();
			this.oSource.onkeyup = function(evt){return drillDownFramework.onKeyUpHandlerDrillDown(evt)};
			this.oSource.onkeypress = function(evt){return drillDownFramework.blockingKeys(evt)};
			this.oSource.onkeydown = function(evt){return drillDownFramework.onKeyDownHandlerDrillDown(evt)};			
			this.oSource.onblur = function(){drillDownFramework.onBlurHandlerDrillDown()};	
			
			(window.addEventListener)? window.addEventListener('resize',this.onScrollHandler,false) : window.attachEvent('onresize',this.onScrollHandler);

			this.sourceValue = this.oSource.value;
			this.loadData(function(){drillDownFramework.show()});
			this.isControlActive = true;					
				 				
		}
		wrDb("open end")					
	}
	
	,
	close: function(r){
		wrDb("close beg"+r)		
		this.isControlActive = false;			
		this.hide();
		this.oSource.onkeyup = function(){};
		this.oSource.onblur = function(){};	
		this.oSource.onkeydown = function(){};
		 	
		(window.removeEventListener)? window.removeEventListener('resize',this.onScrollHandler,false) : window.detachEvent('onresize',this.onScrollHandler);			
		
		this.oSource = null;
		this.config = {};
		wrDb("close end","#777")				
	}
	,
	
	refresh: function(){
		wrDb("refresh beg")		
		if(this.oSource && this.oSource.value != this.sourceValue){
			this.sourceValue = this.oSource.value;
			this.returnValue = null;
			this.loadData(function(){drillDownFramework.show()});
		}
		wrDb("refresh end")				
	}
	,
	
	show: function(){
	wrDb("show beg")
		this.countItems = this.loadedData.length;
		if(this.countItems){
			this.oDrillDownItems.style.width = "auto";	
			this.oDrillDownItems.style.overflow = "visible";	
			var itemsStr = this.drawItems(this.loadedData);
			this.oDrillDownItems.innerHTML = itemsStr;
			
			var tNodes = this.oDrillDownItems.getElementsByTagName("A");
			
			this.itemHeight = tNodes[0].offsetHeight;
			var visibleItems = this.maxVisibleItems;
			if(this.maxVisibleItems >= this.countItems){
				visibleItems = this.countItems;
			}
			
			
			this.oDrillDownItems.style.height = visibleItems * this.itemHeight + 'px';	
			//this.oDrillDownItems.style.minWidth = this.oSource.clientWidth + 'px';
			
			if (this.countItems > this.maxVisibleItems) {
				this.oDrillDownItems.style.overflow = "auto";
				this.oDrillDownItems.style.width = this.oDrillDownItems.offsetWidth + this.oDrillDownItems.scrollWidth - this.oDrillDownItems.clientWidth + 'px';
			}
			
			this.activeItem = 0;			
			this.selectItem(1);			
			this.oDrillDownItems.scrollTop = 0;
			
			this.oDrillDownIframe.style.height = this.oDrillDown.offsetHeight + 'px';
			this.oDrillDownItems.style.display = "none";	
			this.oDrillDownItems.style.display = "";						
			
			this.oDrillDown.style.visibility = "visible";	
			
		}
		else{
			this.hide();
		}
	wrDb("show end")			
	}
	,
	
	hide: function(){
	wrDb("hide beg")
		this.oDrillDown.style.visibility = "hidden";
	wrDb("hide end")			
	}
	,
	
	loadData: function(cbFunc){
		var textVal = this.oSource.value;
		var elmHash = escape(this.oSource.id+textVal).replace(/[\W]/gi,'_');
		wrDb("CASH=" +elmHash)		
		if(textVal.length < this.minChars){
		wrDb("load data minChars beg")		
			this.loadedData = [[this.msgs.txtMinChars,"---"]];
			this.show();	
		}
		else if(this.curText != this.oSource.value){
			if(this.cachePool[elmHash]){
				wrDb("load data From Cache","red")		
				this.loadedData = this.cachePool[elmHash];
				this.show();						
			}
			else{
			wrDb("load data beg")		
				this.loadedData = [[this.msgs.txtLoading,"---"]];
				this.show();
				this.transactionCode++;		
				
				if(this.queryTimerHandler){
					clearTimeout(this.queryTimerHandler);	
				}
				var extOptions = {	cbFunc:cbFunc,
									transCode:this.transactionCode,
									textVal:textVal,
									elmHash:elmHash
								}
				this.queryTimerHandler = setTimeout(function(extOptions){ return function(){drillDownFramework.doLoadData(extOptions)}}(extOptions),this.queryDelay)			
			}	
		}	
	}
	,
	
	doLoadData: function(extOptions){
			this.queryTimerHandler = null;
/*			
			$.ajax({
				extOptions:extOptions, 
			  	url: this.config.ajax.url, 
			   	success: function(response){
					drillDownFramework.loadDataCallBack(response,this);
			   }
			});	
*/
			// vvv for proto only	
			this.loadDataCallBack("[]",{extOptions:extOptions});
			// ^^^ for proto only				
	}
	,
	
	loadDataCallBack: function(response,config){
		var tDate = eval(response);
		this.loadedData = [];
		
		// vvv for proto only
		tDate = airportData;
		var tDateFiltered = [];

		for(var i=0; i<tDate.length; i++){
			if(tDate[i][0].toUpperCase().indexOf(this.sourceValue.toUpperCase()) == 0){
				tDateFiltered[tDateFiltered.length] = tDate[i]; 
			}
		}
		tDate = tDateFiltered;
		// ^^^ for proto only		
		
		if(tDate.length == 0){
			tDate = [[this.msgs.txtNoItems,"---"]];		
		}

		this.cachePool[config.extOptions.elmHash] = tDate;
		
		if(config.extOptions.transCode != this.transactionCode){
			wrDb("load data before call back out-of-date","blue");		
			return; /* response is out-of-date */
		}	
		
		this.loadedData = tDate;
		
		wrDb("load data before call back")			
		config.extOptions.cbFunc();
		wrDb("load data end")
	}
	,
	
	drawItems: function(data){
		var str="<div style='width:"+(this.oSource.offsetWidth-2)+"px;height:0;'><span></span></div>";

		for(var i=0; i<data.length; i++){
			if(data[i][1] == "---"){
				str+='<a>'+data[i][0]+'</a>';
			}
			else{
				str+='<a href="#" id="drilldownItem'+(i+1)+'" onmouseover="drillDownFramework.selectItem('+(i+1)+')" onclick="drillDownFramework.setSelectionItem(' +(i+1)+ ');return false">' + data[i][0] + '</a>'
			}	
		}
		return str;	
	}
	,
	
	selectItem: function(n){
		if(this.activeItem){
			document.getElementById("drilldownItem"	+ this.activeItem).className = "";
		}	
		wrDb("selectItem=" + n)	
		if(document.getElementById("drilldownItem" + n)){	
			this.activeItem = n;		
			document.getElementById("drilldownItem"	+ n).className = "active";
		}
		else {
			this.activeItem = 0;	
		}					
	}
	,
	
	setSelectionItem: function(n){
			wrDb("setSelectionItem beg")				
			n = (n)? n : this.activeItem;
			if(!n){
				return;
			}
			this.returnValue = this.loadedData[n-1];
			this.curText = this.returnValue[0];
			this.curVal = this.returnValue[1];			
						
			//alert(2)
			this.hide();
			this.isblurFaked = false;			
			if(!this.timerHandler){
				//this.oSource.onblur = function(){drillDownFramework.close()};
			}
				
			this.oSource.value = this.curText;
			this.oValueField.value = this.curVal;			 	
						
			if(this.config.cbSelect){
				this.config.cbSelect(this.config,this.returnValue);
			}
			
			wrDb("setSelectionItem end")								
	}
	,	
	
	selectNextItem: function(){
		if(this.activeItem < this.countItems){
			this.selectItem(this.activeItem+1);		
			if(this.maxVisibleItems < this.countItems){
				var scrollTop = this.oDrillDownItems.scrollTop;
				if(scrollTop < (this.activeItem - this.maxVisibleItems) * this.itemHeight){
					this.oDrillDownItems.scrollTop = (this.activeItem - this.maxVisibleItems) * this.itemHeight;
				}
			}		
		}	
	}
	,

	selectPrevItem: function(){
		if(this.activeItem > 1){
			this.selectItem(this.activeItem-1);
			if(this.maxVisibleItems < this.countItems){
				var scrollTop = this.oDrillDownItems.scrollTop;
				if(scrollTop > (this.activeItem - 1) * this.itemHeight){
					this.oDrillDownItems.scrollTop = (this.activeItem - 1) * this.itemHeight;
				}
			}				
		}
	}
	,
	
	setPosition: function(){
		this.oDrillDown.style.left = this.getPosX(this.oSource) + 'px';
		this.oDrillDown.style.top = this.getPosY(this.oSource) + this.oSource.offsetHeight + 'px';		
	}
	,
	
	getPosX: function(o){
		var x = 0;
			while(o && o.tagName != "BODY"){
				x+= o.offsetLeft;
				o = o.offsetParent;					
			}
		return x;
	}
	,
	
	getPosY: function(o){
		var y = 0;
			while(o && o.tagName!="BODY"){
				y+= o.offsetTop;
				o = o.offsetParent;		
			}
		return y;		
	}	
	,
	
	blockingKeys: function(evt){
		evt = (evt) ? evt : ((window.event) ? event : null);
		switch (evt.keyCode){
		case 13:
			return false;
			
		default:
			return true;
		}
	}
	,
	
	onKeyDownHandlerDrillDown: function(evt){
		wrDb("onKeyDown beg")
		evt = (evt) ? evt : ((window.event) ? event : null);
		switch (evt.keyCode){
		case 38:
			this.selectPrevItem();
			break;		
		case 40:
			this.selectNextItem();
			break;		
		case 13:
			this.setSelectionItem();
			break;			
		case 9:
			this.isblurFaked = false;		
			this.setSelectionItem();
			break;		
		}						
		wrDb("onKeyDown end")		
	}
	,	
	
	onKeyUpHandlerDrillDown: function(evt){
		wrDb("onKeyUp beg")
		if(this.blockingKeys(evt)){
			this.refresh();
		}
		wrDb("onKeyUp end")						
	}
	,	
	
	onFocusHandlerDrillDown: function(){
		wrDb("onFocus beg")				
		this.oSource.focus();
		wrDb("onFocus end")						
	}
	,
	
	onBlurHandlerDrillDown: function(){
		wrDb("onblur beg flag="+this.isblurFaked,"green")	
		if(this.isblurFaked){
			setTimeout(function(){drillDownFramework.oSource.focus()},50);		
		}
		else {
			if(this.oSource.value.search(/^[\s]*$/g) != -1){
				this.curText = "";
				this.curVal = "";				
			}
			this.oSource.value = this.curText;
			this.oValueField.value = this.curVal;			 	
						
			if(this.config.cbBlur){
				this.config.cbBlur(this.config,[this.curText,this.curVal]);
			}			
			drillDownFramework.close();		
		}
		wrDb("onblur end")						
	}
	,	
	
	onMouseOverHandlerDrillDown: function(){
		wrDb("onMouseOver beg")
		if(this.oSource){						
			if(this.timerHandler){
				clearTimeout(this.timerHandler);
				this.timerHandler = null;				
			}
			this.isblurFaked = true;
			//this.oSource.onblur = function(){setTimeout(function(){drillDownFramework.oSource.focus()},50)}			
		}	
		wrDb("onMouseOver end")			
	}
	,
	
	onMouseOutHandlerDrillDown: function(){
		wrDb("onMouseOut beg")
		if(this.oSource){	
	wrDb("onMouseOut set timer")
			this.timerHandler = setTimeout(function(){drillDownFramework.timerHandler = null; drillDownFramework.isblurFaked = false;},50);	
			//this.timerHandler = setTimeout(function(){drillDownFramework.oSource.onblur = function(){drillDownFramework.timerHandler = null; drillDownFramework.close('blur')}},50);
		}	
		wrDb("onMouseOut end")			
	}
	,
	
	onScrollHandler: function(){
		drillDownFramework.setPosition();			
	}
			
	
}


function wrDb(t,c){
	return;
	c = (c)?c: "#000"
	var dbCont = document.getElementById("DBDlill");
	if(!dbCont){
		dbCont = document.createElement('DIV');
		dbCont.id = "DBDlill";
		document.body.insertBefore(dbCont,document.body.firstChild);	
		dbCont.style.cssText="position:absolute;z-index:1000;top:0;left:0; text-align:left; background:#FFF"
	}
	dbCont.innerHTML+= "~~~<span style='color:"+c+"'>" +t+"</span>";
}

function returnAirportFromDrilldown(config,returnValue){

}
