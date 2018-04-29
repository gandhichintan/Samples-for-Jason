"use strict";

/* Services */
angular.module("cv.surveyNav")
	.factory("$surveyNav",
	["$rootScope", "$surveyHttp", "$surveyAnalytics", "$surveyUtils", "$state", "$http", "$surveyAns", "toaster","$surveyNavigator",
    function ($rootScope, $surveyHttp, $surveyAnalytics, $surveyUtils, $state, $http, $surveyAns, toaster, $surveyNavigator) {

        var factory = {};

        factory.showErrorMessage = function (ex) {
            toaster.pop({
                type: "error",
                title: "Question required",
                body: ex.message,
                showCloseButton: true
            });
        };

        // Init page
        factory.pageInit = function () {
            var page = $rootScope.survey.getCurrentPage();
            // Check if the session has expired
            if (factory.isSessionExpired()) {
                factory.resetSurvey();
                factory.redirectToFirstPage();
                return false;
            }

            // Reset survey if its the last page
            if ((page.name === "thankYou") || (page.name === "thankYou-redflag")) {
                $surveyNavigator.cleanLocalStorage();
            }

            return true;
        };

        factory.resetSurvey = function () {
            $rootScope.survey.clearProgress();
            $surveyAns.clearAnswers();
            this.redirectToFirstPage();
        };

        factory.redirectToFirstPage = function () {
            window.location = '/';
        };

        factory.isSessionExpired = function () {

            var currentSession = Customerville.PageInfo.CurrentSession;
            var answers = $surveyAns.loadAnswers();

            if (angular.isUndefined(answers.currentSession)) {
                answers.currentSession = currentSession;
                $surveyAns.saveAnswers(answers);
            }

            if (currentSession != answers.currentSession) {
                return true;
            }
            return false;
        };

        return factory;

    }]);

