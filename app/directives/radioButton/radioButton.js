'use strict';
angular.module('cv.theme')
.directive('cvRadiobutton', cvRadiobutton);

function cvRadiobutton() {
    return {
        restrict: 'EA',
        templateUrl: '/app/directives/radioButton/radioButton.html',
        scope: { data: "=", model: "=ngModel" },
        link: function (scope, element) {
            scope.active = null;

            (function () {
                for (var option in scope.data.properties.options) {
                    if (scope.data.answers[0] === scope.data.properties.options[option].value) {
                        scope.active = parseInt(option);
                    }
                }
            })();

            scope.check = function (index, event) {
                scope.active = index;
                scope.data.answers[0] = scope.data.properties.options[scope.active].value;
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
}