angular.module("appRoutes", [])
.config(["$routeProvider", "$httpProvider", "$locationProvider",
	function($routeProvider, $httpProvider, $locationProvider) {
		var checkAuth = ["$q", "$http", "$location", function($q, $http, $location) {
			var deferred = $q.defer();

			var failFunc = function() {
				deferred.reject();
				$location.url("/login");
			};

			$http.get("/loggedin").then(
				function(res) { //success
					if(res.data !== '0') {
						deferred.resolve();
					} else {
						failFunc();
					}
				},
				function(err) { //error
					failFunc();
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
			.when("/login", {
				templateUrl: "views/login.html",
				controller: "LoginController"
			})
			.when("/", {
				templateUrl: "views/main.html",
				controller: "MainController"
			});

		$locationProvider.html5Mode(true);
	}
]);
