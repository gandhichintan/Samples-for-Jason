'use strict';
function cvCheckbox(directivesPath: string) {
    var directive = {
        restrict: 'EA',
        templateUrl: directivesPath + "cvCheckbox/checkbox.html",
        scope: {
            data: "=data",
            model: "=ngModel"
        },
        replace: true,
        controllerAs: "vm",
        controller: 'cvCheckboxController'
    }
    return directive;
}

angular.module("cv.theme")
    .directive("cvCheckbox", ["directivesPath", cvCheckbox]);