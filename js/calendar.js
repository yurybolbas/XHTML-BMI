var calendar = {
	idCalendar: "calendar",
	strConstants: {
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		days: ["S", "M", "T", "W", "T", "F", "S"]
	}
	,

	iDate: {day: 0, month: 0, year: 0}
	,
	
	cDate: {day: 23, month: 12, year: 2007}
	,

	availableDateInterval: {from:{day: 0, month: 0, year: 0}, to:{day: 0, month: 0, year: 0}}
	,
	
	validDateInterval: {from:{day: 0, month: 0, year: 0}, to:{day: 0, month: 0, year: 0}}
	,

	inputFunc: function(){},
	outFunc: function(){},
	sources: null,
	


	init: function(params) {
		var cbStack = [];
		cbStack[cbStack.length] = {handler:calendar.doInit,scope:calendar,params:[null,cbStack]}	
		popupFramework.create({id:this.idCalendar+this.viewType,templateName:'calendarType'+this.viewType,position:'relative'},cbStack)
	}
	,
	doInit: function(params,cbStack) {
		this.strConstants = popupFramework.popups[this.idCalendar].strConstants; 
		this.isInit = true;	
	}
	,
	
/*
params structure:
	sources: {} free format of property, data is processed by inputFunc and outFunc , example:{idTextField:'departDate',bookingBuffer:{start:1,end:330},offsets:{el:IdString, t:Number, l:Number}
	inputFunc: input function handler
	outFuncFunc: output function handler
	viewType: number. calendar view param. default: 1
*/	
	
	show: function(params) {
		if(params){
			if(params.sources){
				this.sources = params.sources;	
			}

			this.inputFunc = (params.inputFunc)? params.inputFunc : this.defaultInputFunc; 
			this.outFunc = (params.outFunc)? params.outFunc : this.defaultOutFunc;
			this.viewType = (params.viewType)? params.viewType : 1;
			this.offsets = (params.offsets)? params.offsets : null; 
		} 
		
		if(!document.getElementById(this.idCalendar+this.viewType)){
			this.init(params);
		}

		this.inputFunc(this.sources);
		
		
		switch(this.viewType){
			case 1:
				document.getElementById("cdrPanelLeftH3").innerHTML = this.strConstants.months[this.cDate.month] + ', ' + this.cDate.year;
				this.drawCurrentMonth('cdrPanelLeftMonth', this.cDate);
				var secDate = this.shiftMonth(this.cDate, 1);
				secDate.day = 0;
				document.getElementById("cdrPanelRightH3").innerHTML = this.strConstants.months[secDate.month] + ', ' + secDate.year;					
				this.drawCurrentMonth('cdrPanelRightMonth', secDate);				
				
				popupFramework.show({id:this.idCalendar+this.viewType,templateName:'calendarType'+this.viewType,position:'relative',size:{w:364},offsets:this.offsets});										
			break;
			
			case 2:
				var oControlMonth = document.getElementById("cdrControlMonth");
					oControlMonth.options.length = 0;
					for(var i=0; i<12; i++){
						oControlMonth.options[i] = new Option (this.strConstants.months[i], i, false, false);	
					}
					oControlMonth.options[this.cDate.month].selected=true;
					oControlMonth.onchange = function(){calendar.changeMonth(this.value)};
					
				var oControlYear = document.getElementById("cdrControlYear");
					oControlYear.options.length = 0;
					for(var i=this.availableDateInterval.from.year; i<=this.availableDateInterval.to.year; i++){
						oControlYear.options[oControlYear.length] = new Option (i, i, false, (i==this.cDate.year)?true:false);	
						if(i==this.cDate.year){ /* this branch is needed for fix bug under IE6 */
							oControlYear.options[oControlYear.length-1].selected = true;	
						}						
					}				
					oControlYear.onchange = function(){calendar.changeYear(this.value)};					
					
				this.drawCurrentMonth('cdrPanelMonth', this.cDate);
				popupFramework.show({id:this.idCalendar+this.viewType,templateName:'calendarType'+this.viewType,position:'relative',size:{w:177},offsets:this.offsets});														
			break;
		}
		
		return true;
	}	
	,
	
	refresh: function() {
		switch(this.viewType){
			case 1:
				document.getElementById("cdrPanelLeftH3").innerHTML = this.strConstants.months[this.cDate.month] + ', ' + this.cDate.year;
				this.drawCurrentMonth('cdrPanelLeftMonth', this.cDate);
		var secDate = this.shiftMonth(this.cDate, 1);
			secDate.day = 0;
				document.getElementById("cdrPanelRightH3").innerHTML = this.strConstants.months[secDate.month] + ', ' + secDate.year;					
				this.drawCurrentMonth('cdrPanelRightMonth', secDate);				
			break;
			
			case 2:
				this.drawCurrentMonth('cdrPanelMonth', this.cDate);
			break;
		}
	}	
	,
	
	hide: function(config) {
		popupFramework.hide(config);
	}	
	,	
	
	drawCurrentMonth: function(calendarContainer, date){
		var t = new Date();
		var tDate = {day: t.getDate(), month: t.getMonth(), year: t.getFullYear()};
		
		var tValidFirstDate = (this.validDateInterval.from.year)? new Date(this.validDateInterval.from.year,
																			this.validDateInterval.from.month,
																			this.validDateInterval.from.day) : null;
		var tValidLastDate = (this.validDateInterval.to.year)? new Date(this.validDateInterval.to.year,
																			this.validDateInterval.to.month,
																			this.validDateInterval.to.day) : null;
		
		var str='';
		
		str+='<table>'+
				'<tr>';
		for(var i=0; i<this.strConstants.days.length; i++){
			str+='<th '+((i==0)?'class="colFirst"':(i==this.strConstants.days.length-1)?'class="colLast"':"")+'>' + this.strConstants.days[i] + '</th>';
		} 
		str+='</tr>';
		
		var firstDay = this.getWeekDay(1, date.month, date.year);
			firstDay = (firstDay)?firstDay:7;
		var maxDay = this.getMaxDay(date.month, date.year)
		
		var col;
		var row = 0;
		
		str+='<tr>';
		var prevMonthDate = new Date((new Date(date.year,date.month,1)).getTime() - firstDay*24*60*60*1000);
		for(col=0; col<firstDay; col++){
			if((tValidFirstDate && tValidFirstDate.getTime() > prevMonthDate.getTime()) || (tValidLastDate && tValidLastDate.getTime() < prevMonthDate.getTime())){
				str+='<td class="past' + ((col==0)?' colFirst':(col==6)?' colLast':'') + '"><span>' + prevMonthDate.getDate() + '</span></td>';	
			}
			else{		 
				str+='<td' + ((col==0)?' class="colFirst"':(col==6)?' class="colLast"':'') + '><span>' + prevMonthDate.getDate() + '</span></td>';	
			}	
			prevMonthDate = new Date(prevMonthDate.getTime() + 24*60*60*1000);
			if (col == 6){
				col = 0;
				row++;
				str+='</tr>' + ((row<6)?'<tr' + ((row==5)?' class="rowLast"':'') + '>':'');
				break;
			}						
		}
		
		for(var i=0; i<maxDay; i++){
			var dayCss = "";	
			var tFormattedDate = new Date(date.year,date.month,(i+1));
			
			if((tValidFirstDate && tValidFirstDate.getTime() > tFormattedDate.getTime()) || (tValidLastDate && tValidLastDate.getTime() < tFormattedDate.getTime())){
				str+='<td class="past' + ((col==0)?' colFirst':(col==6)?' colLast':'') + '"><span>' + (i+1) + '</span></td>';	
			}
			else{	
				if(this.iDate.day == (i+1) && this.iDate.month == date.month && this.iDate.year == date.year){
					dayCss+=' selected';
				} 
				else if(tDate.day == (i+1) && tDate.month == date.month && tDate.year == date.year){
					dayCss+=' current';				
				} 			
				dayCss+=((col==0)?' colFirst':(col==6)?' colLast':'');
				str+='<td' + ((dayCss!="")?' class="' + dayCss + '"':'') + '><a href="#" onclick="calendar.setDay({year:'+date.year+',month:'+date.month+',day:'+(i+1)+'});return false">' + (i+1) + '</a></td>';					
			}	
			
			if (++col == 7){
				col = 0;
				row++;
				str+='</tr>' + ((row<6)?'<tr' + ((row==5)?' class="rowLast"':'') + '>':'');
			}
		}		
		
		var nextMonthDate = new Date((new Date(date.year,date.month,maxDay)).getTime() + 24*60*60*1000);
		for(; row<6;){
			if((tValidFirstDate && tValidFirstDate.getTime() > nextMonthDate.getTime()) || (tValidLastDate && tValidLastDate.getTime() < nextMonthDate.getTime())){
				str+='<td class="past' + ((col==0)?' colFirst':(col==6)?' colLast':'') + '"><span>' + nextMonthDate.getDate() + '</span></td>';	
			}
			else{		 
				str+='<td' + ((col==0)?' class="colFirst"':(col==6)?' class="colLast"':'') + '><span>' + nextMonthDate.getDate() + '</span></td>';	
			}	
			nextMonthDate = new Date(nextMonthDate.getTime() + 24*60*60*1000);
			
			if (++col == 7){
				col = 0;
				row++;
				str+='</tr>' + ((row<6)?'<tr' + ((row==5)?' class="rowLast"':'') + '>':'');
			}							
		}		
		
		str+=''+		
			'</table>';		
			
		document.getElementById(calendarContainer).innerHTML = str;
				
	}
	,
	
	setDay: function(date){
		this.cDate = date;
		this.outFunc(this.sources,this.cDate);
		this.hide({id:this.idCalendar+this.viewType});
	}
	,
	
	shiftMonth: function(date, nMonth){
		var daysInMon = [31,28,31,30,31,30,31,31,30,31,30,31];
		var dd = date.day;
		var mm = date.month + nMonth;
		var yy = date.year;
		if (mm > 11) {
			mm = mm - 12; 
			yy = yy + 1;
		}
		if (mm < 0) {
			mm = mm + 12; 
			yy = yy - 1;
		}
		daysInMon[1] = (yy % 4 == 0) ? 29 : 28;
		if (daysInMon[mm] < dd) dd = daysInMon[mm];
		
		return {day:dd,month:mm,year:yy};
	}
	,
	
	prevMonth: function(){
		this.cDate = this.shiftMonth(this.cDate,-1);
		this.refresh();	
	}	
	,
	
	nextMonth: function(){
		this.cDate = this.shiftMonth(this.cDate,1);	
		this.refresh();		
	}	
	,
	
	changeMonth: function(value){
		this.cDate.month = value;	
		this.refresh();		
	}	
	,	
	
	changeYear: function(value){
		this.cDate.year = value;	
		this.refresh();		
	}	
	,	
	
	getMaxDay: function(month,year){
		var d = new Date (year,1+parseInt(month,10),0);
		return d.getDate();
	}
	,
	
	getWeekDay: function(day,month,year){
		var d = new Date (year,month,day);
		return d.getDay();
	}
	,
	
	textFieldBlocker: function(idTextField) {
		document.getElementById(idTextField).onkeydown = function (e) {
			var evt = (window.event) ? window.event : e;
			if (evt.keyCode != 9) return false;
		}
	},
		
	defaultInputFunc: function(sources) {
		//this.textFieldBlocker(sources.idTextField);
		this.availableDateInterval = {from:{day: 0, month: 0, year: 0}, to:{day: 0, month: 0, year: 0}};
		this.validDateInterval = {from:{day: 0, month: 0, year: 0}, to:{day: 0, month: 0, year: 0}}	
	
		if(!this.offsets){
			this.offsets = {el:sources.idTextField, t:19, l:-265};
		}		
		
		var tDate = document.getElementById(sources.idTextField).value;	
		var defaultDate = new Date();
		
		var day = 0;
		var month = defaultDate.getMonth();
		var year = defaultDate.getFullYear();
		
		tDate = parseDate(tDate,sources.extraDate);
		
		if(tDate){
			day = tDate.day;
			month = tDate.month;	
			year = tDate.year;			
		
		}		
		
		with(this){		
			iDate.day = cDate.day = day;
			iDate.month = cDate.month = month;
			iDate.year = cDate.year = year;
		}		
	}
	,
	
	defaultOutFunc: function(sources,date) {		
		var returnValue;
		
		returnValue = formatDate(date);
		var oTextField = document.getElementById(sources.idTextField);
			oTextField.value = returnValue;
		if(sources.systemFields){
			document.getElementById(sources.systemFields.d).value = date.day;		
			document.getElementById(sources.systemFields.m).value = 1+date.month;		
			document.getElementById(sources.systemFields.y).value = date.year;								
		}
		if(oTextField.onchange){
			oTextField.onchange();
  		}
	}
	,
	
	setSelectValue: function(s,v) { 
		oS = document.getElementById(s);
		for (var i=0; i<oS.length; i++) {
			if(oS.options[i].value == v){
				oS.options[i].selected = true;
				return true;
			}
		}
		return false;	
	}
}	


