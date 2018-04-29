"use strict";
var QuestionsPageController = (function () {
    function QuestionsPageController($log, $rootScope, $scope, $controller, $translate, environmentService) {
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
        this.$log.debug(this.environmentService.imageDirectory);
        this.$scope.environment = this.environmentService;
        this.$scope.model = this.model = $rootScope.survey.getCurrentPage();
        this.$scope.pageClass = "page-" + $rootScope.pageId;
        this.$scope.$on("validate_" + $rootScope.survey.getCurrentPage().controller, this.validate);
    }
    QuestionsPageController.$inject = ["$log", "$rootScope", "$scope", "$controller", "$translate", "environmentService"];
    QuestionsPageController.id = "questionsPageController";
    return QuestionsPageController;
}());
angular.module("cv.controllers").controller(QuestionsPageController.id, QuestionsPageController);
//# sourceMappingURL=questionsPageController.js.map