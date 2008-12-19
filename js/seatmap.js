/* Seat Map Framework */

seatMapFramework = {
	viewMode: "edit", /* edit/view */
	idSeatMapPlaceHolder: "idSeatMapPlaceHolder",
	idSeatMapLoadingPlaceHolder: "idSeatMapLoadingPlaceHolder",	
	idErrorsPlaceHolder: "idErrorSeatMapPlaceHolder",
	cache: {},
	errors: {
		isError:false,
		codes:[
			{
			guestIndex:1, /* from 1 to length of guests */
			code:0, /* 	1 -	"seat is not present on the plane"; 2 - "seat is not availble" 	3 - "Children 2-11 yrs can't sit in the exit rows." */
			seat:0
			}
		]
		,
		add: function(guestIndex,code,seat){
			this.isError = true;
			var er = this.codes[this.codes.length] = {};
			er.guestIndex = guestIndex;
			er.code = code;
			er.seat = (seat)?seat:0; 
		}
		,
		removeAll: function(){
			this.isError = false;
			this.codes = [];		
		}
		,
		show: function(){
			var errStr = '';
			for(var i=0; i<this.codes.length; i++){
				switch(this.codes[i].code){
					case 1:
						errStr+="Seat is not present on the plane.";
						break;
					case 2:
						errStr+='Seat "'+this.codes[i].seat+'" is not availble.';
						break;
					case 3:
						errStr+="Children 2-11 yrs can't sit in the exit rows.";
						break;
				
				}
			}
			alert(errStr);
		}
		,
		close: function(){
			document.getElementById("legSegment_" + seatMapFramework.currentSegmentIndex + "_seatField_" + seatMapFramework.currentGuestIndex).focus();
		}
	},
		
	segments: [
		{
			index: 0,
			guests: [
				{
					name: "A1", /* A1, C1 etc. */
					code: "ADT", 	/* ADT=Adult,	YTH=Youth,	CNO=Child 12-15 yrs, CNN=Child 2-11 yrs, INF=Infant */
					defSeat: "9B",
					curSeat: "9B",	
					defSeatHtml: ""				
				}
			]
			,
			plane: {
				rows: [
					{
						number:9,
						attrs:[1],
						seats:[
							{letter:"A",status:1,attrs:[1]},
							{letter:"B",status:1,attrs:[1]},
							{letter:"D",status:3,attrs:[47]}
						]
					}
				]
			}
		}

	],
	currentSegment: null,
	currentSegmentIndex: -1,
	currentGuest: null,
	currentGuestIndex: -1,	
	

	init: function(guests, viewMode){
		this.errors.removeAll();
		this.viewMode = (viewMode)?viewMode:'edit';
		this.segments = [];
		for(var i=0; i<guests[0][2].length; i++){
			this.initSegment(guests);		
		}
		
		for(var i=0; i<this.segments[0].guests.length; i++){
			if(this.viewMode == "view" || this.segments[0].guests[i].isEditable == false){
				/*document.getElementById("assigmentGuestSeatField_"+(i+1)).disabled = true;*/
			}
		}

		this.segmentsViewCorrector.init(this.segments.length);			
		this.setCurrentSegment(0);	
		this.loadingPlane();		
	}
	,
	
	initSegment: function(guests){
		var index = this.segments.length;
		var newSeg = this.segments[index] = {};
		
		newSeg.index = index;
		newSeg.guests = [];
	
		for(var i=0; i<guests.length; i++){
			newSeg.guests[i] = {		
				name: guests[i][0],
				code: guests[i][1],
				isEditable: (guests[i][3])? true: false, 			
				defSeat: guests[i][2][index] || "",
				curSeat: guests[i][2][index] || "",	
				defSeatHtml: ""
			}			
		}

		newSeg.plane = {};
	}
	,
	
	segmentsViewCorrector: {
		oTbl: null,
		oPrevLegLink: null,
		oNextLegLink: null,
		oLegList: [],
		fVisSeg: 1,
		nVisSegs: 0,
		nMinVisSegs: 2,
		nSeg: 0,
		
		init: function(nSeg){
			var oArea = document.getElementById("idLegSegmentsArea");
			if(!oArea) return;
			this.oTbl = oArea.getElementsByTagName("TABLE")[0];
			if(this.oTbl.offsetWidth <= oArea.offsetWidth) return;
	
			this.nSeg = nSeg;
			
			if(nSeg>this.nMinVisSegs){
				this.oPrevLegLink = document.getElementById("idPrevLegLink").getElementsByTagName("A")[0];
				this.oPrevLegLink.className = "disabled";
				this.oPrevLegLink.onclick = function() {seatMapFramework.segmentsViewCorrector.prevLeg();return false};
				this.oNextLegLink = document.getElementById("idNextLegLink").getElementsByTagName("A")[0];		
				this.oNextLegLink.className = "";
				this.oNextLegLink.onclick = function() {seatMapFramework.segmentsViewCorrector.nextLeg();return false};			
			}
			
			for(i=0; i<nSeg; i++){
				this.oLegList[i] = [];
				for(k=0; k<this.oTbl.rows.length; k++){
					this.oLegList[i][k] = this.oTbl.rows[k].cells[i+1];
				}
			}
			
			for(var i=nSeg; i>this.nMinVisSegs; i--){
				if(this.oTbl.offsetWidth <= oArea.offsetWidth){
					break;
				}
				this.setColDisplay(i,false);
			}

			this.nVisSegs = i;
			
			if(this.oTbl.offsetWidth > oArea.offsetWidth){
				var oDivs = this.oTbl.getElementsByTagName("DIV");
				var tWidth = oArea.offsetWidth - (this.oTbl.offsetWidth - this.oTbl.rows[0].cells[0].offsetWidth) + "px";
				for(var i in oDivs){
					if(oDivs[i].className=="nameAreaWrap"){
						oDivs[i].style.width = tWidth;
						oDivs[i].style.overflow = "hidden";
					}
				}					
			}

		}
		,
		
		nextLeg: function(){
			this.oNextLegLink.blur();		
			if(this.fVisSeg + this.nVisSegs == this.nSeg+1){
				return false;
			}
			this.setColDisplay(this.fVisSeg, false);
			this.setColDisplay(this.fVisSeg+this.nVisSegs, true);				
			this.fVisSeg++;
			this.showArrow();			
		}
		,
		
		prevLeg: function(){
			this.oPrevLegLink.blur();					
			if(this.fVisSeg == 1){
				return false;
			}
			this.fVisSeg--;		
			this.setColDisplay(this.fVisSeg+this.nVisSegs, false);
			this.setColDisplay(this.fVisSeg, true);				
			this.showArrow();
		}
		,
		
		rollToActLeg: function(n){
			if(!this.nSeg || this.getColDisplay(n)){
				return;
			}
			this.fVisSeg = n;
			for(var i=1; i<n; i++){
				if(this.getColDisplay(i)){
					this.fVisSeg = n - this.nVisSegs + 1;
					break;
				}
			}

			for(var i=1; i<=this.nSeg; i++){
				var val = (i>=this.fVisSeg && i<=(this.fVisSeg+this.nVisSegs-1))? true : false;
				this.setColDisplay(i, val);
			}
			this.showArrow();			
		}		
		,
		
		setColDisplay: function(col, isShow) {
			for(i=0; i<this.oLegList[col-1].length; i++){
				this.oLegList[col-1][i].style.display = (isShow)? "" : "none";	
			}
		}
		,
		
		getColDisplay: function(col) {
			return (this.oLegList[col-1][0].style.display != "none")? true : false;
		}		
		,
		
		showArrow: function(){
			this.oPrevLegLink.className = (this.fVisSeg == 1)? "disabled" : "";
			this.oNextLegLink.className = (this.fVisSeg + this.nVisSegs == this.nSeg+1)? "disabled" : "";			
		}
	}
	,
	
	fillingPlane: function(segment, planeRows){
		segment.plane.rows = [];
		
		for(var i=0; i<planeRows.length; i++){
			segment.plane.rows[i] = {
				number: planeRows[i][0],
				attrs: planeRows[i][1],
				seats: []
			}
			for(var k=0; k<planeRows[i][2].length; k++){			
				segment.plane.rows[i].seats[k] = {
					letter: planeRows[i][2][k][0],
					status: planeRows[i][2][k][1],
					attrs: planeRows[i][2][k][2]
				}
			}		
		}
	}
	,
	
	drawPlane: function(segment, viewMode){
		var str = '<table class="seatMapInner"><tr><td>';
		str+= '<div class="planeNavigation"><table width="100%"><tr><td class="navFront"><a href="#" onclick="seatMapFramework.shiftPlaneFrame(\'left\');return false">&laquo; Front</a><span>&laquo; Front</span></td><td class="navRear"><a href="#" onclick="seatMapFramework.shiftPlaneFrame(\'right\');return false">Rear &raquo;</a><span>Rear &raquo;</span></td></tr></table></div>';
		str+= '<table class="planeView" id="planeViewTable">';
		tRows = segment.plane.rows;
		var boards = this.drawBoardsPlane(tRows);
		str+= boards[0];
		/* draw seats */
		for(var i=0; i<tRows[0].seats.length; i++){
			/* draw line of seats */
			str+= '<tr class="planeSeats' + ((i==0)?" firstPlaneRow":(i==tRows[0].seats.length-1)?" lastPlaneRow":"") + '">';
			/* draw left letter of row */	
			str+= '<td class="planeLeftSeatLetter"><div>' + tRows[0].seats[i].letter + '</div></td>';
			/* /draw left letter of row */					
			for(var k=0; k<tRows.length; k++){
				/* draw seat */
				
				var cellClass = "";
				var tRow = tRows[k];			
				var tSeat = tRow.seats[i];
				var tId = tRow.number + tSeat.letter;				
				var strSeat = (tId.length==2)? "0" + tId: "" + tId;
				
				if(this.testAttrs(tRows[k].attrs,[4])){
					/* Exit Seat */
					cellClass+= "exitSeat";
				}

				if(this.testAttrs(tSeat.attrs,[37,38,39,40,41,42,43,44,45,46,47,48],"or") || tSeat.status==3 || tSeat.status==16){ 
					/* Lavatory/Galley/Functional Space */
					tSeat.defaultHTML='<td class="funcSpace"><div></div></td>';
					str+=tSeat.defaultHTML;
					
				}else if(tSeat.status==6){
					/* Blocked Seat */
					tSeat.defaultHTML='<td class="' + cellClass + ' blockedSeat" title="'+strSeat+'"><div></div></td>';
					str+=tSeat.defaultHTML;
					
				} else if(tSeat.status==1 || tSeat.status==4 || tSeat.status==8 || tSeat.status==23){
					/* Available Seat */
					tSeat.defaultHTML='<td class="' + cellClass + ' availableSeat" id="plane_seat_' + tId + '" title="'+strSeat+'"><div>'+((viewMode!="view")?'<div><div onclick="seatMapFramework.clickOnSeat(\'' + tId + '\')"></div></div>':'')+'</div></td>';																			
					str+=tSeat.defaultHTML;						
				} else{
					/* Occupied Seat */
					tSeat.defaultHTML='<td class="' + cellClass + ' occupiedSeat" title="'+strSeat+'"><div></div></td>';
					str+=tSeat.defaultHTML;											
				}				
								
				/* /draw seat */				
			}
			/* draw left letter of row */	
			str+= '<td class="planeRightSeatLetter"><div>' + tRows[0].seats[i].letter + '</div></td>';
			/* /draw left letter of row */				
			str+= '</tr>';	
			/* /draw line of seats */		
		}	
		/* /draw seats */		
		str+= boards[1];		
		str+= '</table>';
		str+= '<div class="planeScroll"><table width="100%"><tr><td class="scrollFront"><a href="#" onclick="seatMapFramework.shiftPlaneFrame(\'left\');return false" title="Front"></a></td><td class="scrollPane"><div/></td><td class="scrollRear"><a href="#" onclick="seatMapFramework.shiftPlaneFrame(\'right\');return false" title="Rear"></a></td></tr></table></div>';
		str+= '</td></tr></table>';
		
		var placeHolder = document.getElementById(this.idSeatMapPlaceHolder);
		var placeHolderWidth = placeHolder.offsetWidth;
		
		placeHolder.style.width = placeHolderWidth + "px";
		placeHolder.style.overflow = "hidden";
		
		placeHolder.innerHTML = str;
		placeHolder.style.height = "auto";	/* fix for IE */
			
		var planeView = document.getElementById("planeViewTable");
		if (placeHolderWidth >= planeView.offsetWidth) {
			placeHolder.className += " planeFitsWidth";	
		}
		else {
			placeHolder.className = placeHolder.className.replace("planeFitsWidth","")	
		}
		
		placeHolder.style.height = "1px"; /* fix for IE */
		
		var planeViewCells = planeView.getElementsByTagName("TD");
		var numRows = planeView.getElementsByTagName("TR").length;
		var numCols = planeViewCells.length / numRows;
		var numColsToShow = Math.floor((placeHolderWidth - planeViewCells[0].offsetWidth - planeViewCells[numCols-1].offsetWidth) / (planeViewCells[1].offsetWidth));
		
		for (i = 0; i < numRows; i++) {
			for (j = numColsToShow+1; j < numCols-1; j++) {
				planeViewCells[i*numCols+j].style.display = "none";
			}
		}
		
		var loadingPlaceHolder = document.getElementById(this.idSeatMapLoadingPlaceHolder);
		loadingPlaceHolder.style.display = "none";		
		placeHolder.style.height = "auto";
	}
	,
	
	drawBoardsPlane: function(rows){
		var strTop = '<tr class="planeTopSeatNumbers"><td><div>&nbsp;</div></td>';
		var strBottom = '<tr class="planeBottomSeatNumbers"><td><div>&nbsp;</div></td>';

		var str = "";
		for(var i=0; i<rows.length; i++){
			var cellClass = "";
			if(this.testAttrs(rows[i].attrs,[4])){
				cellClass+= "exit";
			} 
			else if(this.testAttrs(rows[i].attrs,[13])){
				cellClass = "wing";
			}
			
			str+= '<td class="' + cellClass + '"><div>' + ((rows[i].number<10)? "0"+rows[i].number: rows[i].number)  + '</div></td>'	
		}		
		
		str+= '<td><div>&nbsp;</div></td></tr>';
		
		return [strTop+str,strBottom+str];
	}	
	,
	
	shiftPlaneFrame: function(type){
		var planeView = document.getElementById("planeViewTable");
		var planeViewCells = planeView.getElementsByTagName("TD");
		var numRows = planeView.getElementsByTagName("TR").length;
		var numCols = planeViewCells.length / numRows;
		var cellToShow, cellToHide, i;
		
		if (type == "left") {
			if (planeViewCells[1].style.display != "none") return;
		
			cellToShow = 1;
			while (planeViewCells[cellToShow+1].style.display == "none") {
				cellToShow++;	
			}
			
			cellToHide = cellToShow;
			while ((cellToHide < numCols-2) && (planeViewCells[cellToHide+1].style.display != "none")) {
				cellToHide++;	
			}
		}
		else {
			if (planeViewCells[numCols-2].style.display != "none") return;
		
			cellToHide = 1;
			while (planeViewCells[cellToHide].style.display == "none") {
				cellToHide++;	
			}
			
			cellToShow = cellToHide + 1;
			while (planeViewCells[cellToShow].style.display != "none") {
				cellToShow++;	
			}
		}
		
		for (i = 0; i < numRows; i++) {
			planeViewCells[i*numCols+cellToHide].style.display = "none";
		}
		
		for (i = 0; i < numRows; i++) {
			planeViewCells[i*numCols+cellToShow].style.display = "";
		}
	},
	
	setCurrentSegment: function(index){
		this.setActiveLeg(this.currentSegmentIndex,false);
		this.currentSegment = this.segments[index];
		this.currentSegmentIndex = index;
		this.setActiveLeg(index,true);
	}	
	,
	
	setActiveLeg: function(index,isAct){
		if (index < 0) return;
		var legSegment = document.getElementById("idLegSegment_"+index);
		var legSegmentInfo = document.getElementById("idLegSegmentInfo_"+index);		

		if (!legSegment) return;
		if (isAct) {
			legSegment.className += ' actLegArea';	
			legSegmentInfo.style.display = "block";
			this.segmentsViewCorrector.rollToActLeg(index+1);
		}
		else {
			legSegment.className = legSegment.className.replace('actLegArea','');
			legSegmentInfo.style.display = "none";
			this.setSeatFieldsView(this.currentSegmentIndex,"view");
		}
	},
	
	setSeatFieldsView: function(segIndex, status){
		var propReadOnly = false;
		var propCss = "";			
		switch (status){
			case "view":
				propReadOnly = true;
				break;
			case "edit":
				propCss = "actField";
				break;
			case "hidden":
				propCss = "hiddenField";			
				break;
		}
		
		var oSeg = document.getElementById("idLegSegment_"+segIndex);
		if(!oSeg) return;
		
		
		
		var guestsNumber = this.segments[0].guests.length;
		for (var i=0; i<guestsNumber; i++) {
			var tGuestField = document.getElementById("legSegment_"+segIndex+"_seatField_"+(i+1));
			tGuestField.readOnly = propReadOnly;	
			tGuestField.className = propCss;
		}	
	}
	,
	
	nextSegment: function(){	
		var tIndex = this.currentSegmentIndex + 1;
		if(tIndex == this.segments.length){
			tIndex = 0; 			
		}
		this.setCurrentSegment(tIndex);
		this.loadingPlane();
	}	
	,
	
	prevSegment: function(){
		var tIndex = this.currentSegmentIndex - 1;
		if(tIndex < 0){
			tIndex = this.segments.length-1; 			
		}
		this.setCurrentSegment(tIndex);
		this.loadingPlane();
	}	
	,
	
	directSegment: function(index){
		if(index != this.currentSegmentIndex){
			this.setCurrentSegment(index);
			this.loadingPlane();		
		}
	}
	,
	
	loadingPlane: function(){
		/* clearing segment error area */
		document.getElementById(this.idErrorsPlaceHolder).style.display = "none";
			
		var placeHolder = document.getElementById(this.idSeatMapPlaceHolder);	
		placeHolder.style.height = "1px";	
		var loadingPlaceHolder = document.getElementById(this.idSeatMapLoadingPlaceHolder);
		loadingPlaceHolder.style.display = "block";	
		
		popupFramework.refresh();		
		
		var cacheKey = "blabla" + this.currentSegmentIndex; // must be generated by Server Side	
		
		var ajaxConfigInfo = {url:"../ajax/seat_map_response"+(1+this.currentSegmentIndex)+".json",dataType:"json",options:{planeCacheKey:cacheKey,segIndex:this.currentSegmentIndex},method:"GET",success:function(data,config){seatMapFramework.callBackloadingPlane(data,config);}};		
		
		if(this.cache[cacheKey]) {
			ajaxConfigInfo.options.isPlaneCached = true;
			setTimeout(function(data,config,scope){ return function(){scope.callBackloadingPlane(data,config);} }(this.cache[cacheKey],ajaxConfigInfo,this),500);							
		}
		else {
			ajaxConfigInfo.options.isPlaneCached = false;
			/* AJAX request must be here */	
			ajax.request(ajaxConfigInfo);
		}

	}
	,
	
	callBackloadingPlane: function(data, config){
		this.cache[config.options.planeCacheKey] = data;
		
		if(this.currentSegmentIndex != config.options.segIndex){
			return;
		}
		
		var viewMode = this.viewMode;
		var errorMsgs = "";
		var fieldsViewStatus = "edit";
		if(data.errors){
			fieldsViewStatus = "hidden";
			var oErrorPlaceHolder = document.getElementById(this.idErrorsPlaceHolder);
			for(var i=0; i<data.errors.length; i++){
				switch (data.errors[i].code){
					case "FlightClosed":
						viewMode = "view";
					break;
					case "NoSeatMap":
					
					break;
				}	
				errorMsgs += data.errors[i].msg + "<br>";
			}	
			
			oErrorPlaceHolder.innerHTML = errorMsgs;
			oErrorPlaceHolder.style.display = "block";
			
		}			
		
		if (data.plane){
			this.fillingPlane(this.currentSegment, data.plane);
			this.drawPlane(this.currentSegment, viewMode);	
			this.setCurrentGuest(1);
			this.sitDownAllGuests();
		}
		else {
			var loadingPlaceHolder = document.getElementById(this.idSeatMapLoadingPlaceHolder);
			loadingPlaceHolder.style.display = "none";			
		}
	
		popupFramework.refresh();
		this.setSeatFieldsView(this.currentSegmentIndex, fieldsViewStatus);		
	
	}
	,
	
	sitDownAllGuests: function(){
		for(var g=0; g<this.currentSegment.guests.length; g++){
			var guest = this.currentSegment.guests[g];
			if(guest.curSeat != ""){
				if(this.isSeatAvailable((g+1),guest.curSeat)){
					var guestClass = (g+1 == this.currentGuestIndex)? "currentGuest": "guest";
					var cellSeat = document.getElementById("plane_seat_" + guest.curSeat);
					guest.defSeatHtml = cellSeat.innerHTML; 	
					cellSeat.innerHTML = '<div class="' + guestClass + '"><span>'+guest.name+'</span></div>';
				}
				else {
					guest.curSeat = "";
				}
			}
			document.getElementById("legSegment_" + this.currentSegmentIndex + "_seatField_" + (g+1)).value = (guest.curSeat.length==2)? "0"+guest.curSeat: ""+guest.curSeat;
		}
		
		this.setViewResetButton();		
		
		if(this.errors.isError){
			this.errors.show();
			this.errors.removeAll();
		}			
	}
	,
	
	getUpAllGuests: function(){
		for(var g=0; g<this.currentSegment.guests.length; g++){
			var guest = this.currentSegment.guests[g];
			if(guest.curSeat != ""){
				document.getElementById("plane_seat_" + guest.curSeat).innerHTML = guest.defSeatHtml;
			}			
		}	
	}	
	,
	
	clickOnSeat: function(seat){
		if(this.isSeatAvailable(this.currentGuestIndex,seat)){
			this.getUpAllGuests();
			this.currentGuest.curSeat = seat;
			this.setCurrentGuest(this.currentGuestIndex+1);
			this.sitDownAllGuests();				
		}
		else{
			this.errors.show();
			this.errors.removeAll();		
		}
	}
	,
	
	setCurrentGuest: function(index){
		for(var i=0; i<this.currentSegment.guests.length; i++,index++){
			if(index > this.currentSegment.guests.length){
				index = 1;
			}
			if(this.currentSegment.guests[index-1].isEditable){
				break;
			}
		}
		
		if(i < this.currentSegment.guests.length){
			this.currentGuestIndex = index;
			this.currentGuest = this.currentSegment.guests[index-1];
		}		
	}
	,
	
	setCurrentGuestSeat: function(index,leg){
		if (leg == this.currentSegmentIndex) {
			this.getUpAllGuests();
			this.setCurrentGuest(index);
			this.sitDownAllGuests();
		}
	}
	,
	
	enterGuestSeat: function(o,index,leg){
		if (leg == this.currentSegmentIndex) {
			this.getUpAllGuests();	
			var seat = trim(o.value).toUpperCase();
			if(seat){
				seat = parseInt(seat,10) + seat.substr(seat.length-1,1);	
				if(!this.isSeatAvailable(index,seat)){
					seat = this.currentSegment.guests[index-1].curSeat;
				}
				else{
				//	this.setCurrentGuest(index+1);
				}
			}
			else{
			//	this.setCurrentGuest(index+1);		
			}
		//	this.timerHandler = setTimeout(function(o){ return function(){seatMapFramework.timerHandler=null;o.focus();} }(document.getElementById("assigmentGuestSeatField_" + this.currentGuestIndex)),50);
			this.currentSegment.guests[index-1].curSeat = seat;
			this.sitDownAllGuests();
		}
	}
	,
	
	resetGuestSeat: function(index){
		this.getUpAllGuests();
		
		var tSeat = this.currentSegment.guests[index-1].defSeat;
		this.currentSegment.guests[index-1].curSeat = tSeat;
		
		if(tSeat && this.isSeatAvailable(index,tSeat)){
			for(var i=0; i<this.currentSegment.guests.length; i++){
				if(tSeat == this.currentSegment.guests[i].curSeat && index != i+1){
					this.currentSegment.guests[index-1].curSeat = "";
					break;
				}			
			}
		}
		else {
			this.errors.removeAll();			
			this.currentSegment.guests[index-1].curSeat = "";
		}

		this.currentSegment.guests[index-1].curSeat = "";
		this.setCurrentGuest(index+1);					
		this.sitDownAllGuests();			
	}
	,
	
	setViewResetButton: function(){
		var oButtonEnabled = document.getElementById("pgButtonClear");
		var oButtonDisabled = document.getElementById("pgButtonClearDisabled");		
		if(oButtonEnabled){
			var isSeatsChanged = false;
			var tGuests = this.currentSegment.guests;
			for(var i=0; i<tGuests.length; i++){
				if(tGuests[i].curSeat != tGuests[i].defSeat){
					isSeatsChanged = true;	
				}
			}		
			oButtonEnabled.style.display = (isSeatsChanged)? "" : "none";
			oButtonDisabled.style.display = (!isSeatsChanged)? "" : "none";			
		}
	}
	,
	
	resetAllGuestSeats: function(){
		this.getUpAllGuests();
		var tGuests = this.currentSegment.guests;
		for(var i=0; i<tGuests.length; i++){
			tGuests[i].curSeat = tGuests[i].defSeat;	
		}
		this.setCurrentGuest(1);					
		this.sitDownAllGuests();			
	}
	,
	
	isSeatAvailable: function (guestIndex,seat){
		var guest = this.currentSegment.guests[guestIndex-1];
		var letter = seat.substr(seat.length-1,1);				
		var number = parseInt(seat.substr(0,seat.length-1),10);

		var seatRow = null;
		var seatPlace = null;

		for(var i=0; i<this.currentSegment.plane.rows.length; i++){
			if(number == this.currentSegment.plane.rows[i].number){
				seatRow = this.currentSegment.plane.rows[i];
				break;
			}
		}
		
		if(!seatRow){
			this.errors.add(guestIndex,1);
			return false;
		}
		for(var k=0; k<seatRow.seats.length; k++){
			if(letter == seatRow.seats[k].letter){
				seatPlace = seatRow.seats[k];
			}
		}		
		if(!seatPlace){
			this.errors.add(guestIndex,1);
			return false;
		}		

		if(!(seatPlace.status==1 || seatPlace.status==4 || seatPlace.status==8 || seatPlace.status==23)){
			this.errors.add(guestIndex,2,seat);
			return false;
		}
		
		for(var g=0; g < this.currentSegment.guests.length; g++){
		
			if(seat == this.currentSegment.guests[g].curSeat && guestIndex != g+1){
				this.errors.add(guestIndex,2,seat);
				return false;			
			}
		}

		if(guest.code == "CNN" && this.testAttrs(seatRow.attrs,[4])){
			this.errors.add(guestIndex,3);		
			return false;
		}

		return true;
	}	
	,
	
	testAttrs: function(o,v,mask){
		mask=(mask)?mask:"and";
		for(var i=0; i<v.length; i++){
			var tr=0;		
			for(var j in o){
				if(o[j]==v[i]){ tr=1; break;}
			}
			if(mask=="or"){
				if(tr) return true;
			}
			else{
				if(!tr) return false;
			}	
		}
		if(mask=="or"){
			return false;
		}
		else{
			return true;
		}	
	}		
	
	
}