/* extended functions for calendar */
/*
function calendarDepartureInputFunc (sources) {
	var today = new Date();
	var bookingBuffer = (sources.bookingBuffer) ? sources.bookingBuffer : 0;
	tFirstAvailDate = new Date(today.getTime() + bookingBuffer*24*60*60*1000);
	tLastAvailDate = new Date(today.getTime() + 330*24*60*60*1000);
	
	this.availableDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};
	this.validDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};

	var day = Ext.get(sources.idDaysField).getValue();	
	var month = 0;
	var year = 0;
	var dt = Date.parseDate(Ext.get(sources.idMonthYearField).getValue(), Date.patterns.MonthYear);
	if(dt) {
		month = dt.getMonth();
		year = dt.getFullYear();
		day = (dt.getDaysInMonth()<day) ? dt.getDaysInMonth() : day;					
	}		
	
	with(this){		
		iDate.day = cDate.day = day;
		iDate.month = cDate.month = month;
		iDate.year = cDate.year = year;
	}	
}
*/

function calendarOutboundInputFunc (sources) {
	//this.textFieldBlocker(sources.idTextField);
	var today = new Date();
	
	var bookingBuffer = {start:0,end:330};
	if(sources.bookingBuffer){
		bookingBuffer.start = (sources.bookingBuffer.start) ? sources.bookingBuffer.start :	bookingBuffer.start;		
		bookingBuffer.end = (sources.bookingBuffer.end) ? sources.bookingBuffer.end : bookingBuffer.end;				
	}
	tFirstAvailDate = new Date(today.getTime() + bookingBuffer.start*24*60*60*1000);
	tLastAvailDate = new Date(today.getTime() + bookingBuffer.end*24*60*60*1000);	
	
	this.availableDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};
	this.validDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};
	
	if(!this.offsets){
		this.offsets = {el:sources.idTextField, t:19, l:-265};
	}		
	
	var tDate = document.getElementById(sources.idTextField).value;	
	var defaultDate = new Date();
	
	var day = 0;
	var month = defaultDate.getMonth();
	var year = defaultDate.getFullYear();
	
	tDate = parseDate(tDate);
	
	if(tDate){
		day = tDate.day;
		month = tDate.month;	
		year = tDate.year;			
	
	}
	
	with(this){		
		iDate.day = cDate.day = day;
		iDate.month = cDate.month = month;
		iDate.year = cDate.year = year;
	}	
}


