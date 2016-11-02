angular.module("HeaderDir", [])
.directive("header", [function() {
	return {
		restrict: "A",
		replace: true,
		templateUrl: "views/header.html"
	};
}]);