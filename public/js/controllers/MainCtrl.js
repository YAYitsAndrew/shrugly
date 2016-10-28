angular.module("MainCtrl", ["AsciimojiService"])
.controller("MainController", ["Asciimoji", "$scope", function(Asciimoji, $scope) {
	Asciimoji.get()
	.then(
		function(res) { //success
			$scope.asciimojis = res.data;
		},
		function(res) { //error
			$scope.asciimojis = [];
		}
	);
}]);

window.onload = function() {
	var clipboard = new Clipboard(".copy-btn");
	
	clipboard.on("error", function(e) {
		console.error("Action:", e.action);
		console.error("Trigger:", e.trigger);
	});
};