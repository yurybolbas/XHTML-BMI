/*
config structure:
	opacityClassName: string (default: "")
	content: string with content
	scrolling: "yes"/"no" - default: yes.
*/	

var _proto_interstitialContents = {
	waitAjax: '<div class="interstAjax"></div>'
	,
	searchInterst: '<table class="interstOuterTable"><tr><td class="interstOuterTD"><div class="interstSearch"><div class="interstSearchInner"><div class="brandHead"><div class="logo"></div></div><div class="title">Please wait while the system is processes your request</div><div class="bar"></div><div class="text">Please do not click the refresh, back or stop buttons until selection page is displayed. <br />It may take up to 60 seconds to process your request.</div> 				</div></div></td></tr></table>'
	,	
	searchInterstIframe: '<iframe src="../pages-common/Interstitial Page.html" scrolling="no" frameborder="0" style="width:100%;height:100%" scroll="none"></iframe>'	
}

var interstitialFramework = {
	oShim: null,
	oInterst: null,
	show: function(config) {
		if(!this.oShim) {
			var layout = '<div id="interstShimOuter" style="display:none"><iframe src="javascript:false" frameBorder="0" scroll="none"></iframe></div>';
				layout += '<div id="interstOuter" class="interstOuterDiv" style="display:none"></div>';
				this.insertHTML(document.body, layout);
			this.oShim = document.getElementById("interstShimOuter"); 
			this.oInterst = document.getElementById("interstOuter");			
		}
		config.opacityClassName = (config.opacityClassName)? config.opacityClassName : "interstStyle1";
		config.content = (config.content)? config.content : _proto_interstitialContents.waitAjax;	
		config.scrolling = (config.scrolling)? config.scrolling : "yes";			
		
		
			
		this.oShim.className = config.opacityClassName;
		document.body.style.backgroundAttachment = "fixed";	
		document.body.style.overflow = (config.scrolling == "no") ? "hidden" : "";
		this.oInterst.innerHTML = config.content;
		
		this.oShim.style.display = 'block';
		this.oInterst.style.display = 'block';
		this.oInterst.focus();		
		this.oInterst.blur();						
	}
	,
	
	hide: function(config) {
		document.body.style.backgroundAttachment = "scroll";	
		document.body.style.overflow = "";		
		this.oInterst.style.display = 'none';			
		this.oShim.style.display = 'none';	
	}
	,
	
	insertHTML: function (o, html) {
		if (o.insertAdjacentHTML) {
			o.insertAdjacentHTML("afterBegin",html);
		} else {
			var range = o.ownerDocument.createRange();
			var frag;
			range.setStartBefore(o.firstChild);
			frag = range.createContextualFragment(html);
			o.insertBefore(frag, o.firstChild);
		}
	}			
}


/*
config structure:
	id: String - MANDATORY
	ajaxConfig: {  data has free format and depends on ajax engine
			url: String
	}
	opacity: Boolean. (default: false) 
	templateName: String - MANDATORY
	position: String.  (relative/fixed/centered). (default: centered)
	offsets:{el:Object/String, t:Number, l:Number}, 
	size:{w:Number, h:Number},
	isCached: true/false. (default: false) 
	afterShowAction: fires after popup is showed
	populationContentAction: custom function for content population 	
	afterContentReadyAction:  fires after MAIN content is popupated
	closeOnBlur:false [TBD]
	beforeCloseAction:null [TBD]
	afterCloseAction:null - fires after popup has been hidden
	
	status: {noContent:true/false ,} - output property

*/

var extPopupTemplates = {
	
}




