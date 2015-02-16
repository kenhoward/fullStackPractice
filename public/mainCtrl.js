var app = angular.module('fullStack');

app.controller('mainCtrl', function($scope, authService) {

	var updateUser = function() {
	authService.updateUser()
		.then(function(data) {
			$scope.user = data;
		})
	}

	updateUser(); // initially it's not

		$scope.logout = function() {
			authService.logout()
				.then(function() {
					authService.updateUser();
				})
		}
})