'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

        // objects
        $scope.demoUserName = '';
        $scope.demo = {
            userName: null,
            timing: null
        };
        $scope.userName = localStorage.getItem('userName');
        $scope.today = new Date();
        $scope.toggle = false;
        $scope.selectedIndex = null;
        $scope.selectedData = {
            'timeSpan': null,
            'available': true,
            'firstName': null,
            'lastName': null,
            'contactNo': null
        };

        // Sample appointment array
        $scope.dataArray = [];

        // Custom Init function
        $scope.init = init();

        function init() {
            if ($scope.userName != null || $scope.userName !== undefined) {
                getAppointments();
            }
        }

        // Appointment array through Fake REst api
        function getAppointments() {
            $http.get('./assets/json/appointments.json', {})
                .then(function (response) {
                    $scope.dataArray = response.data;
                }, function (error) {
                    console.error("Error occurred ", error);
                });
        }

        // Appointment event like view, add
        $scope.appointmentEvent = function (idx) {
            $scope.selectedIndex = idx;
            $scope.selectedData = $scope.dataArray[idx];
            $scope.toggle = true;
        };

        // Appointment save, cancel
        $scope.appointment = function (save) {
            if (save) {
                $scope.selectedData.available = false;
                $scope.dataArray[$scope.selectedIndex] = $scope.selectedData;
                $scope.toggle = false;
            } else {
                $scope.toggle = false;
            }
        };

        // logIn using localStorage
        $scope.logIn = function () {
            localStorage.setItem('userName', $scope.demo.userName);
            $scope.userName = $scope.demo.userName;
            getAppointments();
        };

        // logout using localStorage
        $scope.logout = function () {
            localStorage.setItem('userName', undefined);
            localStorage.removeItem('userName');
            $scope.userName = null;
        };

    }])

    .directive('appointmentCardTitle', [function () {
        return {
            restrict: 'E',
            scope: {
                heading: '=',
                available: '='
            },
            templateUrl: './view1/appointment-card-title.html',
            link: function (scope, element, attribute) {
            }
        }
    }]);