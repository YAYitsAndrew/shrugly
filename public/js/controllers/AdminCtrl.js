angular.module("AdminCtrl", ["AsciimojiService"])
.controller("AdminController", ["Asciimoji", "$scope", function(Asciimoji, $scope) {
	
	$scope.newAsciimoji = {};
	
	Asciimoji.get()
	.then(
		function(res) { //success
			$scope.asciimojis = res.data;
		},
		function(res) { //error
			$scope.asciimojis = [];
		}
	);

	$scope.addAsciimoji = function(asciimoji) {
		Asciimoji.create(asciimoji)
		.then(
			function(res) { //success
				$scope.asciimojis.push(res.data);
				$scope.newAsciimoji = {};
			},
			function(res) { //error
				//do nothing
			}
		);
	};
	
	$scope.deleteAsciimoji = function(asciimoji) {
		Asciimoji.delete(asciimoji._id)
		.then(
			function(res) { //success
				var idx = $scope.asciimojis.indexOf(asciimoji);
				if(idx >= 0) {
					$scope.asciimojis.splice(idx, 1);
				}
				
			},
			function(res) { //error
				//do nothing
			}
		);
	}
	
}]);