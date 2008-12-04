var protoLoaderFramework = {
	oLoader: null,
	contentLoader: null,
	dialogId: null,
	
	callerOwner: null,	
	caller: null,
	callerArgs: null,
	
	init: function (){
		var oIfr = document.createElement("IFRAME");
	    oIfr.setAttribute('id','protoLoaderIframe');
	    oIfr.setAttribute('name','protoLoaderIframe');		  
	    oIfr.style.border = '0px';
	    oIfr.style.width = '0px';
	    oIfr.style.height = '0px';
		oIfr.src = 'javascript:false';
	    this.oLoader = document.body.insertBefore(oIfr,document.body.childNodes[0]);
		this.oLoader.src = "javascript:false";
	}
	,
	
	load: function(id,callerOwner,callerFunc,callerArg){
	
		if(!this.oLoader){
			this.init();
		}
		
		onloadGlobalHandler.extraDataLoaded = false;
		
		this.callerOwner = (callerOwner)? callerOwner : null;
		this.caller = (callerFunc)? callerFunc : null;
		this.callerArgs = (callerArg)? callerArg : null;	

		this.dialogId = id;
		this.oLoader.src = this.getScrById(id);
	}
	,
	
	transferContent: function(){
//		alert("transfer begin")
		this.contentLoader = (this.oLoader.contentDocument) ? this.oLoader.contentDocument: ((this.oLoader.contentWindow) ? this.oLoader.contentWindow.document : this.oLoader.document);
		
		var oSource = this.contentLoader.getElementById(this.dialogId);
		this.oLoader.src = "javascript:false";		
		
		this.runJs(oSource);
		onloadGlobalHandler.extraDataLoaded = true;	
		
		var sourceHTML = '';
		if (oSource.outerHTML) {
			sourceHTML = oSource.outerHTML;
		}
		else {
			sourceHTML = '<' + oSource.tagName;
			for (var i = 0; i < oSource.attributes.length; i++)
				sourceHTML += ' ' + oSource.attributes[i].name + '="' + oSource.attributes[i].value + '"';
			sourceHTML += '>' + oSource.innerHTML + '</' + oSource.tagName + '>';	
		}
		
		if(this.caller){
			this.callerArgs[this.callerArgs.length] = sourceHTML;
			this.caller.apply(this.callerOwner,this.callerArgs);
		}	
	}
	,
	
	getScrById: function(id){
		if(!protoLoaderSrcMapping[id]){
			alert("file for id='" + id + "' not found!");
			return null;
		}
		return protoLoaderSrcMapping[id]+"?noCache="+new Date().getTime();
	}
	,
	
	runJs: function(o){
		var oJsTags = o.getElementsByTagName("SCRIPT");
		for(var i=0; i<oJsTags.length; i++){
			if(oJsTags[i].src){
			//	var externalJs = oJsTags[i].cloneNode(true);
			//	oJsTags[i].parentNode.replaceChild(externalJs,oJsTags[i]);
				if(/WebKit|Khtml/i.test(navigator.userAgent)){
					var oHttpRequest = (window.XMLHttpRequest) ? new XMLHttpRequest() : null;
					if(oHttpRequest){
						oHttpRequest.open("get", oJsTags[i].src, false);
						/*
						oHttpRequest.onreadystatechange = function () {
							if (oHttpRequest.readyState == 4) {
								setTimeout(oHttpRequest.responseText.replace(/&amp;lt;/g,"<"),0);
							}
						}
						*/
						oHttpRequest.send(null);
						
						//setTimeout(oHttpRequest.responseText.replace(/&amp;lt;/g,"<"),0); /* syncr*/
						eval(oHttpRequest.responseText)
					}
					
				}
				else{
					oJsTags[i].src = oJsTags[i].src;
				}
			}
			else{
			//	alert(oJsTags[i].innerHTML);		
				if(window.execScript){
					window.execScript(oJsTags[i].innerHTML,'javascript');
				}
				else {
					eval(oJsTags[i].innerHTML);
					//setTimeout(oJsTags[i].innerHTML.replace(/&amp;lt;/g,"<"),0);	
				}	
			}
		}
	}
	
}


var protoLoaderSrcMapping = {
	flightDetailsPopupLoadedContent:"../popups/Popups.html",
	taxesFeesPopupLoadedContent:"../popups/Popups.html",
	surchargesPopupLoadedContent:"../popups/Popups.html",
	taxDescriptionPopupLoadedContent:"../popups/Popups.html",
	surchargeDescriptionPopupLoadedContent:"../popups/Popups.html",
	preferencesPopupLoadedContent:"../popups/Popups.html",
	fareRulesPopupLoadedContent:"../popups/Popups.html",
	seatMapPopupLoadedContent:"../popups/Popups.html",
	airTermsPopupLoadedContent:"../popups/Popups.html",
	hotelDescriptionPopupLoadedContent:"../popups/Popups.html",
	hotelBreakdownPopupLoadedContent:"../popups/Popups.html",
	locationMapPopupLoadedContent:"../popups/Popups.html",
	groupBookingPopupLoadedContent:"../popups/Popups.html",
	carDescriptionPopupLoadedContent:"../popups/Popups.html",
	carVendorPopupLoadedContent:"../popups/Popups.html",
	carBreakdownPopupLoadedContent:"../popups/Popups.html",
	insuranceBenefitsPopupLoadedContent:"../popups/Popups.html",
	insuranceBreakdownPopupLoadedContent:"../popups/Popups.html",
	insuranceTermsPopupLoadedContent:"../popups/Popups.html",
	securityCodePopupLoadedContent:"../popups/Popups.html",
	staticContentPopupLoadedContent:"../popups/Popups.html"
}