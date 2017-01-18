'use strict';

angular.module('myApp.dns-manager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dns-manager', {
    templateUrl: 'dns-manager/dns-manager.html',
    controller: 'dns-manager-ctl'
  });
}])

.controller('dns-manager-ctl', function($scope, $http) {
    $http({
        method : "GET",
        url : "/v1/dns"
    }).then(function mySucces(response) {
        $scope.dns = response.data;
    }, function myError(response) {
        $scope.dns = response.statusText;
    });
});