angular.module("RegisterCtrl", ["ngMessages", "ngPassword"])
.controller("RegisterController", [ "$http", "$location", "$rootScope", "$scope",
function($http, $location, $rootScope, $scope) {
	$scope.newUser = {};
	
	$scope.register = function(isValid) {
		if(isValid) {
			$http.post("/user", $scope.newUser)
			.then(function(res) {
				$scope.newUser = {};
				$rootScope.user = res.data;
				$location.path("/");
			})
			.catch(function(err) {
				console.log(err);
			});
		}
	};
}]);