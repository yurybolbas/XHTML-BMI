var extPopupTemplates = {
	flightDetailsPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Flight Details</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',

	taxesFeesPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Taxes and Fees</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	surchargesPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Surcharges</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',

	taxDescriptionPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Tax Description</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	surchargeDescriptionPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Surcharge Description</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',

	preferencesPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Preferences</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Save</span></span></a></td>\
		<td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Cancel</span></span></a></td>\
		</tr></table></div>\
	',
	
	fareRulesPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Fare Rules Details</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	seatMapPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Seat Map</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent" style="overflow-x:hidden; overflow-y:auto; hedight: 700px;">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	exitRowTermsPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Exit Row Terms and Conditions</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="seatMapFramework.exitRowAgreement.onClickNo({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table cellspacing="0" cellpadding="0" border="0"><tr><td><a href="#" id="popupExitRowTermsButtonYes" class="button2" style="display:none" onClick="seatMapFramework.exitRowAgreement.onClickYes({id:\'{[values.config.id]}\'});return false"><span><span>Yes</span></span></a><span class="button2Disabled" id="popupExitRowTermsButtonYesDisabled"><span><span>Yes</span></span></span></td><td><a href="#" class="button2" onClick="seatMapFramework.exitRowAgreement.onClickNo({id:\'{[values.config.id]}\'});return false"><span><span>No</span></span></a></td></tr></table></div>\
		',
		
	airTermsPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Terms and Conditions</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	hotelDescriptionPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Hotel Description</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	hotelBreakdownPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Price Breakdown</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	locationMapPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Location Map</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	groupBookingPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Information</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	carDescriptionPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Car Information</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	carVendorPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Location Information</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	carBreakdownPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Price Breakdown</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	insuranceBenefitsPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Benefits</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	insuranceBreakdownPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Price Breakdown</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	insuranceTermsPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Terms</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	securityCodePopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Security Code</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	',
	
	staticContentPopup:'\
		<div id="{[values.config.id]}Dialog" class="defaultDialogFrame">\
		<div class="dialogHeader"><table width="100%" class="dialogHeaderInner"><tr><td width="100%" class="dialogTitle" id="{[values.config.id]}DialogTitle">Information</td><td nowrap="nowrap" class="dialogClose"><a href="#" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false">Close<img src="../../pictures/icons/i_dialog_close.gif" width="11" height="11" alt=""/></a></td></tr></table></div>\
		<div class="dialogBrandHead"><div class="dialogHeadBg"><div class="dialogLogo"></div></div></div>\
		<div class="dialogContent dialogFloatContent" id="{[values.config.id]}DialogContent">\
		<div id="{[values.config.id]}DefCont"><div class="popupBlockLoading1"><table class="popupBlockLoading1OuterTable"><tr><td class="popupBlockLoading1OuterTD"><div class="popupLoadingIcon"><div><span/></div></div><div class="popupLoadingText"><p>Page Loading</p></div></td></tr></table></div></div>\
		<div id="{[values.config.id]}UpdateCont"></div>\
		<div id="{[values.config.id]}ErrorCont"><div class="popupBlockError1"><table class="popupBlockError1OuterTable"><tr><td class="popupBlockError1OuterTD"><div class="popupErrorIcon"><div><span/></div></div><div class="popupErrorText"><p>No connection.</p></div></td></tr></table></div></div>\
		</div>\
		<div class="dialogFooter"><table><tr><td><a href="#" class="button2" onClick="popupFramework.hide({id:\'{[values.config.id]}\'});return false"><span><span>Close</span></span></a></td></tr></table></div>\
	'

}