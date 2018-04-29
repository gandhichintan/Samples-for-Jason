"use strict";

angular.module("cv.directives").controller("blockUiController",
    ["$scope", "$rootScope", "$timeout",
    function ($scope, $rootScope, $timeout) {
        var callsToUnblock = 0;

        //$scope.loadingMessage = $rootScope.AppStrings.text.loading;
        $scope.loadingMessage = "Cargando...";//TODO!!
        $scope.opacity = 0;

        $scope.step = $scope.step || 0.2;
        $scope.delay = $scope.delay || 500;

        $scope.$on("blockUiMessage",
            function (event, args) {
                $scope.opacity = 1;
                $scope.visibility = "visible";
            });

        $scope.$on("unblockUiMessage",
            function (event, args) {
                $timeout(function () {
                    $scope.opacity = 0;
                    $scope.visibility = "hidden";
                }, $scope.delay); // just wait
            });

        /*
        // FADE IN AND OUT LOGIC

        $scope.$on('blockUiMessage',
            function (event, args) {
                if ($scope.opacity >= 1) {
                    return;
                }

                $scope.visibility = "visible";
                fadeIn();
            });

        function fadeIn() {
            $scope.opacity += $scope.step;

            if ($scope.opacity < 1) {
                $timeout(function() {
                    fadeIn();
                }, $scope.delay);
            } else if (callsToUnblock) {
                fadeOut();
                callsToUnblock = 0;
            }
        }

        $scope.$on('unblockUiMessage',
            function (event, args) {
                callsToUnblock++;
                if ($scope.opacity <= 0) {
                    return;
                }

                $timeout(function () { }, 1000); // just wait
                fadeOut();
            });

        function fadeOut() {
            $scope.opacity -= $scope.step;

            if ($scope.opacity > 0) {
                $timeout(function() {
                    fadeOut();
                }, $scope.delay);
            } else {
                $scope.visibility = "hidden";
            }
        }*/
    }
]);