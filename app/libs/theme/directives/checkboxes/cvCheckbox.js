'use script';
angular.module('cv.theme')
    .directive('cvCheckbox', cvCheckbox);

function cvCheckbox() {
  return {
    restrict: 'EA',
    templateUrl: '/app/libs/theme/directives/checkboxes/checkboxes.html',
	scope: {
		name: '@',
        options: '=',
	},
  };
}