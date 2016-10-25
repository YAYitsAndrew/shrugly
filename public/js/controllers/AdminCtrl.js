angular.module("AdminCtrl", ["AsciimojiService"])
.controller("AdminController", [ "Asciimoji", "$scope", function(Asciimoji, $scope) {
	
	//this.$onInit = function() {
		console.log("oninit");
		Asciimoji.get()
		.then(
			function(res) {
				$scope.asciimojis = res.data;
				console.log("got it " + res.data);
			},
			function(res) {
				$scope.asciimojis = [];
			}
		);

		$scope.addAsciimoji = function(asciimoji) {
			Asciimoji.create(asciimoji);
		};
	//};
	
}]);