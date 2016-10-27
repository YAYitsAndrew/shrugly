angular.module("appRoutes", []).config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	$routeProvider
		.when("/admin", {
			templateUrl: "views/admin.html",
			controller: "AdminController"
		})
		.when("/login", {
			templateUrl: "views/login.html",
			controller: "LoginController"
		})
		.when("/", {
			templateUrl: "views/main.html",
			controller: "MainController"
		});
	
	$locationProvider.html5Mode(true);
}]);
