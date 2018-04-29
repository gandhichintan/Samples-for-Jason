var cvSelect = (function () {
    'use strict;';
    angular.module('cv.theme')
    .directive('cvSimpleselect', cvSimpleselect)

    function cvSimpleselect() {
        return {
            restrict: 'E',
            templateUrl: '/app/libs/theme/directives/select/cvSelect.html',
            scope: {
                name: '@',
                options: '='
            },
            link: function (scope, element) {
                scope.selectedOption = scope.options[0];
            }
        };
    };
})();