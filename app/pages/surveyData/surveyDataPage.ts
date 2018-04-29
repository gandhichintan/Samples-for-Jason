"use strict";

interface IEnvironmentControllerScope extends ICVControllerScope {
    environment: Function;
}

class OnboardingPageController {
    static $inject = ["$log", "$rootScope", "$scope", "$controller", "$translate", "environmentService"];
    static id = "onboardingPageController";

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

        this.$scope.model = this.model = $rootScope.survey.getCurrentPage();
        this.$scope.pageClass = `page-${$rootScope.pageId}`;
        this.$scope.$on(`validate_${$rootScope.survey.getCurrentPage().controller}`, this.validate);

        environmentService.changeStyle('motherhood', 'motherhood');

        //var envWatcher = function (env, survey) {
        //    $scope.environment = '';
        //};

        //environmentService.watch(envWatcher);

        //$scope.$on('$destroy', function () {
        //    environmentService.unwatch(envWatcher);
        //});
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


angular.module("cv.controllers").controller('onboardingPageController', OnboardingPageController);