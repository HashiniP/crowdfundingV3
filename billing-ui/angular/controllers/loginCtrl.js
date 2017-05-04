billingApp.controller('loginController',function($scope, srvShareData, $http, $route){
	document.getElementById("topmenu").style.visibility = "hidden";
	console.log("Inside login control");
	flag=false;
	console.log(flag);
	 $scope.authenticate = function authenticate(){
	 			var uname=$scope.username;
		var password=$scope.password;
		console.log("User name :"+uname);
		console.log("Passord"+password);
		if(uname=='admin' && password=='admin'){
			window.location.href = '#/home';
		}
		else {
			alert('Incorrect Username or Password !');
			$scope.username='';
			$scope.password='';
			}

		
		 console.log("Authenticate function");
	};

});