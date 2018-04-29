"use strict";

angular.module("cv.directives")
    .controller("starQuestionController", ["$scope",
        function ($scope) {
            var ngModel;

            var lastSelectedValue;
            
            $scope.showNa = false;
            $scope.naValue = false;
            $scope.size = 0;

            this.init = function (min, max, ngModelController, question) {
                ngModel = ngModelController;
                ngModel.$render = this.render;
                var value = ($scope.data.answers[0] == undefined) ? 0 : $scope.data.answers[0];
                
                ngModel.$setViewValue(value);
                $scope.preview = -1;

                $scope.stars = new Array(max - min + 1);

                // NA
                if ($scope.data.properties.options[2].na === true) {
                    $scope.showNa = true;
                }

                if ($scope.data.answers[0] === -1) {
                    $scope.naValue = true;
                }
            };

            this.render = function () {
                if (ngModel.$viewValue === 0) {
                    $scope.data.answers = [];
                } else {
                    $scope.data.answers[0] = ngModel.$viewValue;
                }
            };

            $scope.click = function ($index) {
                if ($scope.naValue) {
                    return;
                }

                if (ngModel.$viewValue - 1 === $index) {
                    ngModel.$setViewValue(0);
                } else {
                    ngModel.$setViewValue($index+1);
                }
                ngModel.$render();               
            };

            $scope.mouseover = function($index) {
                if ($scope.naValue) {
                    return;
                }
                $scope.preview = $index + 1;
            };
            
            $scope.mouseout = function() {
                $scope.preview = -1;
            };
            $scope.styles = function ($index) {
                return {
                    "glyphicon": true,
                    "glyphicon-star": true,
                    "cv-star-size": true,
                    "cv-star-selected": $index < $scope.data.answers[0],
                    "cv-star-preview": $index + 1 <= $scope.preview
                };
            };

            $scope.toggleNa = function () {
                if ($scope.data.answers[0] === -1) {
                    if (angular.isUndefined(lastSelectedValue)) {
                        $scope.data.answers = [];
                    } else {
                        $scope.data.answers[0] = lastSelectedValue;
                    }
                } else {
                    lastSelectedValue = $scope.data.answers[0];
                    $scope.data.answers[0] = -1;
                 }
            }
        }
    ]);