"use strict";

class NavigationBarController {
    static $inject = ["$log", "$rootScope", "$scope", "$timeout", "$filter"];

    showProgressBar: boolean;
    showPreviousButton: boolean;
    showNextButton: boolean;
    disableNextButton: boolean;
    nextClicked: boolean;
    backClicked: boolean;
    surveyInfo: any;
    surveyPages: any;

    constructor(private $log: ng.ILogService, private $rootScope: ICVRootScope, $scope: ng.IScope, private $timeout: ng.ITimeoutService, private $filter: ng.IFilterService) {
        this.setPageInformation();
        $scope.$watch(() => this.$rootScope.survey.getCurrentPage().canRetreat, (newValue: boolean, oldValue: boolean) => {
            if (newValue !== oldValue) {
                this.showPreviousButton = newValue;
            }
        });
        $scope.$watch(() => this.$rootScope.survey.getCurrentPage().canAdvance, (newValue: boolean, oldValue: boolean) => {
            if (newValue !== oldValue) {
                this.showNextButton = newValue;
            }
        });

        this.disableNextButton = false;
        this.nextClicked = false;
        this.backClicked = false;
        this.surveyInfo = this.$rootScope.survey;
        this.surveyPages = $filter("filter")(this.$rootScope.survey.pages, { visible: true });
    }

    setPageInformation(): void {
        this.showPreviousButton = this.$rootScope.survey.getCurrentPage().canRetreat;
        this.showNextButton = this.$rootScope.survey.getCurrentPage().canAdvance;
    }

    goToNextPage(): void {
        if (this.disableNextButton) {
            return;
        }
        this.$rootScope.$broadcast("goToNextPageStartEvent");
        //this.blockForwardNavigation(0.5);
        this.nextClicked = true;
        this.$timeout(() => {
            this.nextClicked = false;
        }, 400);
        this.setPageInformation();
    };

    goToPreviousPage(): void {
        this.$rootScope.$broadcast("goToPreviousPageStartEvent");
        this.backClicked = true;
        this.$timeout(() => {
            this.backClicked = false;
        }, 400);
        this.setPageInformation();
    };

    blockForwardNavigation(seconds): void {
        this.disableNextButton = true;
        this.$timeout(() => {
            this.disableNextButton = false;
        }, seconds * 1000);
    }

    start(): void {
        this.$rootScope.$broadcast("startSurvey");
        this.setPageInformation();
    }

    isMobile(): boolean {
        return $("body").hasClass("mobile-browser");
    }

    longPress(button: string): void {
        button == "next" ? this.nextClicked = true : this.backClicked = true;
    }

    removeHover(): void {
        this.nextClicked = this.backClicked = false;
    }

    inFirstPage = (): boolean => this.$rootScope.survey.getCurrentPage().name === this.$rootScope.survey.pages[0].name;
}

(() => {
    angular.module("cv.directives").controller("navigationBarController", NavigationBarController);
})();