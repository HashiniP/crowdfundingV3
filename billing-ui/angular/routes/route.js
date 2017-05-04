billingApp.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'homeController'
		//	controllerAs: 'homeCtrl'
		})

		.when('/campaign', {
			templateUrl: 'views/campaign.html',
			controller: 'campaigncontroller'
		})

		.when('/startupdetail', {
			templateUrl: 'views/startupDetail.html',
			controller: 'startupDetailController'
		})

		.when('/campaigndetail', {
			templateUrl: 'views/campaignDetail.html',
			controller: 'campaignDetailController'
		})

		.when('/help', {
			templateUrl: 'views/help.html',
			controller: 'helpController'
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
		})

		.when('/try', {
			templateUrl: 'try.html',
		
		})

		.otherwise({
			redirectTo: '/login'
		});
});
