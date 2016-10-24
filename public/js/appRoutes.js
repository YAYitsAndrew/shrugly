angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	$routeProvider
	
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		});
	
	$locationProvider.html5Mode(true);

}]);
