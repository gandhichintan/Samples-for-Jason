"use strict";

angular.module("cv.directives")
    .directive("squaresSlider", [
        "directivesPath", function (directivesPath) {
            var templateUrl = directivesPath + "squaresSlider/squaresSliderTemplate.html";
            return {
                restrict: "AE",
                replace: true,
                templateUrl: templateUrl,
                controller: "SquaresSliderController",
                scope: {
                    data: "=data",
                    model: "=ngModel"
                }
            }
        }]);