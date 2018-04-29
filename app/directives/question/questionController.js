"use strict";
var QuestionController = (function () {
    function QuestionController($scope) {
        $scope.question = $scope.item;
        $scope.visible = $scope.item.visible;
        $scope.getItemCssClass = function () { return _.isUndefined($scope.item.cssClass) ? "" : $scope.item.cssClass.join(" "); };
    }
    QuestionController.$inject = ["$scope"];
    return QuestionController;
}());
angular.module("cv.directives").controller("questionController", QuestionController);
//# sourceMappingURL=questionController.js.map