"use strict";
var cvCheckboxController = (function () {
    function cvCheckboxController($rootScope, $scope, $log) {
        this.data = $scope.data;
        this.$scope = $scope;
        this.model = $scope.model;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.init();
        this.answers = [];
    }
    cvCheckboxController.prototype.setAnswer = function (option, event) {
        event.preventDefault();
        event.stopPropagation();
        if (!option.checked) {
            this.answers.push(option.value);
        }
        else {
            var index = this.answers.indexOf(option.value);
            this.answers.splice(index, 1);
        }
        this.data.answers[0] = this.answers;
    };
    cvCheckboxController.prototype.init = function () {
    };
    ;
    cvCheckboxController.$inject = ["$rootScope", "$scope", "$log"];
    return cvCheckboxController;
}());
angular.module("cv.theme").controller("cvCheckboxController", cvCheckboxController);
//# sourceMappingURL=cvCheckboxController.js.map