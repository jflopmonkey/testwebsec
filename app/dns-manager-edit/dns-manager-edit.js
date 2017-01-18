'use strict';

angular.module('myApp.dns-manager-edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dns-manager/edit', {
    templateUrl: 'dns-manager-edit/dns-manager-edit.html',
    controller: 'dns-manager-edit-ctl'
  });
}])

.controller('dns-manager-edit-ctl', function($scope, $location, $http) {

    $scope.dnsId = $location.search().id

    $http({
        method : "GET",
        url : "/v1/dns/"+$location.search().id
    }).then(function mySucces(response) {
        $scope.dns = response.data;
        $scope.dnsCopy = JSON.stringify($scope.dns)
    }, function myError(response) {
        $scope.error = response.statusText;
    });

    $scope.isDirty = function () {
        return JSON.stringify($scope.dns) != $scope.dnsCopy
    }

    $scope.save = function () {
        if ($scope.isDirty()){
            alert("saving...");
        }
    }

});