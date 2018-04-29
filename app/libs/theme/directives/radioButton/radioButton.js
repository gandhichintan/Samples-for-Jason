'use strict';
angular.module('cv.theme')
.directive('cvRadiobutton', cvRadiobutton);

function cvRadiobutton() {
    return {
        restrict: 'EA',
        templateUrl: '/app/libs/theme/directives/radioButton/radioButton.html',
        scope: { data: "=", model: "=ngModel" },
        link: function (scope, element) {
            scope.active = null;
            scope.check = function (index) {
                scope.active = index;
            }
        }
    };
}