(function () {
    'use strict';
    angular.module('cv.theme')
    .directive('cvButtongroup', cvButtongroup)

    function cvButtongroup() {
        return {
            restrict: 'EA',
            templateUrl: '/app/libs/theme/directives/buttonGroup/buttonGroup.html',
            scope: {
                item: '=',
            },
            link: function (scope, element) {
                scope.buttons = scope.item;
                scope.setActive = function (index) {
                    if (index == scope.activeElement)
                        scope.activeElement = undefined;
                    else {
                        scope.activeElement = index;
                    }
                }
            }
        };
    }
})();