angular.module("AdminCtrl", ["AsciimojiService"])
.controller("AdminController", [ "Asciimoji", "$scope", function(Asciimoji, $scope) {
	
	Asciimoji.get()
	.then(
		function(res) {
			$scope.asciimojis = res.data;
		},
		function(res) {
			$scope.asciimojis = [];
		}
	);

	$scope.addAsciimoji = function(asciimoji) {
		Asciimoji.create(asciimoji);
	};
	
	$scope.deleteAsciimoji = function(asciimoji) {
		Asciimoji.delete(asciimoji._id);
	}
	
}]);