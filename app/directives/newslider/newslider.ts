"use strict";

interface IDirectiveScope {
    element?: ng.IAugmentedJQuery;
}

let newsliderProvider = (directivesPath) => {
    return {
        restrict: "AE",
        replace: true,
        require: ["newslider"],
        scope: {
            data: "=data",
            model: "=ngModel"
        },
        controller: NewSliderController.id,
        controllerAs: "vm",
        templateUrl: `${directivesPath}newslider/newslider.html`,
        link: (scope: any, element: ng.IAugmentedJQuery, attrs, controller: NewSliderController) => {
            scope.element = element;          
            scope.$watch('model', function (oldValue,newValue) {
                controller[0].initSlider();            
            });
        }
    };
}

angular.module("cv.directives").directive("newslider", ["directivesPath", newsliderProvider]);
