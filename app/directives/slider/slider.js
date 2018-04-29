"use strict";
var sliderProvider = function (directivesPath) {
    return {
        restrict: "AEC",
        replace: true,
        require: ["slider"],
        scope: {
            data: "=",
            model: "=ngModel"
        },
        controller: SliderController.id,
        controllerAs: "vm",
        templateUrl: directivesPath + "slider/slider.html",
        link: function (scope, element) {
            scope.element = element;
        }
    };
};
angular.module("cv.directives").directive("slider", ["directivesPath", sliderProvider]);
//# sourceMappingURL=slider.js.map