function calendarInboundInputFunc (sources) {
	//this.textFieldBlocker(sources.idTextField);
	var today = new Date();
	
	var bookingBuffer = {start:0,end:330};
	if(sources.bookingBuffer){
		bookingBuffer.start = (sources.bookingBuffer.start) ? sources.bookingBuffer.start :	bookingBuffer.start;		
		bookingBuffer.end = (sources.bookingBuffer.end) ? sources.bookingBuffer.end : bookingBuffer.end;				
	}
	tFirstAvailDate = new Date(today.getTime() + bookingBuffer.start*24*60*60*1000);
	tLastAvailDate = new Date(today.getTime() + bookingBuffer.end*24*60*60*1000);
	
	var extraDateValue = document.getElementById(sources.idExtraTextField).value;
	if(extraDateValue){
		tFirstAvailDate = dateFormatSettings.parseDate(extraDateValue)
	}

	this.availableDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};
	this.validDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};

	if(!this.offsets){
		this.offsets = {el:sources.idTextField, t:19, l:-265};
	}		
	
	
	var tDate = document.getElementById(sources.idTextField).value;	
	var defaultDate = tFirstAvailDate;
	
	var day = 0;
	var month = defaultDate.getMonth();
	var year = defaultDate.getFullYear();
	
	tDate = parseDate(tDate);
	
	if(tDate){
		day = tDate.day;
		month = tDate.month;	
		year = tDate.year;			
	
	}
	
	with(this){		
		iDate.day = cDate.day = day;
		iDate.month = cDate.month = month;
		iDate.year = cDate.year = year;
	}	
}

