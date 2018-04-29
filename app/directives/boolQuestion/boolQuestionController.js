"use strict";

angular.module("cv.directives").controller("boolQuestionController",
    ["$scope",
    function ($scope) {
        init();

        function init() {
            var question = $scope.data;
            if (question.hasAnswer()) {
                $scope.selectedValue = $scope.data.getAnswer();
                $scope.model = $scope.data.getAnswer();
                $scope.data.answers = $scope.data.getAnswer();
                
            }
        }

        $scope.select = function (item) {
            if (item === $scope.selectedValue) {
                $scope.selectedValue = null;
                $scope.data.answers = [];
            } else {
                $scope.selectedValue = item;
            }
            $scope.data.answers = [item.value]; // Single choice, only 1 answer allowed
        };

        $scope.isSelected = function (item) {
            var returnValue = $scope.selectedValue === item;
            return returnValue;
        };
    }
]);