var billingApp = angular.module('billingApp', ['ngRoute', 'ngAnimate', 'autocomplete','xeditable']);
// console.log("in app.js file");

billingApp.controller('homeController', function ($scope ) {
	$scope.pageClass = 'home';

});

billingApp.controller('startupDetailController',function($scope){
	$scope.pageClass='startupdetail';
});

billingApp.controller('helpController',function($scope){
	$scope.pageClass='help';
});

billingApp.controller('campaigncontroller',function($scope){
	$scope.pageClass='help';
});

billingApp.controller('campaignDetailController',function($scope){
  $scope.pageClass='help';
});


// billingApp.controller('clientController', function ($scope, srvShareData) {
// 	$scope.pageClass = 'client';
// 	$scope.username = srvShareData.getData();
// 	if ($scope.username != undefined && $scope.username != null) {
// 		window.location.href = "#client";
// 	} else {
// 		document.getElementById("clientpage").innerHTML = "<h3>Please login to access this page</h3>";
// 	}
// });

// billingApp.controller('employeeController', function ($scope, srvShareData) {
// 	$scope.pageClass = 'employee';
// 	$scope.username = srvShareData.getData();
// 	if ($scope.username != undefined && $scope.username != null) {
// 		window.location.href = "#employee";
// 	} else {
// 		document.getElementById("employeepage").innerHTML = "<h3>Please login to access this page</h3>";
// 	}
// });

// billingApp.controller('billingController', function ($scope, srvShareData) {
// 	$scope.pageClass = 'billing';
// 	$scope.username = srvShareData.getData();
// 	if ($scope.username != undefined && $scope.username != null) {
// 		window.location.href = "#billing";
// 	} else {
// 		document.getElementById("billingpage").innerHTML = "<h3>Please login to access this page</h3>";
// 	}
// });

// billingApp.controller('projectController', function ($scope, srvShareData) {
// 	$scope.pageClass = 'project';
// 	$scope.username = srvShareData.getData();
// 	if ($scope.username != undefined && $scope.username != null) {
// 		window.location.href = "#project";
// 	} else {
// 		document.getElementById("projectpage").innerHTML = "<h3>Please login to access this page</h3>";
// 	}
// });

billingApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

billingApp.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [], 
          keys = [];
      
      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key); 
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});

// billingApp.run(function($httpBackend) {
//   $httpBackend.whenGET('/groups').respond([
//     {id: 1, text: 'user'},
//     {id: 2, text: 'customer'},
//     {id: 3, text: 'vip'},
//     {id: 4, text: 'admin'}
//   ]);
    
//   $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
//     data = angular.fromJson(data);
//     return [200, {status: 'ok'}];
//   });
// });
