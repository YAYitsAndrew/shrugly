angular.module("LoginCtrl", [])
.controller("LoginController", ["$http", "$scope", "$rootScope", function($http, $scope, $rootScope) {
	$scope.credentials = {};
	
	$scope.authenticate = function(credentials) {
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
}]);
