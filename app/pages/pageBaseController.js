"use strict";

angular.module("cv.controllers").controller("pageBaseController",
[
    "$rootScope", "$scope", "$surveyAns", "$surveyHttp", "$surveyNavigator", "$log", "$surveyNav", "environmentService",
    function ($rootScope, $scope, $surveyAns, $surveyHttp, $surveyNavigator, $log, $surveyNav, environmentService) {
        var currentPage;
        try {
            init();
        } catch (ex) {
            $surveyNavigator.showErrorMessage(ex); // todo ask Joaquin why error
        }

        function init() {
            $scope.currentPage = currentPage = $rootScope.survey.getCurrentPage();

            $rootScope.$watch(function () {
                return currentPage.currentGroupIndex;
            }, function (value) {
                $log.debug("Current block", value);
            });

            $scope.pageName = currentPage.name;
            $rootScope.pageId = $scope.pageName;
            $scope.title = currentPage.title;
            $scope.quote = currentPage.quote;
            $scope.texts = currentPage.texts;
            $scope.links = currentPage.links;
            $scope.urls = currentPage.urls;
            $scope.footer = currentPage.footer;
            $scope.header = currentPage.header;
            $scope.questions = currentPage.questions;
            $scope.canAdvance = currentPage.canAdvance;
            $scope.canRetreat = currentPage.canRetreat;
            $scope.environment = environmentService;

            $rootScope.environment = environmentService;

            if ($scope.currentPage.id === 9) {
                $scope.updateToken = $rootScope.replaceToken.join(" & ");
            }

            $surveyAns.saveAnswers();
        }

        $scope.pageInit = function () {
            return $surveyNav.pageInit();
        };

        $scope.loadAnswers = function () {
            return $surveyAns.loadAnswers();
        };

        $scope.saveAnswers = function (answers) {
            currentPage.visited = true;
            $surveyAns.saveAnswers(answers);
        };

        $scope.startSurvey = function () {
            $rootScope.$broadcast("goToNextPageStartEvent");
        };

        $scope.start = function () {
            $rootScope.$broadcast("startSurvey");
            setPageInformation();
        }

        function setPageInformation(){
            $scope.showPreviousButton = $rootScope.survey.getCurrentPage().canRetreat;
            $scope.showNextButton = $rootScope.survey.getCurrentPage().canAdvance;
        };

        $scope.findQuestion = function (questionId) {
            var question;
            angular.forEach($scope.questions, function (item) {
                if (item.id === questionId) {
                    question = item;
                }
            });

            return question;
        };
    }
]);