var popupFramework = {
	stepZindex: 10,
	basicZindex: 500,
	currentZindex: 500,
	openPopupsPool: {},
	openPopupsCount: 0,
	
	templates: {
		shim: '<div id="popupShimOuter" style="display:none"><iframe src="javascript:false" frameBorder="0" scroll="none"></iframe></div>',
		fakePopup:'<div id="{[values.config.id]}Dialog"><div id="{[values.config.id]}DefCont">Loading...</div><div id="{[values.config.id]}UpdateCont"></div></div>',
		commonPopup:'\
			<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
			<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Dialog Title</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
			<div class="dialogContent" id="{[values.config.id]}DialogContent">\
			<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
			<div id="{[values.config.id]}UpdateCont"></div>\
			<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
			<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
		',
		calendarType1:'\
			<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
				<div class="dialogHeader"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle">Calendar</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""></a></td></tr></table></div>\
				<div class="cdrArea"><table><tr>\
					<td id="cdrPanelLeft" class="cdrPanel cdrPanelLeft">\
						<div class="cdrHeader"><a href="#" onclick="calendar.prevMonth();return false">&nbsp;</a><h3 id="cdrPanelLeftH3">&nbsp;</h3></div>\
						<div class="cdrContent" id="cdrPanelLeftMonth"></div>\
					</td>\
					<td id="cdrPanelRight" class="cdrPanel cdrPanelRight">\
						<div class="cdrHeader"><a href="#" onclick="calendar.nextMonth();return false">&nbsp;</a><h3 id="cdrPanelRightH3">&nbsp;</h3></div>\
						<div class="cdrContent" id="cdrPanelRightMonth"></div>\
					</td>\
				</tr></table></div>\
			</div>'
		,
		calendarType2:'\
			<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
				<div class="dialogHeader"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle">Calendar</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""></a></td></tr></table></div>\
				<div class="cdrArea">\
					<div class="cdrPanelSingle">\
						<div class="cdrMonthYear">\
							<select class="sMonth" id="cdrControlMonth"><option value="-1">-</option></select>\
							<select class="sYear" id="cdrControlYear"><option value="-1">-</option></select>\
						</div>\
		                <div class="cdrContent" id="cdrPanelMonth"></div>\
					</div>\
				</div>\
			</div>'
	}
	,
	popups: {
		calendar: {
			contentData:{},
			strConstants: {
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				days: ["S", "M", "T", "W", "T", "F", "S"]
			}
		}
	}
	, 
	lazyContentsPool: {
				
	}
	,
	
	show: function(config) {
		config.status = {} /* init output params */
		if(!(config.isCached && document.getElementById(config.id+"Outer"))) {
			var	cbStack = [];
				cbStack[cbStack.length] = {handler:popupFramework.doShow,scope:popupFramework,params:[config,cbStack]}
			this.create(config,cbStack);
		}
		else {
			this.doShow(config);
		}
	}
	,
	doShow: function(config) {
		if(document.getElementById(config.id+"Outer").style.display=="none"){	
			var shim = document.getElementById("popupShimOuter");
			if(!shim) {
				this.insertHTML(document.body, this.templates.shim);
				shim = document.getElementById("popupShimOuter"); 
				
				window.onresize = function(){ setTimeout(function(){popupFramework.refresh();},1)}
			}
			
			document.body.style.backgroundAttachment = "fixed";

			if(config.position!="relative"){
				document.body.style.overflow = "hidden" /* temp solution */			
			}
			
			shim.className = shim.className.replace('popupShimOuterOpacity','');
			shim.className += ((config.opacity)?' popupShimOuterOpacity':'');
			
			var top=0;
			var left=0;	
			var siteWidth = 930;
			var tNodes = document.body.childNodes;
			/*
				for(var i in tNodes){
					if(tNodes[i].className && tNodes[i].className.indexOf('layoutMain') != -1){
						siteWidth = tNodes[i].offsetWidth;
						alert(tNodes[i].clientWidth)
					}
				}
			*/
					
			if(config.offsets) {
				if(config.offsets.el && config.position!="centered"){
					var el = document.getElementById(config.offsets.el);
					top = this.getPosY(el);
					left = this.getPosX(el);
				}
				top += (config.offsets.t)?config.offsets.t:0;
				left += (config.offsets.l)?config.offsets.l:0;	
				var leftSpace = Math.floor((parseInt(document.body.scrollWidth,10)-siteWidth)/2);
				left -= leftSpace;
				top = (top>0)?top:0; 
				left = (left>0)?left:0; 					
			}
			if(config.size) {
				if(config.size.w) {
					document.getElementById(config.id+"Dialog").style.width = config.size.w+'px';					
				}
				if(config.size.h) {
					document.getElementById(config.id+"DialogContent").style.height = config.size.h+'px';	
				}
			}

			document.getElementById(config.id+"Dialog").style.margin = top+'px 0 0 '+left+'px';
			
			
			
			/* temp dynamic solution */
			
			if(!config.isCached) {
				if(this.popups[config.id] && this.popups[config.id].contentData) {
					var contData = this.popups[config.id].contentData;
					for( var i in contData) {
						if (document.getElementById(config.id+i))
							document.getElementById(config.id+i).style.display = 'none';				
					}
				}	
				
				var oErrorContent = document.getElementById(config.id+"ErrorCont");
				if(oErrorContent) {
					oErrorContent.style.display = 'none';
				}
									
				var oDefContent = document.getElementById(config.id+"DefCont");
				if(oDefContent) {
					oDefContent.style.display = 'block';
				}
			}
			
			/* /temp dynamic solution */	
			
			this.currentZindex += this.stepZindex;		
			this.openPopupsPool[config.id] = this.currentZindex;
			this.openPopupsCount++;
			
			with (document.getElementById("popupShimOuter").style) {
				zIndex = this.currentZindex - 1;
				display = 'block';
			}
			
			with (document.getElementById(config.id+"Outer").style) {
				zIndex = this.currentZindex;
				display = 'block';
			}


			this.heightCorrection();							
			
			
			this.tabbingCorrection(config.id+"Dialog");
			
			
			
		
			if(this.lazyContentsPool[config.id] && this.lazyContentsPool[config.id].isPending){
				this.lazyContentsPool[config.id].isPending = false;				
				this.populationLazyContent(this.lazyContentsPool[config.id].config, this.lazyContentsPool[config.id].strContentData)
			}	
			
			this.popups[config.id+"-config"] = config; //save config
			
			if(config.afterShowAction){
				config.afterShowAction.apply(window,[config]);			
			}
			
			if(config.afterContentReadyAction && !config.status.noContent){
				config.afterContentReadyAction.apply(window,[config]);			
			}	
			

			
		}	
		
	}
	,
	
	refresh: function(){
		this.heightCorrection();
		//setTimeout(function(){popupFramework.refresh();},100)
	}
	,
	
	heightCorrection: function(){
		var idTopPopup = null;
		var tIndex = 0;
		for(var i in this.openPopupsPool){
			if(this.openPopupsPool[i] && this.openPopupsPool[i] > tIndex){
				idTopPopup = i;
				break;
			}
		}
		
		if(!idTopPopup) return;

		var oTopPopup = document.getElementById(idTopPopup+"Dialog");
		
		var winHeight = document.getElementById("popupShimOuter").offsetHeight;

		var tNodes = oTopPopup.getElementsByTagName("DIV");
		var oContent = null;
		for(var i=0; i<tNodes.length; i++){
			if(tNodes[i].className.indexOf("dialogFloatContent") != -1){
				oContent = tNodes[i];
				break;
			}
		}		
			
		if((!oContent) || (!oContent.offsetWidth)) return;
		
		
		var dScroll = oContent.offsetWidth - oContent.clientWidth;
	//	oContent.style.visibility = "hidden";
		oContent.style.height = "auto"; /* temp solution */
	//	oTopPopup.style.marginLeft = 0;
		if(winHeight < (oContent.scrollHeight + oTopPopup.offsetHeight - oContent.offsetHeight)){
			var newHeight = winHeight - (oTopPopup.offsetHeight - oContent.offsetHeight);
			oContent.style.height = (newHeight>100)?newHeight:100 + "px";
			if((dScroll == 0) && (oContent.offsetWidth != oContent.clientWidth)){
				oTopPopup.style.width = parseInt(oTopPopup.style.width,10) + (oContent.offsetWidth - oContent.clientWidth) + "px"; 	
		//		oTopPopup.style.marginLeft = (oContent.offsetWidth - oContent.clientWidth) + "px"; 					
			}				
		}
		else {
			//oContent.style.height = oContent.scrollHeight + "px"; 
			oContent.style.height = "auto"; /* temp solution */
			if((dScroll != 0) && (oContent.offsetWidth == oContent.clientWidth)){
				oTopPopup.style.width = parseInt(oTopPopup.style.width,10) - dScroll + "px"; 
		//		oTopPopup.style.marginLeft = 0;				
			}			
		}
	//	oContent.style.visibility = "visible";
	}
	,	
	
	tabbingCorrection: function(id, isForced){
		var dialogObj = document.getElementById(id);
		var idFirstNoTabindexLink = id+"_FirstNoTabindexLink";
		var idLastNoTabindexLink = id+"_LastNoTabindexLink";
				
		var idFirstMinTabindexLink = id+"_FirstMinTabindexLink";
		var idLastMaxTabindexLink = id+"_LastMaxTabindexLink";

		if(!document.getElementById(idFirstNoTabindexLink) || isForced){
			var oFirstNoTabindexLink = document.getElementById(idFirstNoTabindexLink);
			if(!oFirstNoTabindexLink){
				oFirstNoTabindexLink = document.createElement("A");
				oFirstNoTabindexLink.setAttribute('id',idFirstNoTabindexLink);	
				oFirstNoTabindexLink.setAttribute('href','#');															
			    oFirstNoTabindexLink.setAttribute('class','tabBlocker');			
				oFirstNoTabindexLink.onfocus = function(){this.blur()};
				dialogObj.insertBefore(oFirstNoTabindexLink,dialogObj.childNodes[0]);			
			}
			var oLastNoTabindexLink = document.getElementById(idLastNoTabindexLink);
			if(!oLastNoTabindexLink){
				oLastNoTabindexLink = document.createElement("A");
				oLastNoTabindexLink.setAttribute('id',idLastNoTabindexLink);
				oLastNoTabindexLink.setAttribute('href','#');																				
			    oLastNoTabindexLink.setAttribute('class','tabBlocker');			
				oLastNoTabindexLink.onfocus = function(){this.blur()};		
				dialogObj.appendChild(oLastNoTabindexLink);			
			}
			var oFirstMinTabindexLink = document.getElementById(idFirstMinTabindexLink);
			if(!oFirstMinTabindexLink){
				oFirstMinTabindexLink = document.createElement("A");
				oFirstMinTabindexLink.setAttribute('id',idFirstMinTabindexLink);
				oFirstMinTabindexLink.setAttribute('href','#');																				
			    oFirstMinTabindexLink.setAttribute('class','tabBlocker');			
				oFirstMinTabindexLink.onfocus = function(){this.blur()};
				dialogObj.insertBefore(oFirstMinTabindexLink,dialogObj.childNodes[0]);			
			}
			var oLastMaxTabindexLink = document.getElementById(idLastMaxTabindexLink);
			if(!oLastMaxTabindexLink){
				oLastMaxTabindexLink = document.createElement("A");
				oLastMaxTabindexLink.setAttribute('id',idLastMaxTabindexLink);	
				oLastMaxTabindexLink.setAttribute('href','#');								
			    oLastMaxTabindexLink.setAttribute('class','tabBlocker');			
				oLastMaxTabindexLink.onfocus = function(){this.blur()};
				dialogObj.appendChild(oLastMaxTabindexLink);			
			}
			
			var minTabIndex = 1000000;
			var maxTabIndex = 0;
						
			var verifyTags = ['INPUT','SELECT','TEXTAREA','A'];
			
			var verifyContainers = dialogObj.getElementsByTagName("FORM");
			
			for(var i=0; i<verifyContainers.length; i++){
				for(var k=0; k<verifyTags.length; k++){
					var tObjs = verifyContainers[i].getElementsByTagName(verifyTags[k]);
					
					for(var m=0; m<tObjs.length; m++){
						var tIndex = parseInt(tObjs[m].tabIndex);
						if(tIndex && tIndex < minTabIndex){
							minTabIndex = tIndex;
						}
						if(tIndex > maxTabIndex){
							maxTabIndex = tIndex;
						}
					}	
				}
			}			
			
			if(maxTabIndex>0){
				oFirstMinTabindexLink.tabIndex = minTabIndex;	
				oLastMaxTabindexLink.tabIndex = maxTabIndex;					
			}
		}
		
	}
	,	
	insertHTML: function (o, html) {
		if (o.insertAdjacentHTML) {
			o.insertAdjacentHTML("afterBegin",html);
		} else {
			var range = o.ownerDocument.createRange();
			var frag;
			range.setStartBefore(o.firstChild);
			frag = range.createContextualFragment(html);
			o.insertBefore(frag, o.firstChild);
		}
	},
	
	getPosX: function (o) {
		var x = 0;
			while(o && o.tagName!="BODY"){
				x += o.offsetLeft + (o.clientLeft || 0);
				o = o.offsetParent;		
			}
		return x;		
	}	
	,
	
	getPosY: function(o){
		var y = 0;
			while(o && o.tagName!="BODY"){
				y+= o.offsetTop + (o.clientTop || 0);
				o = o.offsetParent;		
			}
		return y;		
	}	
	,

	hide: function(config) {
		config = this.popups[config.id+"-config"]; //restore config	
		
		document.body.style.backgroundAttachment = "scroll";
		document.getElementById(config.id+"Outer").style.display = 'none';
		this.openPopupsCount--;
		if (!this.openPopupsCount) {
			this.currentZindex = this.basicZindex;
			document.getElementById("popupShimOuter").style.display = 'none';
			
			/* begin temp solution to fix bug with disappearing scrolling under Safari */
			if((document.body.style.overflow == "hidden") || (document.body.style.overflowX == "hidden") || (document.body.style.overflowY == "hidden")) {
				document.body.style.overflow = "";
				var enc = (document.body.scrollTop == 0) ? 1 : -1;
				window.scrollBy(0,enc);
				window.scrollBy(0,-enc);
				
			}
			/* end temp solution to fix bug with disappearing scrolling under Safari */
			
			document.body.style.overflow = "" /* temp solution */
		} 
		else if (this.openPopupsPool[config.id] == this.currentZindex) {
			this.currentZindex -= this.stepZindex;
			document.getElementById("popupShimOuter").style.zIndex = this.currentZindex - 1;
		}
		this.openPopupsPool[config.id] = null;
		
		
		if(config.afterCloseAction){
			config.afterCloseAction.apply(window,[config]);			
		}	
				
	}
	,
	create: function(config,cbStack) {
		var isTemplatePresent = false;
		if(this.templates[config.templateName]) {
			isTemplatePresent = true;		
		}
		else if(extPopupTemplates[config.templateName]){
			this.templates[config.templateName] = extPopupTemplates[config.templateName];
			isTemplatePresent = true;					
		}
		
		if(isTemplatePresent){
			if(config.ajaxConfig){
				config.status.noContent = true;					
				cbStackNew = [];
				cbStackNew[0] = {handler:popupFramework.populationContent,scope:popupFramework,params:[config,cbStackNew]}
				this.load(config,cbStackNew);
			}
			this.doCreate(config,cbStack);			
		}
		else {
			cbStack = (cbStack)? cbStack : [];
			cbStack[cbStack.length] = {handler:popupFramework.doCreate,scope:popupFramework,params:[config,cbStack]}
			this.load(config,cbStack);
		}
		
	}
	,
	doCreate: function(config,cbStack) {
		if(!document.getElementById(config.id+"Outer")){
			switch(config.position){
				case "relative":
					config.positionClass = "popupOuterDivRelative";
					break;
				case "fixed":
					config.positionClass = "popupOuterDivFixed";
					break;
				case "centered":
					config.positionClass = "popupOuterDivCentered";
					break;
				default:
					config.positionClass = "popupOuterDivCentered";
			}	
			var popupLayout = this.templates[config.templateName] || "<div>error: no template</div>";
			var tpl = '<div id="{[values.config.id]}Outer" class="popupOuterDiv {[values.config.positionClass]}" style="display:none"><table class="popupOuterTable"><tr><td class="popupOuterTD">'+popupLayout+'</td></tr></table></div>';
			
			this.insertHTML(document.body,this.tplFilling(tpl,{config:config}));

		}

		if(cbStack.length){
			var handler = cbStack[cbStack.length-1].handler;
			var scope = cbStack[cbStack.length-1].scope;
			var params = cbStack[cbStack.length-1].params;	
			cbStack.length--;					
			handler.apply(scope,params);			

		}
	}		
	,	
	tplFilling: function (tpl, values) {
		/* hard code - need template engine */	
		var res = tpl;
			res = res.replace(/\{\[values.config.id\]\}/g, values.config.id).replace(/\{\[values.config.positionClass\]\}/g, values.config.positionClass);
		return res;
	}
	,
	load: function(config,cbStack) {
		config.ajaxConfig.extOptions = {config:config,cbStack:cbStack};
		config.ajaxConfig.success = function(response,config){
		   		popupFramework.loadCallBack(config,response);
		   }
		config.ajaxConfig.error = function(httpRequest,config){
		   		popupFramework.errorCallBack(config,httpRequest);
		   }		
		   		
		   
		protoLoaderFramework.load(config.templateName+'LoadedContent',this,this.loadCallBack,[config.ajaxConfig]);
		
		

		//config.ajaxConfig.url = "1 Flight Search RT.html";
		//ajax.request(config.ajaxConfig);
		
	}
	,	
	loadCallBack: function(options,response) {
		var config = options.extOptions.config;
		var cbStack = options.extOptions.cbStack;
		
		//eval('this.popups.' + config.id + ' = ' + response);
		this.popups[config.id] = {};
		this.popups[config.id].contentData = {};
		this.popups[config.id].contentData.UpdateCont = response;
		if(this.popups[config.id].template){
			this.templates[config.templateName] = this.popups[config.id].template;
			alert(this.templates[config.templateName])
		}
		
		if(cbStack.length){
			var handler = cbStack[cbStack.length-1].handler;
			var scope = cbStack[cbStack.length-1].scope;
			var params = cbStack[cbStack.length-1].params;	
			cbStack.length--;					
			handler.apply(scope,params);			
		}		
	}
	,
	
	errorCallBack: function(options,httpRequest){
		var config = options.extOptions.config;
		var cbStack = options.extOptions.cbStack;	
	
		var oDefContent = document.getElementById(config.id+"DefCont");
		if(oDefContent) {
			oDefContent.style.display = 'none';
		}
		var oErrorContent = document.getElementById(config.id+"ErrorCont");
		if(oErrorContent) {
			oErrorContent.style.display = 'block';
		}
		this.heightCorrection();			
	}
	,
	
	populationContent: function(config)	{
		var data = this.popups[config.id].contentData;
		
		if(config.populationContentAction){ /* event afterContentReadyAction doesn't fire is this case */
			config.populationContentAction.apply(window,[config,data]);		
		}
		else { // default population
			document.getElementById(config.id+"DefCont").style.display = 'none';
			if(data){
				for (var i in data){
					document.getElementById(config.id+i).innerHTML = data[i];
					document.getElementById(config.id+i).style.display = 'block';
				}
			}
				
			this.heightCorrection();
					
			if(config.afterContentReadyAction){
				config.status.noContent = false;		
				config.afterContentReadyAction.apply(window,[config]);			
			}				
			
		}
	
	}
	,
	
	populationLazyContent: function(config, response){
	// {id:'idOfPopup', populationHandler:{handler:customFunction,scope:thisOfcustomFunction}}, response.responseText
		alert("lazy");
		return;
		this.lazyContentsPool[config.id] = {
			isPending: (document.getElementById(config.id+"Outer"))? false : true,
			strContentData: response,
			config: config						
		}	
		
		if(document.getElementById(config.id+"Outer")){
			if(config.populationHandler){
				var extHandler = config.populationHandler;
				extHandler.handler.apply(extHandler.scope,[config, response]);				
			}
			else {
				/* default population according to simple data format */
				eval("var tContentData =" + response);
				document.getElementById(config.id+"Content").innerHTML = tContentData.content;
			}
		}
			
	} 
}
