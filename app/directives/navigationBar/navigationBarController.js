"use strict";
var NavigationBarController = (function () {
    function NavigationBarController($log, $rootScope, $scope, $timeout, $filter) {
        var _this = this;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$filter = $filter;
        this.inFirstPage = function () { return _this.$rootScope.survey.getCurrentPage().name === _this.$rootScope.survey.pages[0].name; };
        this.setPageInformation();
        $scope.$watch(function () { return _this.$rootScope.survey.getCurrentPage().canRetreat; }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                _this.showPreviousButton = newValue;
            }
        });
        $scope.$watch(function () { return _this.$rootScope.survey.getCurrentPage().canAdvance; }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                _this.showNextButton = newValue;
            }
        });
        this.disableNextButton = false;
        this.nextClicked = false;
        this.backClicked = false;
        this.surveyInfo = this.$rootScope.survey;
        this.surveyPages = $filter("filter")(this.$rootScope.survey.pages, { visible: true });
    }
    NavigationBarController.prototype.setPageInformation = function () {
        this.showPreviousButton = this.$rootScope.survey.getCurrentPage().canRetreat;
        this.showNextButton = this.$rootScope.survey.getCurrentPage().canAdvance;
    };
    NavigationBarController.prototype.goToNextPage = function () {
        var _this = this;
        if (this.disableNextButton) {
            return;
        }
        this.$rootScope.$broadcast("goToNextPageStartEvent");
        //this.blockForwardNavigation(0.5);
        this.nextClicked = true;
        this.$timeout(function () {
            _this.nextClicked = false;
        }, 400);
        this.setPageInformation();
    };
    ;
    NavigationBarController.prototype.goToPreviousPage = function () {
        var _this = this;
        this.$rootScope.$broadcast("goToPreviousPageStartEvent");
        this.backClicked = true;
        this.$timeout(function () {
            _this.backClicked = false;
        }, 400);
        this.setPageInformation();
    };
    ;
    NavigationBarController.prototype.blockForwardNavigation = function (seconds) {
        var _this = this;
        this.disableNextButton = true;
        this.$timeout(function () {
            _this.disableNextButton = false;
        }, seconds * 1000);
    };
    NavigationBarController.prototype.start = function () {
        this.$rootScope.$broadcast("startSurvey");
        this.setPageInformation();
    };
    NavigationBarController.prototype.isMobile = function () {
        return $("body").hasClass("mobile-browser");
    };
    NavigationBarController.prototype.longPress = function (button) {
        button == "next" ? this.nextClicked = true : this.backClicked = true;
    };
    NavigationBarController.prototype.removeHover = function () {
        this.nextClicked = this.backClicked = false;
    };
    NavigationBarController.$inject = ["$log", "$rootScope", "$scope", "$timeout", "$filter"];
    return NavigationBarController;
}());
(function () {
    angular.module("cv.directives").controller("navigationBarController", NavigationBarController);
})();
//# sourceMappingURL=navigationBarController.js.map