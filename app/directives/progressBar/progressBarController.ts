/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />

"use strict";

class ProgressBarController {
    static $inject: Array<string> = ["$rootScope", "$element"];
    static measure = "px";
    static startPageFactor = 1;
    static endPageFactor = 1;

    private rootScope: ng.IRootScopeService; // todo define RootScope boilerplate
    private element : JQuery;

    constructor($rootScope : ng.IRootScopeService, $element : JQuery) {
        this.rootScope = $rootScope;
        this.element = $element;
    }

    getWidth(): string {
        let self = ProgressBarController,
            masterBarWidth = parseFloat(this.element.css("width").split(self.measure)[0]),
            totalPages = this.rootScope.survey.pages.length - self.endPageFactor,
            eachPageProgress = (masterBarWidth / totalPages),
            currentPage = this.rootScope.surveyPages.currentIndex(),
            progress = eachPageProgress * (currentPage - self.startPageFactor);

        return progress + self.measure;
    }
}

angular.module("cv.directives")
    .controller("progressBarController", ProgressBarController);