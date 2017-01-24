'use strict';

angular.module('myApp.dns-manager-edit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dns-manager/edit', {
    templateUrl: 'dns-manager-edit/dns-manager-edit.html',
    controller: 'dns-manager-edit-ctl'
  });

    $routeProvider.when('/dns-manager/add', {
        templateUrl: 'dns-manager-edit/dns-manager-edit.html',
        controller: 'dns-manager-edit-ctl'
    });

}])

.controller('dns-manager-edit-ctl', function($scope, $location, $http) {

    $scope.dnsId = $location.search().id;

    if ($scope.dnsId){
        $http({
            method : "GET",
            url : "/v1/dns/"+$location.search().id
        }).then(function mySucces(response) {
            $scope.dns = response.data;
            $scope.dnsCopy = JSON.stringify($scope.dns)
        }, function myError(response) {
            $scope.error = response.statusText;
        });
    } else { // New
        $scope.dns = {
            id: "",
            name: "",
            ttl: 0,
            bypass: false,
            value: ""
        }
        $scope.dnsCopy = JSON.stringify($scope.dns)
    }


    $scope.isDirty = function () {
        return JSON.stringify($scope.dns) != $scope.dnsCopy
    }

    $scope.save = function () {
        if ($scope.isDirty()){
            if ($scope.dnsId){
                $http({url: "/v1/dns/"+$location.search().id,
                       method: 'put',
                       data: $scope.dns}).then(
                    resp => {
                        $location.path("/dns-manager");
                    },
                    error => {
                        alert("Error: "+JSON.stringify(error));
                    })
            } else {
                $scope.dns.id = $scope.dns.name;
                $http({method: 'post',
                       url: "/v1/dns",
                       data: $scope.dns}).then((resp)=>{
                    $location.path("/dns-manager");
                }, (error)=>{
                    alert("Error: "+JSON.stringify(error));
                })
            }

        }
    }

});