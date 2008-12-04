
















var enableBot;

    
        enableBot = true;
    
    


var enableMultiLegSearch;

    
    
        enableMultiLegSearch = false;
    


var tripType=["typeOfSearch","radio",true, "RT", [["Round Trip","RT"],["One Way","OW"]]]

var cities=[];
var citiesFormat;
var origin=[];
var destination=[];
var fakeOrigin=[];
var fakeDestination=[];

    
        
            citiesFormat ='select';
            cities=[
                ["Please Select Origin Location","",1],
                ["Please Select Destination","",2]
                
                    ,
                    ["Honolulu International Apt, United States Of America","HNL", 3]
                    ,
                
                    
                    ["Miami International Apt, United States Of America","MIA", 3]
                    ,
                
                    
                    ["Hilo, United States Of America","ITO", 3]
                    ,
                
                    
                    ["Kapalua, United States Of America","JHM", 3]
                    ,
                
                    
                    ["New York J F Kennedy International Apt, United States Of America","JFK", 3]
                    ,
                
                    
                    ["Los Angeles International Apt, United States Of America","LAX", 3]
                    
                
                ];
            origin[0]=["availabilityRequest[0].originCode",citiesFormat,true,""];
            destination[0]=["availabilityRequest[0].destinationCode",citiesFormat,true,""];
            fakeOrigin[0]=["availabilityRequest[0].origin","hidden",true,""];
            fakeDestination[0]=["availabilityRequest[0].destination","hidden",true,""];

            origin[1]=["availabilityRequest[1].originCode","hidden",true,""];
            destination[1]=["availabilityRequest[1].destinationCode","hidden",true,""];
            fakeOrigin[1]=["availabilityRequest[1].origin","hidden",true,""];
            fakeDestination[1]=["availabilityRequest[1].destination","hidden",true,""];

        
        
    

var dateType;
// 1 - select
// 2 - edit


    
        dateType = 1;
    
    


var isCalendar;
//	1 - available
//	0 - unavailable

    
        isCalendar = 1;
    
    


var dateFormat;
// 0 - mm/dd/yyyy
// 1 - dd/mm/yyyy



    
          dateFormat = 1;
    
    



var month=[
    
        ["Jan",0]
        ,
    
        ["Feb",1]
        ,
    
        ["Mar",2]
        ,
    
        ["Apr",3]
        ,
    
        ["May",4]
        ,
    
        ["Jun",5]
        ,
    
        ["Jul",6]
        ,
    
        ["Aug",7]
        ,
    
        ["Sep",8]
        ,
    
        ["Oct",9]
        ,
    
        ["Nov",10]
        ,
    
        ["Dec",11]
        
    
    ];

var day = [];
for(var i=0; i<31; i++){
	day[i]=[];
	day[i][0]=i + 1;
	day[i][1]=i + 1;
}

/* restored from App 15.03.2007 beg */
var year = [];
for(var i=0; i<2; i++){
 year[i]=[];
	year[i][0]=i + new Date().getFullYear();
	year[i][1]=i + new Date().getFullYear();
}

/* restored from App 15.03.2007 end */

var time=
    [
    
        ["0000","0000"]
        ,
    
        ["0100","0100"]
        ,
    
        ["0200","0200"]
        ,
    
        ["0300","0300"]
        ,
    
        ["0400","0400"]
        ,
    
        ["0500","0500"]
        ,
    
        ["0600","0600"]
        ,
    
        ["0700","0700"]
        ,
    
        ["0800","0800"]
        ,
    
        ["0900","0900"]
        ,
    
        ["1000","1000"]
        ,
    
        ["1100","1100"]
        ,
    
        ["1200","1200"]
        ,
    
        ["1300","1300"]
        ,
    
        ["1400","1400"]
        ,
    
        ["1500","1500"]
        ,
    
        ["1600","1600"]
        ,
    
        ["1700","1700"]
        ,
    
        ["1800","1800"]
        ,
    
        ["1900","1900"]
        ,
    
        ["2000","2000"]
        ,
    
        ["2100","2100"]
        ,
    
        ["2200","2200"]
        ,
    
        ["2300","2300"]
        ,
    
        ["Morning","M"]
        ,
    
        ["Afternoon","N"]
        ,
    
        ["Evening","E"]
        
    
    ];
var deltaTime= 7; // in days

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

    var numOfAdults;

    
        numOfAdults=["numOfAdults","select",true,1,
            [
            
                ["0",0]
                ,
            
                ["1",1]
                ,
            
                ["2",2]
                ,
            
                ["3",3]
                ,
            
                ["4",4]
                ,
            
                ["5",5]
                ,
            
                ["6",6]
                ,
            
                ["7",7]
                ,
            
                ["8",8]
                ,
            
                ["9",9]
                
            
            ]
        ];
    
    


    var numOfSeniors;

    
        numOfSeniors=["numOfSeniors","select",false,0,
            [
            
                ["0",0]
                ,
            
                ["1",1]
                ,
            
                ["2",2]
                ,
            
                ["3",3]
                ,
            
                ["4",4]
                ,
            
                ["5",5]
                ,
            
                ["6",6]
                ,
            
                ["7",7]
                ,
            
                ["8",8]
                ,
            
                ["9",9]
                
            
            ]
        ];
    
    


var numOfYouths;

   
       numOfYouths=["numOfYouths","select",false,0,
           [
           
               ["0",0]
               ,
           
               ["1",1]
               ,
           
               ["2",2]
               ,
           
               ["3",3]
               ,
           
               ["4",4]
               ,
           
               ["5",5]
               ,
           
               ["6",6]
               ,
           
               ["7",7]
               ,
           
               ["8",8]
               ,
           
               ["9",9]
               
           
           ]
       ];
   
   


