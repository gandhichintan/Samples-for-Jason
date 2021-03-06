"use strict";
var OnboardingPageController = (function () {
    function OnboardingPageController($log, $rootScope, $scope, $controller, $translate, environmentService) {
        var _this = this;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$translate = $translate;
        this.environmentService = environmentService;
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
        environmentService.changeStyle('motherhood', 'motherhood');
        //var envWatcher = function (env, survey) {
        //    $scope.environment = '';
        //};
        //environmentService.watch(envWatcher);
        //$scope.$on('$destroy', function () {
        //    environmentService.unwatch(envWatcher);
        //});
    }
    OnboardingPageController.$inject = ["$log", "$rootScope", "$scope", "$controller", "$translate", "environmentService"];
    OnboardingPageController.id = "onboardingPageController";
    return OnboardingPageController;
}());
angular.module("cv.controllers").controller('onboardingPageController', OnboardingPageController);
//# sourceMappingURL=surveyDataPage.js.map