function calendarDOBInputFunc (sources) {
	var today = new Date();
	
			
	var oSourceDay = document.getElementById(sources.idsDateField.d);
	var oSourceMonth = document.getElementById(sources.idsDateField.m);
	var oSourceYear = document.getElementById(sources.idsDateField.y);	
	
	if(!this.offsets){
		this.offsets = {el:sources.idsDateField.y, t:19, l:-156+parseInt(oSourceYear.offsetWidth,10)};
	}
		
	tFirstAvailDate = new Date(oSourceYear.options[1].value,0,1);
	tLastAvailDate = new Date(today.getTime());

	this.availableDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};
	this.validDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};
	
	var day = oSourceDay.options[oSourceDay.selectedIndex].value;
		day = (day != "") ? day : 0;
	var month = oSourceMonth.options[oSourceMonth.selectedIndex].value;
		month = (month != "") ? (month-1) : today.getMonth();	
	var year = oSourceYear.options[oSourceYear.selectedIndex].value;
		year = (year != "") ? year: today.getFullYear();		
			
	with(this){		
		iDate.day = cDate.day = day;
		iDate.month = cDate.month = month;
		iDate.year = cDate.year = year;
	}	
}

function calendarDOBOutFunc (sources,date) {
		this.setSelectValue(sources.idsDateField.d, date.day);
		this.setSelectValue(sources.idsDateField.m, 1+date.month);		
		this.setSelectValue(sources.idsDateField.y, date.year);								
}


