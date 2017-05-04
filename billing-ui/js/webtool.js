var app = angular.module('webApp', ['ui.bootstrap','ngTable','ngRoute','chart.js']);

app.config(['$routeProvider', function($routeProvider) {
	
   $routeProvider.   
   when('/extract', {
      templateUrl: 'views/extract.html', controller: 'mainCtrl'
   }).  
   when('/step1', {
      templateUrl: 'views/customer_1.html', controller: 'mainCtrl'
   }). 
   otherwise({
      redirectTo: '/extract'
   });
	
}]);

app.controller('loginCtrl',['$scope','$http','$window',function($scope,$http,$window) {
	
	$scope.authenticate = function(){	
	
		var url = "http://" + $window.location.host + "/home.html";        
        $window.location.href = url;
		
	};
}]);

app.controller('mainCtrl', ['$scope','$http','NgTableParams','$location',function($scope,$http, NgTableParams,$location) {

   $scope.views = [{active:'primary',label:'Data Extraction'},{active:'default',label:'Customer Needs'},{active:'default',label:'CBR Linkage'},
					{active:'default',label:'Unique Solutions'},{active:'default',label:'Invovative Coms.'},{active:'default',label:'Comp. Advantage'}];
   
	
	$scope.init = function(){	

		$http({
				method: "GET",
				url: "/skusearch/skulist"
             }).then(function(response, status) {												
				$scope.tableParams = new NgTableParams({}, { dataset: response.data});
				$scope.status = "success";				
			});				
		
		$http({
				method: "GET",
				url: "/skusearch/filters"
             }).then(function(response, status) {												
				$scope.filters = response.data;
				$scope.status = "success";				
			});
	};
	$scope.prev = function(){
			$location.path('/extract');
			$scope.views[1].active='default'
			$scope.views[0].active='primary'
	};
	
	$scope.next = function(){
		$scope.p ="";
		
		$scope.n = "step1";
		console.log($location.path());
		$scope.step1data = $scope.tableParams.data;
		$location.path('/step1');
		$scope.views[0].active='default'
		$scope.views[1].active='primary'
		//console.log("this is the filtered Data "+JSON.stringify($scope.tableParams.data));
	};
	
	
	 $scope.labels1 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	 $scope.series1 = ['Series A', 'Series B'];

	  $scope.chartdata1 = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
		];
	
	 $scope.labels2 = ["January", "February", "March", "April", "May", "June", "July"];
	 $scope.series2 = ['Series A', 'Series B'];
     $scope.chartdata2 = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	  ];
	  
	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
	  $scope.options = {
		scales: {
		  yAxes: [
			{
			  id: 'y-axis-1',
			  type: 'linear',
			  display: true,
			  position: 'left'
			},
			{
			  id: 'y-axis-2',
			  type: 'linear',
			  display: true,
			  position: 'right'
			}
		  ]
		}
	  };
	   $scope.onClick = function (points, evt) {
			console.log(points, evt);
		};

}]);

