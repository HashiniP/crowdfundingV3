
billingApp.service('srvShareData', function ($window,$location) {
	var KEY = 'App.SelectedValue';
	var KEYNEW ='App.SelectedValue';
	var addData = function (newObj) {

		$window.sessionStorage.setItem(KEY, newObj[0]);
	};

	var pushData = function (newObj) {
		console.log("hiii",newObj);
		$window.sessionStorage.setItem(KEYNEW, newObj);
	};

	// var pushData = function (newObj) {	
	// 	myData.push(newObj);
	// };

	var pullData = function () {
		var mydata = $window.sessionStorage.getItem(KEYNEW);
		if (mydata != null) {
			return mydata;
		} else {
			return null;
		}
	};

	// var pullData = function () {
	// 	return myData;
	// };




	var getData = function () {
		var mydata = $window.sessionStorage.getItem(KEY);
		if (mydata != null) {
			return mydata;
		} else {
			return null;
		}
	};

//**
	//var searchData = function(searchkeyword) {
	//	console.log("In searchData", searchkeyword);
	//	var urlParams =searchkeyword[0];
	//	var searchcateg = searchkeyword[1];
	//	if (urlParams != undefined && urlParams != null && urlParams != "" && urlParams.length > 0) {
	//		if (searchcateg == "Client") {
	//			console.log("If satisfied");
	//			addData(urlParams);
	//			$location.path('/csearch');
				//return null;
				//$window.location.href = ;



	//			}
	//	}
	//	return null;

	//	};




	return {
		addData: addData,
		getData: getData,
		pushData: pushData,
		pullData: pullData
		//searchData: searchData
	};
});