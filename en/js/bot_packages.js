var typeBot=3;

function drawHomeBot(){
	var str="";
if(enableBot){	
		str='\
			<!-- bot tabs -->\
			<!-- bot tabs -->\
			<table width="100%" border="0" cellspacing="0" cellpadding="0">\
				<tr>\
					<td></td>\
					<td class="t-act">\
						<div><img src="../pictures/misc/spacer.gif" width="1" height="1" alt="" /></div></td>\
					<td></td>\
				</tr>\
				<tr class="m-tabs">\
					<td nowrap="nowrap"><a href="#"><img src="../pictures/icons/tabs/i_plane.gif" width="21" height="17" alt="" />Flights&nbsp; </a></td>\
					<td class="m-act m-act-main" nowrap="nowrap">\
						<img src="../pictures/icons/tabs/i_packages_a.gif" alt="" width="18" height="17" border="0" />Packages &nbsp;</a></td>\
					<td width="100%">&nbsp;</td>\
				</tr>\
			</table>\
			<!-- /bot tabs -->\
			<!-- bot -->\
			<form name="AirAvailabilitySearchForm" method="post" action="http://datalextdp.epam.com/matrixtdp/InterstitialScreen.do">\
				<div class="bot-cont bot-cont-main">\
					<div style="width:1px;height:5px"><span></span></div>';
	if(packagesType.items.length<2){
		str+='\<img src="../pictures/misc/book-together.gif" alt="" width="162" height="17" /><br />';
		str+=drawBotControl(packagesType,'hidden','');
	}
	else{
		str+='\
					<div class="indexBotBTFrame"><img src="../pictures/misc/book-together.gif" alt="" width="162" height="17" />\
					<table cellpadding="0" cellspacing="0" border="0">\
							<tr valign="top">\
								<td class="indexBotBTElement">\
									<table cellpadding="0" cellspacing="0" border="0">\
										<tr valign="top">\
											<td>' + drawBotControl(packagesType,'','class="indexBotRadio" onclick="changePackagesType(this.value,3)"',0) + '</td>\
											<td class="indexBotBTLabelArea">\
												<label for="'+packagesType.name+'0" onclick="document.getElementById(this.htmlFor).click()">' + packagesType.items[0].text + '</label></td>\
										</tr>\
									</table></td>\
								<td class="indexBotBTElement">\
									<table cellpadding="0" cellspacing="0" border="0">\
										<tr valign="top">\
											<td>' + drawBotControl(packagesType,'','class="indexBotRadio" onclick="changePackagesType(this.value,3)"',1) + '</td>\
											<td class="indexBotBTLabelArea">\
												<label for="'+packagesType.name+'1" onclick="document.getElementById(this.htmlFor).click()">' + packagesType.items[1].text + '</label></td>\
										</tr>\
									</table></td>';
			if(packagesType.items.length>2){
				str+='\
								<td class="indexBotBTElement">\
									<table cellpadding="0" cellspacing="0" border="0">\
										<tr valign="top">\
											<td>' + drawBotControl(packagesType,'','class="indexBotRadio" onclick="changePackagesType(this.value,3)"',2) + '</td>\
											<td class="indexBotBTLabelArea">\
												<label for="'+packagesType.name+'2" onclick="document.getElementById(this.htmlFor).click()">' + packagesType.items[2].text + '</label></td>\
										</tr>\
									</table></td>';
			}
				str+='\
							</tr>\
						</table>\
					</div>';
		}			
		str+='\
					' + drawBotControl(tripType,'hidden','') + '\
					' + drawBotControl(formType,'','') + '\
					<table width="100%" cellspacing="0" cellpadding="0" border="0">\
						<tr>\
							<td width="50%" valign="top">\
								<div class="desc-f">Origin:</div>\
								<table width="100%" cellspacing="0" cellpadding="0" border="0" class="TableFixed"><tr><td>\
								' + drawBotControl(origin[0],'','class="bot-inp maxWidth" maxlength="50"') + drawBotControl(fakeOrigin[0],'','') + drawBotControl(origin[1],'','') + drawBotControl(fakeOrigin[1],'','') + '\
								</td></tr></table>\
							</td>\
							<td>\
								<div style="width:10px"><span></span></div></td>\
							<td width="50%" valign="top">\
								<div class="desc-f">Destination:</div>\
								<table width="100%" cellspacing="0" cellpadding="0" border="0" class="TableFixed"><tr><td>\
								' + drawBotControl(destination[0],'','class="bot-inp maxWidth" maxlength="50"') + drawBotControl(fakeDestination[0],'','') + drawBotControl(destination[1],'','') + drawBotControl(fakeDestination[1],'','') + '\
								</td></tr></table>\
							</td>\
						</tr>\
						<tr>\
							<td width="50%" valign="top">\
								<!-- Departing line -->\
								<table width="100%" cellspacing="0" cellpadding="0" border="0">\
									<tr>\
										<td width="50%">\
											<table cellspacing="0" cellpadding="0" border="0">\
												<tr>\
													<td colspan="3" class="desc-f">Departing On:</td>\
												</tr>\
												<tr>';
	if(dateType==2){	
		str+='\
													<td class="bot-pad1">\
													' + drawBotControl(departDate[0],'','class="bot-inp" style="width:90px"') + '\
													' + drawBotControl(departMonth[0],'hidden','') + '\
													' + drawBotControl(departDay[0],'hidden',' onchange="fillDateEdit(\''+departDate[0].name+'\',\''+departMonth[0].name+'\',\''+departDay[0].name+'\',\''+departYear[0].name+'\',\''+dateFormat+'\')"') + '\
													</td>\
													<td colspan="2" style="padding-right:10px">' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>\
			';
	}
	else{
		var strMonth = drawBotControl(departMonth[0],'','class="bot-inp" onChange="correctionDate(\''+departMonth[0].name+'\',\''+departDay[0].name+'\',\''+departYear[0].name+'\');correctionReturnDate(\''+departMonth[0].name+'\',\''+departDay[0].name+'\',\''+departYear[0].name+'\',\''+departMonth[1].name+'\',\''+departDay[1].name+'\',\''+departYear[1].name+'\');"');
		var strDay = drawBotControl(departDay[0],'','class="bot-inp" onChange="correctionDate(\''+departMonth[0].name+'\',\''+departDay[0].name+'\',\''+departYear[0].name+'\');correctionReturnDate(\''+departMonth[0].name+'\',\''+departDay[0].name+'\',\''+departYear[0].name+'\',\''+departMonth[1].name+'\',\''+departDay[1].name+'\',\''+departYear[1].name+'\');"');
		var dateControl1='';
		var dateControl2='';		
		
		if(dateFormat==0){
			dateControl1=strMonth;
			dateControl2=strDay;			
		}else{
			dateControl1=strDay;
			dateControl2=strMonth;			
		}		
		str+='\
													<td class="bot-pad1">' + dateControl1 + '</td>\
													<td>' + dateControl2 + '</td>\
													<td style="padding-right:10px">' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>\
		';
	}			
								
	str+='\
												</tr>\
											</table></td>\
										<td width="50%" align="right">\
											<table width="100%" cellspacing="0" cellpadding="0" border="0">\
												<tr>\
													<td class="desc-f">Time:</td>\
												</tr>\
												<tr>\
													<td>\
													' + drawBotControl(departTime[0],'','class="bot-inp maxWidth"') + '\
													</td>\
												</tr>\
											</table></td>\
									</tr>\
								</table>\
								' + drawBotControl(departYear[0],'','') + '\
								<!-- /Departing line -->\
								<div class="bot-pad2">&nbsp;</div>\
								<table width="100%" cellspacing="0" cellpadding="0" border="0">\
								<tr>\
									<td>';
	if(classOfTravel.present){
		str+='\
								<div class="desc-f">Cabin Class:</div>\
								<div>\
								' + drawBotControl(classOfTravel,'','class="bot-inp"') + '\
								</div>';
	}
	else{
		str+=drawBotControl(classOfTravel,'','');
	}
	str+='\
								</td>\
									<td align="right">';
	if(numOfRooms.present){
		str+='\
								<div style="display:none" id="idNumOfRoomsCont">\
								<div class="desc-f">Rooms:</div>\
								<div>\
								' + drawBotControl(numOfRooms,'','class="bot-inp"') + '\
								</div>\
								</div>';
	}
	else{
		str+=drawBotControl(numOfRooms,'','');
	}									
									
		str+='\
									</td>\
								</tr>\
								</table>';	
								
	
	if(directFlights.present){
		str+='\
								<div class="desc-f">Flight options:</div>\
								<div>\
								' + drawBotControl(directFlights,'','') + '&nbsp;<label for="'+directFlights.name+'">Direct Flights Only</label></div>';
	}
	else{
		str+=drawBotControl(directFlights,'','');
	}	
	str+='\
							</td>\
							<td>\
								<div style="width:10px"><span></span></div></td>\
							<td width="50%" valign="top">\
								<!-- Returning line -->\
								<div id="idReturnTimeBlock">\
								<table width="100%" cellspacing="0" cellpadding="0" border="0">\
									<tr>\
										<td width="50%">\
											<table cellspacing="0" cellpadding="0" border="0">\
												<tr>\
													<td colspan="3" class="desc-f">Returning On:</td>\
												</tr>\
												<tr>';
	if(dateType==2){												
		str+='\
													<td class="bot-pad1">\
													' + drawBotControl(departDate[1],'','class="bot-inp" style="width:90px"') + '\
													' + drawBotControl(departMonth[1],'hidden','') + '\
													' + drawBotControl(departDay[1],'hidden',' onchange="fillDateEdit(\''+departDate[1].name+'\',\''+departMonth[1].name+'\',\''+departDay[1].name+'\',\''+departYear[1].name+'\',\''+dateFormat+'\')"') + '\
													</td>\
													<td colspan="2" style="padding-right:10px">' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>\
			';
	}
	else{
		var strMonth = drawBotControl(departMonth[1],'','class="bot-inp" onChange="correctionDate(\''+departMonth[1].name+'\',\''+departDay[1].name+'\',\''+departYear[1].name+'\')"');
		var strDay = drawBotControl(departDay[1],'','class="bot-inp" onChange="correctionDate(\''+departMonth[1].name+'\',\''+departDay[1].name+'\',\''+departYear[1].name+'\')"');
		var dateControl1='';
		var dateControl2='';		
		
		if(dateFormat==0){
			dateControl1=strMonth;
			dateControl2=strDay;			
		}else{
			dateControl1=strDay;
			dateControl2=strMonth;			
		}		
		str+='\
													<td class="bot-pad1">' + dateControl1 + '</td>\
													<td>' + dateControl2 + '</td>\
													<td style="padding-right:10px">' + ((isCalendar==1)?'<a href="#"><img src="../pictures/icons/i_calendar.gif" alt="" width="16" height="14" hspace="3" border="0" /></a>':'') + '</td>\
		';
	}			
								
	str+='\
												</tr>\
											</table></td>\
										<td width="50%" align="right">\
											<table width="100%" cellspacing="0" cellpadding="0" border="0">\
												<tr>\
													<td class="desc-f">Time:</td>\
												</tr>\
												<tr>\
													<td>\
													' + drawBotControl(departTime[1],'','class="bot-inp maxWidth"') + '\
													</td>\
												</tr>\
											</table></td>\
									</tr>\
								</table>\
								' + drawBotControl(departYear[1],'','') + '\
								</div>\
								<!-- /Returning line -->\
								<div class="desc-f">Passengers:</div>';
								
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
								
	str+='\
								<table width="100%" border="0" cellspacing="0" cellpadding="0">\
									<tr>\
									' + tRow1 + '\
									</tr>\
									<tr class="bot-pad2">\
									' + tRow2 + '\
									</tr>\
								</table>';
	if(preferredCar.present){
		str+='\
								<div style="height:19px;" id="idPreferredCarSpacer"><span /></div>\
								<div style="display:none" id="idPreferredCarCont">\
								<div class="desc-f">Preferred Car Company:</div>\
								<div>\
								' + drawBotControl(preferredCar,'','class="bot-inp maxWidth"') + '\
								</div>\
								<div class="spacerVert"><span></span></div>\
								</div>';
	}
	else{
		str+='<div style="height:19px;"><span /></div>' + drawBotControl(preferredCar,'','');
	}								
								
	for(var i=0; i<preferedAirlines.length; i++){
		str+=drawBotControl(preferedAirlines[i],'','');
	}

	str+=drawBotControl(followAction,'','');							
	str+=drawBotControl(SearchType,'hidden','');	
	str+=drawBotControl(fareOption,'hidden','');
	
	str+='\
								<div align="right">\
									<table border="0" cellspacing="0" cellpadding="0">\
										<tr>\
											<td>\
												<a id="idAdvancedSearch" href="../en/pages-old/Booking - 1. Search Page RT (FRT).html" class="lnk1">Advanced search</a> &nbsp; &nbsp; </td>\
											<td>\
												<table cellspacing="0" cellpadding="0" border="0">\
													<tr>\
														<td>\
															<a href="#" class="button1" onClick="submitBOTform();return false;">Search</a></td>\
													</tr>\
												</table></td>\
										</tr>\
									</table></div></td>\
						</tr>\
					</table></div>\
			</form>\
			';
	}		
	return str;
}

