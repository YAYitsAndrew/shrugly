angular.module("LoginCtrl", [])
.controller("LoginController", [ "$http", "$location", "$scope", function($http, $location, $scope) {
	$scope.credentials = {};
	
	$scope.authenticate = function(credentials) {
		$http.post("/login", credentials)
		.then(
			function(res) { //success
				$scope.credentials = {};
				$location.path("/admin");
			},
			function(res) { //error
				//do nothing
			}
		);
	};
}]);
