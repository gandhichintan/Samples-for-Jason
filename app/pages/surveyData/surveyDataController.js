"use strict";
var onboardingController = (function () {
    function onboardingController($log, $rootScope, $scope, $controller, $translate) {
        var _this = this;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$translate = $translate;
        this.validate = function () {
            var error = _.filter(_this.model.getCurrentBlock(), function (question) { return question.visible && !question.validate(); });
            if (_.isEmpty(error)) {
                _this.$scope.$emit("goToNextPageEndEvent", true);
            }
            else {
                _this.$scope.$emit("goToNextPageEndEvent", false, _this.$translate.instant(_.first(error).errorMessage));
            }
        };
        $controller("pageBaseController", { $scope: this.$scope });
        if (!this.$scope.pageInit()) {
            return;
        }
        this.$scope.model = this.model = $rootScope.survey.getCurrentPage();
        this.$scope.pageClass = "page-" + $rootScope.pageId;
        this.$scope.$on("validate_" + $rootScope.survey.getCurrentPage().controller, this.validate);
    }
    onboardingController.$inject = ["$log", "$rootScope", "$scope", "$controller", "$translate"];
    onboardingController.id = "questionsPageController";
    return onboardingController;
}());

angular.module("cv.controllers").controller(onboardingController.id, onboardingController);
//# sourceMappingURL=questionsPageController.js.map