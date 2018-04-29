"use strict";

interface ICVControllerScope extends ng.IScope {
    pageInit: Function;
    pageClass: string;
    model: Page;
    showErrorMessage: Function;
    environment: any;
}


class QuestionsPageController {
    static $inject = ["$log", "$rootScope", "$scope", "$controller", "$translate", "environmentService"];
    static id = "questionsPageController";

    model: Page;

    constructor(
        private $log: ng.ILogService,
        private $rootScope: ICVRootScope,
        private $scope: ICVControllerScope,
        $controller: ng.IControllerService,
        private $translate: ng.translate.ITranslateService,
        private environmentService: environmentService.IEnvironmentService 
    ) {
        $controller("pageBaseController", { $scope: this.$scope });

        if (!this.$scope.pageInit()) {
            return;
        }
        this.$log.debug(this.environmentService.imageDirectory);
        this.$scope.environment = this.environmentService;
        this.$scope.model = this.model = $rootScope.survey.getCurrentPage();
        this.$scope.pageClass = `page-${$rootScope.pageId}`;
        this.$scope.$on(`validate_${$rootScope.survey.getCurrentPage().controller}`, this.validate);
    }

    

    validate = (): void => {
        const error = _.filter(this.model.getCurrentBlock(),
            (question: Question) => question.visible && !question.validate()
        );

        if (_.isEmpty(error)) {
            this.$scope.$emit("goToNextPageEndEvent", true);
        } else {
            this.$scope.$emit("goToNextPageEndEvent", false, this.$translate.instant(_.first(error).errorMessage));
        }
    }
}


angular.module("cv.controllers").controller(QuestionsPageController.id, QuestionsPageController);