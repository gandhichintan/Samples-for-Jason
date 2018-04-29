"use strict";

angular.module("cv.directives")
   .directive("greenDotSlider", ["directivesPath", function (directivesPath) {
       var templateUrl = directivesPath + "greenDotSlider/greenDotSlider.html";

       return {
            restrict: "AEC",
            replace: true,

            require: ["greenDotSlider", "ngModel"],
            controller: "greenDotSliderController",
            templateUrl: templateUrl,
            scope: {
            },
            link: function (scope, element, attributes, controllers) {
              
            },
        };
   }]);