/*function calendarHotelCheckInInputFunc (sources) {
	var today = new Date();
	var bookingBuffer = (sources.bookingBuffer) ? sources.bookingBuffer : 0;
	var tFirstAvailDate = today.add(Date.DAY, bookingBuffer);
	var tLastAvailDate = today.add(Date.MONTH, 11);
	var availTimeFrame = (sources.availTimeFrame) ? sources.availTimeFrame : null;	
	if(availTimeFrame){
		tLastAvailDate = today;
		for(var i in availTimeFrame){			
			switch(i){
				case "days":
					tLastAvailDate = tLastAvailDate.add(Date.DAY, availTimeFrame[i]);
					break;
				case "months":
					tLastAvailDate = tLastAvailDate.add(Date.MONTH, availTimeFrame[i]);
					break;
			}
		}
	}
	
	this.availableDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};
	this.validDateInterval = {from:{day: tFirstAvailDate.getDate(), month: tFirstAvailDate.getMonth(), year: tFirstAvailDate.getFullYear()}, to:{day: tLastAvailDate.getDate(), month: tLastAvailDate.getMonth(), year: tLastAvailDate.getFullYear()}};

	var day = Ext.get(sources.idDaysField).getValue();	
	var month = 0;
	var year = 0;
	var dt = Date.parseDate(Ext.get(sources.idMonthYearField).getValue(), Date.patterns.MonthYear);
	if(dt) {
		month = dt.getMonth();
		year = dt.getFullYear();	
		day = (dt.getDaysInMonth()<day) ? dt.getDaysInMonth() : day;				
	}		
	
	with(this){		
		iDate.day = cDate.day = day;
		iDate.month = cDate.month = month;
		iDate.year = cDate.year = year;
	}	
}*/

	
	
//////////////////////////////////////////////////////////////////////////////
//
// OLD CALENDAR FUNCS
//
//////////////////////////////////////////////////////////////////////////////

function showCalendarToNow(path, idMonthElement, idDayElement, idYearElement, fromYear)
{
	return showCalendar(path, idMonthElement, idDayElement, idYearElement, 'ToNow', fromYear);
}


function showCalendarFromNow(path, idMonthElement, idDayElement, idYearElement, days)
{
	return showCalendar(path, idMonthElement, idDayElement, idYearElement, 'FromNow', days);
}


function showCalendar(path, idMonthElement, idDayElement, idYearElement, type, value)
{
	var calendarDialog,
		month,
		day,
		year,
		arrDate;

	var args = new Object();

	month = getCalendarMonth (idMonthElement);
	day   = getCalendarDay   (idDayElement);
	year  = getCalendarYear  (idYearElement);

	args.month = month;
	args.day   = day;
	args.year  = year;
	args.idMonthElement = idMonthElement;
	args.idDayElement   = idDayElement;
	args.idYearElement  = idYearElement;
	args.type  = type;
	args.value = value;

	window.variables = args;
	window.variables.popup = openWindow ('calendarControlElement', path + 'calendar.html', 200, 200, 'resizable=no,status=no,scrollbars=no,');

	return null;
}


//////////////////////////////////////////////////////////////////////////////
//
// Check values
//
//////////////////////////////////////////////////////////////////////////////

function checkDay(d)
{
	d = parseInt(d, 10);
	if (d < 1) d = 1;
	if (d > 31) d = 31;
	return d;
}

function checkMonth(m)
{
	m = parseInt(m, 10);
	if (m < 1) m = 1;
	if (m > 12) m = 12;
	return m;
}