function changePackagesType(val,typeBot){
	var isNumOfRooms=false;	
	var isPreferredCar=false;
	var linkToAdvSearch="";		
	
	switch(val){
		case "FH":
			isNumOfRooms=true;	
			isPreferredCar=false;		
			linkToAdvSearch=advancedSearchLink.items[0].val;
			break;
			
		case "FC":
			isNumOfRooms=false;	
			isPreferredCar=true;
			linkToAdvSearch=advancedSearchLink.items[2].val;				
			break;
			
		case "FHC":
			isNumOfRooms=true;
			isPreferredCar=true;
			linkToAdvSearch=advancedSearchLink.items[1].val;					
			break;
	}
		
	if(numOfRooms.present){
		document.getElementById('idNumOfRoomsCont').style.display=(isNumOfRooms)?"block":"none";
	}	
	
	if(preferredCar.present){
		document.getElementById('idPreferredCarCont').style.display=(isPreferredCar)?"block":"none";
		document.getElementById('idPreferredCarSpacer').style.display=(!isPreferredCar)?"block":"none";		
	}	
	
	document.getElementById("idAdvancedSearch").href=linkToAdvSearch;
}


function defaultViewBot(){
	if(enableBot){	
		changePackagesType(getElementValue(document.getElementById(packagesType.name+'0').form[packagesType.name]),0);
	}	
}

window.onload=defaultViewBot;


try{registerJS("js/bot_main1_1.js");}
catch(e){}