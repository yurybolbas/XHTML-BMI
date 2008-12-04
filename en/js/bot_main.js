var typeBot=0;

function drawHomeBot(){
	var str="";
if(enableBot){	
		str=''+
			'<!-- bot tabs -->'+
			'<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
				'<tr>'+
					'<td class="t-act">'+
						'<div><img src="../pictures/misc/spacer.gif" width="1" height="1" alt="" /></div></td>'+
					'<td></td>'+
					'<td></td>'+
				'</tr>'+
				'<tr class="m-tabs">'+
					'<td class="m-act m-act-main" nowrap="nowrap"><img src="../pictures/icons/tabs/i_plane_a.gif" width="21" height="17" alt="" />Flights&nbsp; </td>'+
					'<td nowrap="nowrap">'+
						'<a href="../en/pages-hotel/1 Hotel Search.html"><img src="../pictures/icons/tabs/i_hotel.gif" alt="" width="21" height="17" border="0" />Hotels &nbsp;</a></td>'+
					'<td nowrap="nowrap">'+
						'<a href="../en/pages-package/1 Search Page (FH_SRH).html"><img src="../pictures/icons/tabs/i_packages.gif" alt="" width="18" height="17" border="0" />Packages &nbsp;</a></td>'+
					'<td width="100%">&nbsp;</td>'+
				'</tr>'+
			'</table>'+
			'<!-- /bot tabs -->'+
			'<!-- bot -->'+
			'<form name="AirAvailabilitySearchForm" method="post" action="http://datalextdp.epam.com/matrixtdp/InterstitialScreen.do">'+
				'<div class="bot-cont bot-cont-main">'+
					'<div style="width:1px;height:5px"><span></span></div>'+
					'<table cellspacing="0" cellpadding="0" border="0">'+
						'<tr>'+
							'<td width="16">' + drawBotControl(tripType,'','class="radio" onclick="changeTripType(this.value,0)"',0) + '</td>'+
							'<td class="desc-f" style="padding:0">'+
								'<label for="'+tripType.name+'0" onclick="document.getElementById(this.htmlFor).click()">Round Trip</label> &nbsp; &nbsp; </td>'+
							'<td width="16">' + drawBotControl(tripType,'','class="radio" onclick="changeTripType(this.value,0)"',1) + '</td>'+
							'<td class="desc-f" style="padding:0">'+
								'<label for="'+tripType.name+'1" onclick="document.getElementById(this.htmlFor).click()">One Way</label> &nbsp; &nbsp; </td>';
	if(enableMultiLegSearch){
		str+=''+
					'<td align="right">'+
						'<a href="../../en/pages-old/Booking - 1. Search Page MD (FMC).html" class="lnk1">Multi City</a></td>'+
				'</tr>';
	}
	
	str+=''+
					'</table>'+
					'<div class="bot-line"><span></span></div>';	
	if(formType.items.length >1){				
		str+=''+									
					'<table cellspacing="0" cellpadding="0" border="0">'+
						'<tr>'+
							'<td width="16">' + drawBotControl(formType,'','class="radio" onclick="changeFormType(this.value,0)"',0) + '</td>'+						
							'<td>'+
								'<label for="'+formType.name+'0" onclick="document.getElementById(this.htmlFor).click()">Choose location</label> &nbsp; &nbsp; </td>'+
							'<td width="16">' + drawBotControl(formType,'','class="radio" onclick="changeFormType(this.value,0)"',1) + '</td>'+	
							'<td>'+
								'<label for="'+formType.name+'1" onclick="document.getElementById(this.htmlFor).click()">Enter location</label></td>'+
						'</tr>'+
					'</table>';
	}
	else{
		str+= drawBotControl(formType,'hidden','')		
	}				
					
	str+=''+					
					'<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
						'<tr>'+
							'<td width="50%" valign="top">'+
								'<div class="desc-f">* Origin:</div>'+
							'</td>'+
							'<td>'+
								'<div style="width:10px"><span></span></div></td>'+
							'<td width="50%" valign="top">'+
								'<div class="desc-f">* Destination:</div>'+
							'</td>'+
						'</tr>'+					
						'<tr id="IdFieldsFormType0" ' + ((formType.value==1)? 'style="display:none"': '') + '>'+
							'<td width="50%" valign="top" height="22">'+
								'<table width="100%" cellspacing="0" cellpadding="0" border="0" class="TableFixed"><tr><td>'+
								'' + drawBotControl(origin[0],'','class="bot-inp maxWidth"') + ''+
								'</td></tr></table>'+
							'</td>'+
							'<td>'+
								'<div style="width:10px"><span></span></div></td>'+
							'<td width="50%" valign="top">'+
								'<table width="100%" cellspacing="0" cellpadding="0" border="0" class="TableFixed"><tr><td>'+
								'' + drawBotControl(destination[0],'','class="bot-inp maxWidth"') + ''+
								'</td></tr></table>'+
							'</td>'+
						'</tr>'+
						'<tr id="IdFieldsFormType1" ' + ((formType.value==0)? 'style="display:none"': '') + '>'+
							'<td width="50%" valign="top" height="22">'+
								'<table width="100%" cellspacing="0" cellpadding="0" border="0" class="TableFixed"><tr><td>'+
								'' + drawBotControl(fakeOrigin[0],'','class="bot-inp maxWidth"') + drawBotControl(origin[1],'','') + drawBotControl(fakeOrigin[1],'','') + ''+
								'</td></tr></table>'+
							'</td>'+
							'<td>'+
								'<div style="width:10px"><span></span></div></td>'+
							'<td width="50%" valign="top">'+
								'<table width="100%" cellspacing="0" cellpadding="0" border="0" class="TableFixed"><tr><td>'+
								'' + drawBotControl(fakeDestination[0],'','class="bot-inp maxWidth"') + drawBotControl(destination[1],'','') + drawBotControl(fakeDestination[1],'','') + ''+
								'</td></tr></table>'+
							'</td>'+
						'</tr>'+						
						'<tr>'+
							'<td width="50%" valign="top">'+
								'<!-- Departing line -->'+
								'<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
									'<tr>'+
										'<td>'+
											'<table cellspacing="0" cellpadding="0" border="0">'+
												'<tr>'+
													'<td colspan="4" class="desc-f">* Departing On:</td>'+
												'</tr>'+
												'<tr>';
	if(dateType==2){	
		str+=''+
													'<td class="pad1">'+
													'' + drawBotControl(departDate[0],'','class="bot-inp" style="width:90px"') + ''+
													'' + drawBotControl(departMonth[0],'hidden','') + ''+
													'' + drawBotControl(departDay[0],'hidden',' onchange="fillDateEdit(\''+departDate[0].name+'\',\''+departMonth[0].name+'\',\''+departDay[0].name+'\',\''+departYear[0].name+'\',\''+dateFormat+'\')"') + ''+
													'' + drawBotControl(departYear[0],'hidden','') + ''+
													'</td>'+
													'<td colspan="3">' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>'+
			'';
	}
	else{
		var strMonth = drawBotControl(departMonth[0],'','class="bot-inp"');
		var strDay = drawBotControl(departDay[0],'','class="bot-inp"');
		var dateControl1='';
		var dateControl2='';		
		
		if(dateFormat==0){
			dateControl1=strMonth;
			dateControl2=strDay;			
		}else{
			dateControl1=strDay;
			dateControl2=strMonth;			
		}		
		str+=''+
													'<td class="pad1">' + dateControl1 + '</td>'+
													'<td class="pad1">' + dateControl2 + '</td>'+
													'<td class="pad1">' + drawBotControl(departYear[0],'','class="bot-inp"') + '</td>'+													
													'<td>' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>'+
		'';
	}			
								
	str+=''+
												'</tr>'+
											'</table></td>'+
										'<td width="100%" align="right">'+
											'<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
												'<tr>'+
													'<td class="desc-f">* Time:</td>'+
												'</tr>'+
												'<tr>'+
													'<td>'+
													'' + drawBotControl(departTime[0],'','class="bot-inp maxWidth"') + ''+
													'</td>'+
												'</tr>'+
											'</table></td>'+
									'</tr>'+
								'</table>'+
								'<!-- /Departing line -->'+
							'</td>'+
							'<td>'+
								'<div style="width:10px"><span></span></div></td>'+
							'<td width="50%" valign="top">'+
								'<!-- Returning line -->'+
								'<div id="idReturnTimeBlock">'+
								'<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
									'<tr>'+
										'<td>'+
											'<table cellspacing="0" cellpadding="0" border="0">'+
												'<tr>'+
													'<td colspan="4" class="desc-f">* Returning On:</td>'+
												'</tr>'+
												'<tr>';
	if(dateType==2){												
		str+=''+
													'<td class="pad1">'+
													'' + drawBotControl(departDate[1],'','class="bot-inp" style="width:90px"') + ''+
													'' + drawBotControl(departMonth[1],'hidden','') + ''+
													'' + drawBotControl(departDay[1],'hidden',' onchange="fillDateEdit(\''+departDate[1].name+'\',\''+departMonth[1].name+'\',\''+departDay[1].name+'\',\''+departYear[1].name+'\',\''+dateFormat+'\')"') + ''+
													'' + drawBotControl(departYear[1],'hidden','') + ''+													
													'</td>'+
													'<td colspan="3">' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>'+
			'';
	}
	else{
		var strMonth = drawBotControl(departMonth[1],'','class="bot-inp"');
		var strDay = drawBotControl(departDay[1],'','class="bot-inp"');
		var dateControl1='';
		var dateControl2='';		
		
		if(dateFormat==0){
			dateControl1=strMonth;
			dateControl2=strDay;			
		}else{
			dateControl1=strDay;
			dateControl2=strMonth;			
		}		
		str+=''+
													'<td class="pad1">' + dateControl1 + '</td>'+
													'<td class="pad1">' + dateControl2 + '</td>'+
													'<td class="pad1">' + drawBotControl(departYear[1],'','class="bot-inp"') + '</td>'+		
													'<td>' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>'+
		'';
	}			
								
	str+=''+
												'</tr>'+
											'</table></td>'+
										'<td width="100%" align="right">'+
											'<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
												'<tr>'+
													'<td class="desc-f">* Time:</td>'+
												'</tr>'+
												'<tr>'+
													'<td>'+
													'' + drawBotControl(departTime[1],'','class="bot-inp maxWidth"') + ''+
													'</td>'+
												'</tr>'+
											'</table></td>'+
									'</tr>'+
								'</table>'+
								'</div>'+
								'<!-- /Returning line -->'+
							'</td>'+
						'</tr>'+								
						'</table>';		
						
								
  /* added for TDP1.2+ begin */	
  
  	if(flexibleDatesType.present){
		str+=''+								
						'<div class="bot-pad3">'+
							'<table border="0" cellspacing="0" cellpadding="0">'+
								'<tr>'+
									'<td width="16">' + drawBotControl(flexibleDatesType,'','class="radio" onclick="void(0)"',0) + '</td>'+
									'<td><label  for="'+flexibleDatesType.name+'0" onclick="document.getElementById(this.htmlFor).click()">My Travel Dates are Flexible	</label> &nbsp; &nbsp; </td>'+
									'<td width="16">' + drawBotControl(flexibleDatesType,'','class="radio" onclick="void(0)"',1) + '</td>'+
									'<td><label  for="'+flexibleDatesType.name+'1" onclick="document.getElementById(this.htmlFor).click()">I must travel on these dates</label></td>'+
								'</tr>'+
							'</table>'+
						'</div>';
	}
	else{
		str+=drawBotControl(flexibleDatesType,'','');	
	}						
  /* added for TDP1.2+ end */													
							
	str+=''+					
					'<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
						'<tr>'+
							'<td width="50%" valign="top">'+
								'<div class="bot-pad2">&nbsp;</div>';
								
	if(classOfTravel.present){
		str+=''+
								'<div class="desc-f">* Cabin Class:</div>'+
								'<div>'+
								'' + drawBotControl(classOfTravel,'','class="bot-inp"') + ''+
								'</div>';
	}
	else{
		str+='<div class="desc-f">&nbsp</div> ' + drawBotControl(classOfTravel,'','');
	}
	
	if(directFlights.present){
		str+=''+
								'<div style="padding-top:4px">'+
								'' + drawBotControl(directFlights,'','') + '&nbsp;<label for="'+directFlights.name+'">Direct Flights Only</label></div>';
	}
	else{
		str+=drawBotControl(directFlights,'','');
	}	
	str+=''+
							'</td>'+
							'<td>'+
								'<div style="width:10px"><span></span></div></td>'+
							'<td width="50%" valign="top">'+
								'<div class="desc-f">* Passengers:</div>';
								
	var arrPsngrTitles=["Adults:","Seniors (62+):","Youth (12-17):","Children (2-11):","Infants in Seat (0-2):","Infants on Lap:"];
	var arrPsngrFields=[numOfAdults,numOfSeniors,numOfYouths,numOfChildren,numOfInfantsSeat,numOfInfantsLap];
	var tRow1='';
	var tRow2='';	
	for(var i=0; i<arrPsngrFields.length; i++){
		var tControl=drawBotControl(arrPsngrFields[i],'','class="bot-inp"');	
		if(arrPsngrFields[i].present){
			tRow1+='<td '+((i)?'align="right"':'')+'>' + arrPsngrTitles[i] + '</td>';
			tRow2+='<td '+((i)?'align="right"':'')+'>' + tControl + '</td>';			
		}
		else{
			tRow2+=tControl;			
		}
	}
								
	str+=''+
								'<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
									'<tr>'+
									'' + tRow1 + ''+
									'</tr>'+
									'<tr class="bot-pad2">'+
									'' + tRow2 + ''+
									'</tr>'+
								'</table>'+
								'<div class="spacerVert"><span></span></div>';
								
	for(var i=0; i<preferedAirlines.length; i++){
		str+=drawBotControl(preferedAirlines[i],'','');
	}

	str+=drawBotControl(followAction,'','');							
	str+=drawBotControl(SearchType,'hidden','');	
	str+=drawBotControl(fareOption,'hidden','');

	str+=drawBotControl(isNewSearchFlow,'','');

	str+=''+
								'<div align="right">'+
									'<table border="0" cellspacing="0" cellpadding="0">'+
										'<tr>'+
											'<td>'+
												'<a href="../en/pages-old/Booking - 1. Search Page RT (FRT).html" class="lnk1">Advanced search</a> &nbsp; &nbsp; </td>'+
											'<td>'+
												'<table cellspacing="0" cellpadding="0" border="0">'+
													'<tr>'+
														'<td>'+
															'<a href="#" class="button1" onClick="submitBOTform();return false;">Search</a></td>'+
													'</tr>'+
												'</table></td>'+
										'</tr>'+
									'</table></div></td>'+
						'</tr>'+
					'</table></div>'+
			'</form>'+
			'';
	}		
	return str;
}

function defaultViewBot(){
	if(enableBot){
		var oForm = document.getElementById(tripType.name+'0').form;	
		changeTripType(getElementValue(oForm[tripType.name]),0);
		changeFormType(getElementValue(oForm[formType.name]),0);		
	}	
}

window.onload=defaultViewBot;


try{registerJS("en/js/bot_main.js");}
catch(e){}