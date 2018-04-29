"use strict";

(function () {
    var copyrightController = function($scope, $rootScope,$translate) {
        $scope.currentYear = new Date().getFullYear();

        $scope.getTextColor = function() {
            return ($rootScope.surveyType === "gold") ? "white" : "black";
        }

        $scope.getLanguage = function () {
            return $translate.use();
        } 
    };

    angular.module("cv.directives").controller("copyrightController",
    ["$scope", "$rootScope","$translate", copyrightController]);
})();

