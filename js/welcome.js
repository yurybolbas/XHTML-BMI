
function drawWelcomeStr(isLogged){
	var str="";
	if(isLogged){
		str='\
			<b>Welcome, John Smith</b><span> | </span>\
			<a href="../en/pages-profile/Profile - Indexpage (AHP).html">My profile</a><span> | </span>\
			<a href="../en/index.html" onclick="deleteCookie(\'isLogged\',null,null); window.location.reload(); return false">Logoff</a>\
		';		
		return str;	
	}
	else{
		var cookie=null;
		if(cookie=getCookie("profile")){
			var firstName="";
			var lastName="";
			if(getCookieItem("firstName",cookie)){
				firstName=getCookieItem("firstName",cookie);				
			}
			if(getCookieItem("lastName",cookie)){
				lastName=getCookieItem("lastName",cookie);				
			}
			str='\
				<b>Welcome, ' + firstName + ' ' + lastName + '</b><span> | </span>\
				<a href="../en/pages-login/Login - Login Screen (ALG).html">Login</a>\
			';
			return str;		
		}
		else{
			str='<a href="../en/pages-login/Login - Login Screen (ALG).html">Login</a>';		
			return str;
		}
	}
}	