function checkYear(y)
{
	y = parseInt(y, 10);
	if (y < 60) y = y + 2000;
	if (y < 100) y = y + 1900;
	if (y < 1960) y = 1960;
	if (y > 2100) y = 2100;

	return y;
}

//////////////////////////////////////////////////////////////////////////////
//
// 
//
//////////////////////////////////////////////////////////////////////////////

function getCalendarYear(idElement)
{
	var fieldValue = '';
	var Today = new Date();

	if (idElement != null)
	{
		fieldValue = getElementValue(idElement);
	}

	if (fieldValue == '')
	{
		fieldValue = Today.getFullYear();
	}

	return checkYear(fieldValue);
}

function setCalendarYear(element, fieldValue)
{
	if (element != null)
	{
		fieldValue = setElementValue(element, fieldValue);
		return true;
	}

	return false;
}

function getCalendarMonth(idElement)
{
	var fieldValue = '';
	var Today = new Date();
	if (idElement != null)
	{
		fieldValue = getElementValue(idElement);
	}
	if (fieldValue == '')
	{
		fieldValue = Today.getMonth();
	}
	fieldValue++;
	return checkMonth(fieldValue);
}

function setCalendarMonth(element, fieldValue)
{
	if (element != null)
	{
		fieldValue = setElementValue(element, fieldValue);
		return true;
	}
	return false;
}

function getCalendarDay(idElement)
{
	var fieldValue = '';
	var Today = new Date();
	if (idElement != null)
	{
		fieldValue = getElementValue(idElement);
	}

	if (fieldValue == '')
	{
		fieldValue = Today.getDate();
	}
	return checkDay(fieldValue);
}

function setCalendarDay(element, fieldValue)
{
	if (element != null)
	{
		fieldValue = setElementValue(element, fieldValue);

		return true;
	}

	return false;
}

function correctionDate(idMonthElement, idDayElement, idYearElement,extParam){
	var extParam=(extParam)?extParam:0;

	var month = getElementValue(idMonthElement);
	var day = getElementValue(idDayElement);	
	var year = getElementValue(idYearElement);
	var maxDays = '';
	var oDayElement = document.getElementById(idDayElement);
	var Today = new Date();
	
	if(!extParam){
	year = (Today.getMonth() < month || (Today.getMonth() == month && Today.getDate() <= day))? Today.getFullYear(): Today.getFullYear()+1;
	setElementValue(idYearElement, year);
	}
	
	maxDays = getDaysInMonth(parseInt(month)+1, year);
	if (oDayElement != null) {
	var lenDayElement =	oDayElement.options.length;
	if(maxDays < lenDayElement){
		var setLast=0;
		for(var i=lenDayElement-1; i>=maxDays; i--){
			if(oDayElement.options[i].selected==true){
				setLast = 1;
			}	
		}
		var index = oDayElement.selectedIndex;
		oDayElement.options.length = 0;
		oDayElement.options.length = maxDays;
		for(var i=0; i<maxDays; i++){
			oDayElement.options[i] = new Option (i+1, i+1, false, false);
		}
		if(setLast){
			oDayElement.options[maxDays-1].selected=true;
		} else {
			oDayElement.options[index].selected=true;
		}
			
	}else {
		if (maxDays > lenDayElement) {
			oDayElement.options.length = maxDays;
			for(var i=lenDayElement; i<maxDays; i++){
				oDayElement.options[i] = new Option (i+1, i+1, false, false);
			}
			oDayElement.options[oDayElement.selectedIndex].selected=true;			
		}
	}
}
}

function correctionReturnDate(m1,d1,y1,m2,d2,y2){
	var date1 = new Date(getElementValue(y1),getElementValue(m1),getElementValue(d1));
	var date2 = new Date(getElementValue(y2),getElementValue(m2),getElementValue(d2));
	if(date1.getTime() > date2.getTime()){
		var today= new Date();
		var dateOffset=1;
		if(date1.getTime() >= today.getTime() + 331*(60*60*24*1000)){
			dateOffset=0;
		}
		date2 = new Date(date1.getTime() + dateOffset*(60*60*24*1000) + 5*60*60*1000);  // plus 5 hours - bug with summer/winter time (oct 30)
		setElementValue(y2,date2.getFullYear());
		setElementValue(m2,date2.getMonth());				
		correctionDate(m2,d2,y2);	
		setElementValue(d2,date2.getDate());		
	}	
}