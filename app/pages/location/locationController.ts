"use strict";

class LocationController {
    static $inject = ["$log", "$rootScope", "$scope", "$controller", "$translate", "environmentService", "$surveyHttp"];
    static id = "locationController";

    model: Page;
    locations: any;
    private $scope: any;


    constructor(
        private $log: ng.ILogService,
        private $rootScope: ICVRootScope,
        $scope: any,
        $controller: ng.IControllerService,
        private $translate: ng.translate.ITranslateService,
        private environmentService: environmentService.IEnvironmentService,
        private $surveyHttp,
        private questinService: QuestionsPageController
    ) {

        this.$scope = $scope;

        $controller("pageBaseController", { $scope: this.$scope });

        if (!this.$scope.pageInit()) {
            return;
        }

        this.$log.debug(this.environmentService.imageDirectory);

        this.$scope.environment = this.environmentService;
        this.$scope.model = this.model = $rootScope.survey.getCurrentPage();
        this.$scope.pageClass = `page-${$rootScope.pageId}`;
        this.$scope.$on(`validate_${$rootScope.survey.getCurrentPage().controller}`, this.validate);

        this.getCities();

        this.$scope.$watch('questions[0][0].answers[0]', (newValue, oldValue) => {
            $log.debug("Watching...new ", newValue);
            $log.debug("Watching...old ", oldValue);
            if (newValue !== oldValue) {
                $log.debug("calling location...");
                this.getLocations(newValue);
            }
        });
    }

    getCities() {
        this.$log.debug("getting cities...");
        this.$surveyHttp.getCities().success((result: any) => {
            this.$log.debug("this.$scope.questions[0]: ", this.$scope.questions[0]);
            this.$scope.questions[0][0].properties.options = result.cities;
        })
            .error((data, status) => {
                throw `${data} ${status}`;
            });
    }

    getLocations(state) {
        this.$surveyHttp.getLocations(state).success((result: any) => {

            var oldValue = this.$scope.questions[0][1].answers[0];

            this.$log.debug("Watching...old ", oldValue);
            this.$log.debug("Watching...this.$scope.questions[0][1]", this.$scope.questions[0][1]);

            this.$scope.questions[0][1].properties.options = result.locations;
            this.$scope.questions[0][1].answers[0] = undefined;
            this.$scope.questions[0][1].properties.selected = undefined;

            if (result.locations.length === 1) {
                this.$scope.questions[0][1].answers[0] = result.locations[0].value;
                this.$scope.questions[0][1].properties.selected = result.locations[0];
            }
        })
            .error((data, status) => {
                throw `${data} ${status}`;
            });
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


angular.module("cv.controllers").controller(LocationController.id, LocationController);