var numOfChildren;

 
     numOfChildren=["numOfChildren","select",true,0,
         [
         
             ["0",0]
             ,
         
             ["1",1]
             ,
         
             ["2",2]
             ,
         
             ["3",3]
             ,
         
             ["4",4]
             ,
         
             ["5",5]
             ,
         
             ["6",6]
             ,
         
             ["7",7]
             ,
         
             ["8",8]
             ,
         
             ["9",9]
             
         
         ]
     ];
 
 


var numOfInfantsSeat;


  numOfInfantsSeat=["numOfInfantsSeat","select",false,0,
      [
      
          ["0",0]
          ,
      
          ["1",1]
          ,
      
          ["2",2]
          ,
      
          ["3",3]
          ,
      
          ["4",4]
          ,
      
          ["5",5]
          ,
      
          ["6",6]
          ,
      
          ["7",7]
          ,
      
          ["8",8]
          ,
      
          ["9",9]
          
      
      ]
  ];




var numOfInfantsLap;


  numOfInfantsLap=["numOfInfantsLap","select",true,0,
      [
      
          ["0",0]
          ,
      
          ["1",1]
          ,
      
          ["2",2]
          ,
      
          ["3",3]
          ,
      
          ["4",4]
          ,
      
          ["5",5]
          ,
      
          ["6",6]
          ,
      
          ["7",7]
          ,
      
          ["8",8]
          ,
      
          ["9",9]
          
      
      ]
  ];




var classOfTravel;

    
        classOfTravel=["classOfTravel","select",true,"ECONOMY",
            [
                
                    ["Economy Class","ECONOMY"]
                    ,
                
                    ["Business Class","BUSINESS"]
                    ,
                
                    ["First Class","FIRST"]
                    
                
            ]
        ];
    
    


var fareOption;

    
        fareOption=["fareOption","select",true,"",
            [
                ["Restricted Fares",""]
                
                    ,
                    ["Un-Restricted Fares","101"]
                    
                
            ]
        ];
    
    



var directFlights;

    
        directFlights=["directFlights","checkbox",true,"false",[["Direct Flights Only","true"]]];
    
    



var SearchType;

    
        SearchType=["searchMethod","radio",true,0,
            [
                
                    ["Lowest Fare",0]
                    ,
                
                
                    ["Preferred Flight", 1]
                
            ]
        ];
    
    


var formType;


    
        formType=["formType","hidden",true,0];
    
    


/*var followAction=["followAction","hidden",true,"AirHotelAvailabilitySearch",
            [
                ["../AirHotelAvailabilitySearchInterstitialScreen.do","AirHotelAvailabilitySearch"],
                ["../AirHotelCarAvailabilitySearchInterstitialScreen.do","AirHotelCarAvailabilitySearch"],
                ["../AirCarAvailabilitySearchInterstitialScreen.do","AirCarAvailabilitySearch"]
            ]
        ];*/

var followAction=["followAction","hidden",true,"AirLowFareSearchAction",[["","AirLowFareSearchAction"],["","AirAvailabilitySearchAction"],["FH","AirHotelAvailabilitySearch"],["FHC","AirHotelCarAvailabilitySearch"],["FC","AirCarAvailabilitySearch"]]];
var formAction=["fakeFormAction","fake",false,"",[["reserved",""],["reserved",""],["FH","../AirHotelAvailabilitySearchInterstitialScreen.do"],["FHC","../AirHotelCarAvailabilitySearchInterstitialScreen.do"],["FC","../AirCarAvailabilitySearchInterstitialScreen.do"]]];

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

 /* data for TDP1.1 begin */

 var packagesType=["packagesType","radio",true, "FH", [["Flight+Hotel","FH"],["Flight+Hotel+Car","FHC"],["Flight+Car","FC"]]];
 var numOfRooms=["numberOfRooms","select",true,1, [["1",1],["2",2],["3",3],["4",4],["5",5],["6",6],["7",7],["8",8],["9",9]]];
 var preferredCar=["preferredCar","select",true,1,[["No preference",1],["Unrestricted sorted by Price",2],["Restricted sorted by Schedule",3]]];

 var advancedSearchLink=["fakeAdvancedSearch","fake",false,"../AirHotelSearchForward.do",[["FH","../AirHotelSearchForward.do"],["FHC","../AirHotelCarSearchForward.do"],["FC","../AirCarSearchForward.do"]]];
 /* data for TDP1.1 end */

 try{registerJS('');}catch(e){}

/* Titles for TDP1.1 begin*/
var arrPsngrTitles=[
    "Adults:",
    "Seniors <nobr>(62+):</nobr>",
    "Youth <nobr>(12-17):</nobr>",
    "Children <nobr>(2-11):</nobr>",
    "Infants on Seat<nobr>(0-2):</nobr>",
    "Infants <nobr>(0-2):</nobr>"];

var itemCaptions = [
    "Flights&nbsp;",
    "Packages &nbsp;",
    "Flight + Hotel",
    "Flight + Hotel + Car",
    "Flight + Car",
    "Origin:",
    "Destination:",
    "Departing On:",
    "Time:",
    "Returning On:",
    "Passengers:",
    "Cabin Class:",
    "Rooms:",
    "Flight options:",
    "Direct Flights Only",
    "Advanced search",
    "Search"
    ];
/* Titles for TDP1.1 end */

 var isNewSearchFlow=["isNewSearchFlow","hidden",true,"true"];
 
 
  /* data for TDP1.2+ begin */

 var flexibleDatesType=["flexibleDatesType","radio",true, "FLEX", [["Flexible Dates","FLEX"],["Non Flexible Dates","NONFLEX"]]];  
  
  /* data for TDP1.2+ end */  