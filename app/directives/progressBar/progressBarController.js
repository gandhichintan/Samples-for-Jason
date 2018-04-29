/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
"use strict";
var ProgressBarController = (function () {
    function ProgressBarController($rootScope, $element) {
        this.rootScope = $rootScope;
        this.element = $element;
    }
    ProgressBarController.prototype.getWidth = function () {
        var self = ProgressBarController, masterBarWidth = parseFloat(this.element.css("width").split(self.measure)[0]), totalPages = this.rootScope.survey.pages.length - self.endPageFactor, eachPageProgress = (masterBarWidth / totalPages), currentPage = this.rootScope.surveyPages.currentIndex(), progress = eachPageProgress * (currentPage - self.startPageFactor);
        return progress + self.measure;
    };
    ProgressBarController.$inject = ["$rootScope", "$element"];
    ProgressBarController.measure = "px";
    ProgressBarController.startPageFactor = 1;
    ProgressBarController.endPageFactor = 1;
    return ProgressBarController;
})();
angular.module("cv.directives")
    .controller("progressBarController", ProgressBarController);