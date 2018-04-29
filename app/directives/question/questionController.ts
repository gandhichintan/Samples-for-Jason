"use strict";

class QuestionController {
    static $inject = ["$scope"];

    constructor($scope) {
        $scope.question = $scope.item;
        $scope.visible = $scope.item.visible;

        $scope.getItemCssClass = (): string => _.isUndefined($scope.item.cssClass) ? "" : $scope.item.cssClass.join(" ");
    }
}

angular.module("cv.directives").controller("questionController", QuestionController);