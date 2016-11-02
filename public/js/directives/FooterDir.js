angular.module("FooterDir", [])
.directive("footer", [function() {
	return {
		restrict: "A",
		replace: true,
		templateUrl: "views/footer.html"
	};
}]);