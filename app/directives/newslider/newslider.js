"use strict";
var newsliderProvider = function (directivesPath) {
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
        templateUrl: directivesPath + "newslider/newslider.html",
        link: function (scope, element, attrs, controller) {
            scope.element = element;
            scope.$watch('model', function (oldValue, newValue) {
                controller[0].initSlider();
            });
        }
    };
};
angular.module("cv.directives").directive("newslider", ["directivesPath", newsliderProvider]);
//# sourceMappingURL=newslider.js.map