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
				if(err.status === 409) {
					$("#alert-msg").text(err.data);
					$("#reg-alert").removeClass("hide").addClass("in");
				}
			});
		}
	};
	
	$scope.hideAlert = function() {
		$("#reg-alert").addClass("hide").removeClass("in");
	}
}]);