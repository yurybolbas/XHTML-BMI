
var tdpIsValidationRequried = true;

var enableBot = true;
var EnableMultiLegSearch = true;



var tripType=["TripType","radio",true,"RT",[["Round Trip","RT"],["One Way","OW"]]];

var citiesFormat="select";
var cities=[["Please Select",0,3],["Minsk","mnk",3],["Gomel","gml",1],["Brest","bst",2]];
var origin=[];
	origin[0]=["availabilityRequest[0].originCode",citiesFormat,true,0];
	origin[1]=["availabilityRequest[1].originCode","hidden",true,""];
	
var fakeOrigin=[];
	fakeOrigin[0]=["availabilityRequest[0].origin","hidden",true,""];
	fakeOrigin[1]=["availabilityRequest[1].origin","hidden",true,""];	

var destination=[];
	destination[0]=["availabilityRequest[0].destinationCode",citiesFormat,true,0];
	destination[1]=["availabilityRequest[1].destinationCode","hidden",true,""];
	
var fakeDestination=[];
	fakeDestination[0]=["availabilityRequest[0].destination","hidden",true,""];
	fakeDestination[1]=["availabilityRequest[1].destination","hidden",true,""];		
	
	

	
var dateType=1;
// 1 - select  
// 2 - edit  

var dateFormat=0;
// 0 - mm/dd/yyyy
// 1 - dd/mm/yyyy

var isCalendar=1;
//	1 - available
//	0 - unavailable


var month=[["Jan",0],["Feb",1],["Mar",2],["Apr",3],["May",4],["Jun",5],["Jul",6],["Aug",7],["Sep",8],["Oct",9],["Nov",10],["Dec",11]];
var day=[["1",1],["2",2]];

for(var i=0; i<31; i++){
	day[i]=[];
	day[i][0]=i+1;
	day[i][1]=i+1;	
}

var time=[["Anytime",1],["1:00 AM",2]];
var deltaTime= 1; // in days

var defaultDepartTime=new Date(new Date().getTime()+deltaTime*60*60*24*1000);
var	defaultReturnTime=new Date(defaultDepartTime.getTime()+60*60*24*1000);

var departMonth=[];
var departDay=[];
var departYear=[];
var departTime=[];
var departDate=[];

	departMonth[0]=["availabilityRequest[0].departureMonth","select",true,defaultDepartTime.getMonth()];
	departDay[0]=["availabilityRequest[0].departureDay","select",true,defaultDepartTime.getDate()];
	departYear[0]=["availabilityRequest[0].departureYear","hidden",true,defaultDepartTime.getFullYear()];  
	departTime[0]=["availabilityRequest[0].departureTime","select",true,1];
	
	departDate[0]=["availabilityRequest[0].departureDate","text",true,0];
	
	departMonth[1]=["availabilityRequest[1].departureMonth","select",true,defaultReturnTime.getMonth()];
	departDay[1]=["availabilityRequest[1].departureDay","select",true,defaultReturnTime.getDate()];
	departYear[1]=["availabilityRequest[1].departureYear","hidden",true,defaultReturnTime.getFullYear()];  
	departTime[1]=["availabilityRequest[1].departureTime","select",true,1];
	
	departDate[1]=["availabilityRequest[1].departureDate","text",true,0];

var numOfAdults=["numOfAdults","select",true,1,[["0",0],["1",1],["2",2],["3",3],["4",4]]];
var numOfSeniors=["numOfSeniors","select",false,0,[["0",0],["1",1],["2",2],["3",3],["4",4]]];
var numOfYouths=["numOfYouths","select",false,0,[["0",0],["1",1],["2",2],["3",3],["4",4]]];
var numOfChildren=["numOfChildren","select",true,0,[["0",0],["1",1],["2",2],["3",3],["4",4]]];
var numOfInfantsSeat=["numOfInfantsSeat","select",false,0,[["0",0],["1",1],["2",2],["3",3],["4",4]]];
var numOfInfantsLap=["numOfInfantsLap","select",true,0,[["0",0],["1",1],["2",2],["3",3],["4",4]]];

var classOfTravel=["classOfTravel","select",true,1,[["Economy",1],["Business",2],["First",3]]];

var fareOption=["fareOption","select",true,1,[["Restricted sorted by Price",1],["Unrestricted sorted by Price",2],["Restricted sorted by Schedule",3]]];

var directFlights=["directFlights","checkbox",true,1,[["Direct Flights Only",true]]];

var SearchType=["SearchType","radio",true,1,[["Lowest Fare",1],["Preferred Flight",2]]];



var formType=["formType","hidden",true,0];

var followAction=["followAction","hidden",true,"URL1",[["","URL1"],["","URL2"]]];

var preferedAirlines=[];
	preferedAirlines[0]=["preferedAirline1","text",false,""];
	preferedAirlines[1]=["preferedAirline2","text",false,""];
	preferedAirlines[2]=["preferedAirline3","text",false,""];		

	
	


	
var err1="The origin is empty";
var err2="The destination is empty";

var err3="The origin must be alphanumeric";
var err4="The destination must be alphanumeric";

var err5="The origin equals to the destination";


var err6="The passenger amount should be less than 10";
var err7="The passenger combination is not correct";

var err8="The departure date is incorrect";
var err9="The return date is incorrect";

var err10="The date interval is not correct: date must be within 331 days.";
var err11="The date interval is not correct: return date can not precede departure date";	
	
	
//cookieVar="destinationCode0=ITO~departureTime1=0000~departureTime0=0000~classOfTravel=ECONOMY~numOfChildren=0~departureDay0=2~preferedAirline2=null~departureYear1=2005~numOfYouths=0~departureMonth1=4~preferedAirline1=null~numOfAdults=1~numOfInfantsLap=0~numOfInfantsSeat=0~searchMethod=1~preferedAirline0=null~directFlights=true~formType=0~departureMonth0=0~departureYear0=2005~numOfSeniors=0~originCode0=HNL~destinationCode1=HNL~fareOption=null~departureDay1=3~originCode1=ITO~";

//setCookie("botparams",cookieVar)	
	
try{registerJS("js/global.js");}
catch(e){}	