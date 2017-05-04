billingApp.controller('searchController', function ($scope, $http, $route, $location, srvShareData) {
	document.getElementById("topmenu").style.visibility = "visible";
	$scope.autooption = "all";
	console.log("In searchController");
	$scope.detectIE = function () {
		var ua = window.navigator.userAgent,
			msie = ua.indexOf("MSIE ");

		if (msie > 0) {
			$scope.ieBrowser = true;
		} else {

			$scope.ieBrowser = false;
		}

	};
	$scope.detectIE();

	
	

	$scope.goPath = function (path) {
		$location.path(path);
	};

	$scope.goSearch = function (urlParams) {
		console.log("in search",urlParams)
		if (urlParams[0] != undefined && urlParams[0] != null && urlParams[0] != "" && urlParams[0].length > 0) {
			if (urlParams[1] == "Client") {
				srvShareData.addData(urlParams);
				$scope.goPath('/csearch');
				$route.reload();
			}
			if (urlParams[1] =="Employee") {
				srvShareData.addData(urlParams);
				$scope.goPath('/esearch');
				$route.reload();
			}
			if (urlParams[1] =="Project") {
				srvShareData.addData(urlParams);
				$scope.goPath('/psearch');
				$route.reload();
			}
			if (urlParams[1] =="Billing") {
				srvShareData.addData(urlParams);
				$scope.goPath('/bsearch');
				$route.reload();
			}
			else
			{
				return null;
			}

		}
	};

		
	//$scope.kwsearch = function(){
	//		var urlParams = $scope.searchKeywords.split(" -- ");
	//		console.log("Controller search");
	//		$scope.goSearch(urlParams);
    //	}
	$scope.autocompleteOnType = function (typed) {
		console.log("auto typed",$scope.autooption);
		
		var typedKw = {};
		typedKw["keyword"] = typed;
			if ($scope.autooption == "all") {
			$http.post("/api/billing/autocomplete", typedKw)
			.success(function (data) {
				var len = data.length;
				var searchSuggestions = [];
				if (data != null && data != null) {
					if (data.length > 10) {
						len = 10;
					}
	
					for (var i = 0; i < len; i++) {
						if (Object.keys(data[i])[0] == "clientname")
							searchSuggestions.push(data[i].clientname + " -- " + "Client");
						else if (Object.keys(data[i])[0] == "empname")
						searchSuggestions.push(data[i].empname + " -- " + "Billing");
						else if (Object.keys(data[i])[0] == "projname")
							searchSuggestions.push(data[i].projname + " -- " + "Project");
						else
							searchSuggestions.push(data[i].firstname + " -- " + "Employee");
					}
				}
				$scope.searchSuggestions = searchSuggestions;
			});
			} else if ($scope.autooption == "Billing") {
				$http.post("/api/billing/autocomplete", typedKw)
				.success(function (data) {
				var len = data.length;
				var searchSuggestions = [];
				if (data != null && data != null) {
					if (data.length > 10) {
						len = 10;
					}

					for (var i = 0; i < len; i++) {
					searchSuggestions.push(data[i].empname);
					}
				}
				$scope.searchSuggestions = searchSuggestions;
			});
			} else if ($scope.autooption == "Client") {
				$http.post("/api/billing/autocomplete", typedKw)
				.success(function (data) {
				var len = data.length;
				var searchSuggestions = [];
				if (data != null && data != null) {
					if (data.length > 10) {
						len = 10;
					}

					for (var i = 0; i < len; i++) {
					searchSuggestions.push(data[i].clientname);
					}
					}
				$scope.searchSuggestions = searchSuggestions;
			});
			} else if ($scope.autooption == "Employee") {
				$http.post("/api/billing/autocomplete", typedKw)
				.success(function (data) {
				var len = data.length;
				var searchSuggestions = [];
				if (data != null && data != null) {
					if (data.length > 10) {
						len = 10;
					}

					for (var i = 0; i < len; i++) {
					searchSuggestions.push(data[i].firstname);
					}
					}
				$scope.searchSuggestions = searchSuggestions;
			});
			} else{
				$http.post("/api/billing/autocomplete", typedKw)
				.success(function (data) {
				var len = data.length;
				var searchSuggestions = [];
				if (data != null && data != null) {
					if (data.length > 10) {
						len = 10;
					}

					for (var i = 0; i < len; i++) {
					searchSuggestions.push(data[i].projname);
					}
					}
				$scope.searchSuggestions = searchSuggestions;
			});
			}	



			console.log("end auto typed");
	};


	// $scope.regulate=function(term,typed){
	// 	var typedKw = {};
	// 	typedKw["keyword"] = typed;
	// 	// var urlParams = {};
	// 		console.log("in regulator",term);
	// 		if (term == "billing") {
	// 			$http.post("/api/billing/autocomplete", typedKw)
	// 			.success(function (data) {
	// 			var len = data.length;
	// 			var searchSuggestions = [];
	// 			if (data != null && data != null) {
	// 				if (data.length > 10) {
	// 					len = 10;
	// 				}

	// 				for (var i = 0; i < len; i++) {
	// 				searchSuggestions.push(data[i].clientname);
	// 				}
	// 			}
	// 			$scope.searchSuggestions = searchSuggestions;
	// 		});
			
	// 		} else if (term == "client") {
	// 			$http.post("/api/billing/autocomplete", typedKw)
	// 			.success(function (data) {
	// 			var len = data.length;
	// 			var searchSuggestions = [];
	// 			if (data != null && data != null) {
	// 				if (data.length > 10) {
	// 					len = 10;
	// 				}

	// 				for (var i = 0; i < len; i++) {
	// 				searchSuggestions.push(data[i].empname);
	// 				}
	// 			}
	// 			$scope.searchSuggestions = searchSuggestions;
	// 		});
						
	// 		} else if (term == "project") {
	// 			$http.post("/api/billing/autocomplete", typedKw)
	// 			.success(function (data) {
	// 			var len = data.length;
	// 			var searchSuggestions = [];
	// 			if (data != null && data != null) {
	// 				if (data.length > 10) {
	// 					len = 10;
	// 				}

	// 				for (var i = 0; i < len; i++) {
	// 				searchSuggestions.push(data[i].projname);
	// 				}
	// 			}
	// 			$scope.searchSuggestions = searchSuggestions;
	// 		});

	// 		} else if (term == "employee"){
	// 			$http.post("/api/billing/autocomplete", typedKw)
	// 			.success(function (data) {
	// 			var len = data.length;
	// 			var searchSuggestions = [];
	// 			if (data != null && data != null) {
	// 				if (data.length > 10) {
	// 					len = 10;
	// 				}

	// 				for (var i = 0; i < len; i++) {
	// 				searchSuggestions.push(data[i].firstname);
	// 					}
	// 			}
	// 			$scope.searchSuggestions = searchSuggestions;
	// 		});
	// 		} 	
	// 	};




	// $scope.search = function() {
	// 	var urlParams = $scope.searchKeywords.split(" -- ");
	// 	$scope.goSearch(urlParams);
	// };

	$scope.search = function() {
		if ($scope.searchKeywords.match(/--/)) {
		var urlParams = $scope.searchKeywords.split(" -- ");	
	} else {
		var urlParams = [];
		urlParams.push($scope.searchKeywords);
		urlParams.push($scope.autooption);
		console.log("after push",urlParams);
	}
		
		$scope.goSearch(urlParams);
	};
    
    $scope.billingedit = function() {
		console.log("Inside billingedit function");
        $scope.goPath('/billing_edit');
        
	};

	$scope.autocompleteOnSelectHP = function (selectedWord) {
		console.log("In autocomplete");
		console.log()
		if ($scope.searchKeywords.match(/--/)) {
		$scope.searchKeywords = $("<div>" + selectedWord + "</div>").text();
		var urlParams = $scope.searchKeywords.split(" -- ");
		} else {
			var urlParams = [];
		$scope.searchKeywords = $("<div>" + selectedWord + "</div>").text();
		urlParams.push($scope.searchKeywords);
		urlParams.push($scope.autooption);
		console.log("after push",urlParams);
		}
		$scope.goSearch(urlParams);
		console.log("Hello")
	};

	// $scope.billinglistAll =  function(){
	// 	$http.post("/api/billing/listAll", billingDetails).success(function (result) {
	// 			console.log("BillingList returned : ", result);
	// 		});
	// }


	// $scope.regulate=function(term){
	// 	var urlParams = {};
	// 	console.log("in regulator",term);
	// 	if (term == "billing") {
	// 		urlParams[1] =="Billing";
	// 	} else if (term == "client") {
	// 		urlParams[1] == "Client";
	// 	} else if (term == "project") {
	// 		urlParams[1] =="Project";
	// 	} else{
	// 		urlParams[1] =="Employee";
	// 	}
	// 	console.log(urlParams);
	// };
});




// ********************************//




