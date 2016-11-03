angular.module("HeaderDir", [])
.directive("header", [function() {
	return {
		restrict: "A",
		replace: true,
		scope: { user: "=" },
		templateUrl: "views/header.html",
		controller: ["$http", "$location", "$scope", "$rootScope",
		function($http, $location, $scope, $rootScope) {
			$scope.credentials = {};
			
			$scope.login = function(credentials) {
				$http.post("/login", credentials)
				.then(
					function(res) { //success
						$scope.credentials = {};
						$rootScope.user = res.data;
					},
					function(res) { //error
						//do nothing
					}
				);
			};
			
			$scope.logout = function() {
				$http.get("/logout")
				.then(
					function(res) { //success
						$rootScope.user = undefined;
						$location.path("/");
					},
					function(res) { //error
						//do nothing
					}
				);
			};
		}]
	};
}]);