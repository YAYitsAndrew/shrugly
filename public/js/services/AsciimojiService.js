angular.module('AsciimojiService', []).factory('Asciimoji', ['$http', function($http) {
	var endpoint = '/api/asciimoji';
	
	return {
		get : function() {
			return $http.get(endpoint);
		},
		
		create : function(data) {
			return $http.post(endpoint, data);
		},
		
		delete: function(id) {
			return $http.delete(endpoint + '/' + id);
		}
	};
}]);
