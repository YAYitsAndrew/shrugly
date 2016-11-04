angular.module("appRoutes", [])
.config(["$routeProvider", "$httpProvider", "$locationProvider",
	function($routeProvider, $httpProvider, $locationProvider) {
		var checkAuth = ["$q", "$http", "$rootScope", function($q, $http, $rootScope) {
			var deferred = $q.defer();

			$http.get("/loggedin").then(
				function(res) { //success
					if(res.data !== '0') {
						$rootScope.user = res.data;
					}
					
					deferred.resolve();
				},
				function(err) { //error
					deferred.resolve();
				}
			);

			return deferred.promise;
		}];
		
		$routeProvider
			.when("/admin", {
				templateUrl: "views/admin.html",
				controller: "AdminController",
				resolve: {
					loggedin: checkAuth
				}
			})
			.when("/register", {
				templateUrl: "views/register.html",
				controller: "RegisterController"
			})
			.when("/", {
				templateUrl: "views/main.html",
				controller: "MainController",
				resolve: {
					loggedin: checkAuth
				}
			});

		$locationProvider.html5Mode(true);
	}
]);
