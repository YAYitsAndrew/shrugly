angular.module("appRoutes", []).config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	
	$routeProvider
		
		.when("/admin", {
			templateUrl: "views/admin.html",
			controller: "AdminController"
		})
		
		.when("/", {
			templateUrl: "views/main.html",
			controller: "MainController"
		});
	
	$locationProvider.html5Mode(true);

}]);
