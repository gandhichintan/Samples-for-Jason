"use strict";
var SingleCheckbox = (function () {
    function SingleCheckbox($scope, $timeout, $rootScope, $log) {
        var _this = this;
        this.$scope = $scope;
        this.run = function () {
            _this.answer = _this.$scope.model.answers[0] || false;
        };
        this.$scope = $scope;
        this.model = this.$scope.model;
        this.id = this.model.id;
        this.run();
    }
    SingleCheckbox.prototype.toggle = function (event) {
        this.answer = !this.answer;
        this.$scope.model.answers[0] = this.answer;
        event.stopPropagation();
        event.preventDefault();
    };
    SingleCheckbox.id = "singleCheckboxController";
    SingleCheckbox.$inject = ["$scope", "$timeout", "$rootScope", "$log"];
    return SingleCheckbox;
}());
angular.module("cv.directives")
    .controller('singleCheckboxController', SingleCheckbox);
//# sourceMappingURL=singleCheckboxController.js.map