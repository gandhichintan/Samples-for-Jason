"use strict";


let sliderProvider = (directivesPath) => {
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
        templateUrl: `${directivesPath}slider/slider.html`,
        link: (scope: IDirectiveScope, element: ng.IAugmentedJQuery) => {
            scope.element = element;
        }
    };
}

angular.module("cv.directives").directive("slider", ["directivesPath", sliderProvider]);
