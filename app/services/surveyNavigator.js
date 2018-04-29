"use strict";

(function () {
    var surveyNavigator = function ($rootScope, $state, $surveyAns, $log, $saveSurveyService, storageService, toaster, $surveyHttp) {
        var factory = {};

        function showErrorMessage(message) {
            toaster.pop({
                type: "info",
                title: "",
                body: message || "Error",
                showCloseButton: false
            });
        }

        function cleanLocalStorage() {
            storageService.remove("progress");
            storageService.remove("metadata");
        }

        function toAnswerGroup(question) {
            return {
                questionId: question.id,
                location: question.location,
                answers: question.answers
            };
        }

        function collectPageAnswers(collection, questionsGroup) {
            collection.push(questionsGroup.map(toAnswerGroup));

            return collection;
        }

        function toQuestionProperties(question) {
            return question.properties;
        }

        function collectQuestionsProperties(collection, questionGroup) {
            collection.push(questionGroup.map(toQuestionProperties));
            return collection;
        }


        function saveProgress() {

            if ($rootScope.survey.getCurrentPage().id === 12 || $rootScope.survey.getCurrentPage().id === 11) {
                return;
            }
            console.log("save progress");
            var progress = $rootScope.survey.pages.filter(function (page) {
                return page.visited;
            }).reduce(function (collection, page) {
                collection[page.name] = {
                    answers: page.questions.reduce(collectPageAnswers, new Array()),
                    properties: page.questions.reduce(collectQuestionsProperties, new Array()),
                    currentBlock: page.currentGroupIndex,
                    current: isCurrentPage(page)

                };

                return collection;
            }, new Object());
           
            function isCurrentPage(page) {
                return page == $rootScope.survey.getCurrentPage();
            }

            var hidden = $rootScope.survey.questions.map(toAnswerGroup, new Array());

            storageService.set("hidden", hidden);
            storageService.set("progress", progress);
            storageService.set("metadata", $rootScope.metadata || null);
        }

        function logPageVisit() {
            var currentPage = $rootScope.survey.getCurrentPage();
            var name = currentPage.url + (currentPage.isAtFirstGroup() ? "" : "_" + currentPage.currentGroupIndex);

            $surveyHttp.logPageVisit(name, $rootScope.survey.getCurrentIndex());
        }

        function onStateChangeStart() {
            $log.debug("Changing state...");
        }

        function onStateChangeSuccess(event, toState) {
            $log.debug("State changed. Current is", toState);

            if ($rootScope.survey.hasFinished()) {
                //$rootScope.survey.clearProgress();
                cleanLocalStorage();
            }
        }

        function onLocationChangeSuccess(event, newUrl) {
            logPageVisit();
        }

        function onStateNotFound(event, unfoundState) {
            $log.error(unfoundState.to, unfoundState.toParams, unfoundState.options);
        }

        function goToNextPageWithoutValidationForDebug() {
            if ($rootScope.surveyPages.hasNext()) {
                goToNextPage();
            }
        }

        function askForValidation() {
            $log.debug("Asking for validation to ", $rootScope.survey.getCurrentPage().controller);
            var currentControllerValidationEvent = "validate_" + $rootScope.survey.getCurrentPage().controller;

            $rootScope.$broadcast(currentControllerValidationEvent);
        }

        function goToNextPageStartEvent() {
            try {
                askForValidation();
            } catch (ex) {
                $log.error(ex);
            }
        }

        function notifyChangeOfBlock() {
            logPageVisit();
            $rootScope.$broadcast("blockChanged");
        }

        function goToNextPage() {
            $log.debug("getting next page.");
            var currentPage = $rootScope.survey.getCurrentPage();

            if (currentPage.hasMultipleGroups() && !currentPage.isAtLastGroup() && currentPage.hasVisitableFutureBlock()) {
                $log.debug("Next block");
                currentPage.nextBlock();
                notifyChangeOfBlock();
                //setInterpolations(currentPage);
                return;
            }

            var nextPage = $rootScope.survey.next();
            //setInterpolations(nextPage);

            if (/thankyou/i.test(nextPage.name)) {
                $saveSurveyService.saveSurvey(); // todo review
            }

            go(nextPage);
        }

        function goToNextPageEndEvent(event, validated, message) {
            try {
                if (validated) {
                    if (!$rootScope.survey.hasFinished()) {
                        goToNextPage();
                    }
                } else {
                    showErrorMessage(message);
                }
            } catch (ex) {
                $log.error(ex);
                $rootScope.$broadcast("unblockUiMessage");
            }
        }

        function goToPreviousPageStartEvent(event, toState, toParams, fromState, fromParams) {
            try {
                var currentPage = $rootScope.survey.getCurrentPage();
                if (currentPage.hasMultipleGroups() && !currentPage.isAtFirstGroup() && currentPage.hasVisitablePreviousBlock()) {
                    $log.debug("Previous block");
                    currentPage.previousBlock();
                    notifyChangeOfBlock();
                    //setInterpolations(currentPage);
                    return;
                }

                if (!$rootScope.survey.hasPrevious()) {
                    return;
                }

                var previousPage = $rootScope.survey.previous();
                //setInterpolations(previousPage);
                go(previousPage);
            } catch (ex) {
                $log.error(ex);
            }
        }

        function visitPage() {
            $rootScope.survey.getCurrentPage().visited = true;
        }

        function goToLandingPage() {
            $state.go("landing",true);
        }

        factory.goToLandingPage = goToLandingPage;
        factory.cleanLocalStorage = cleanLocalStorage;

        factory.init = function () {
            $rootScope.$on("$stateChangeStart", onStateChangeStart);
            $rootScope.$on("$stateChangeSuccess", onStateChangeSuccess);
            $rootScope.$on("$locationChangeSuccess", onLocationChangeSuccess);
            $rootScope.$on("$stateNotFound", onStateNotFound);
            $rootScope.$on("goToNextPageWithoutValidationForDebug", goToNextPageWithoutValidationForDebug);
            $rootScope.$on("goToNextPageStartEvent", goToNextPageStartEvent);
            $rootScope.$on("goToNextPageEndEvent", goToNextPageEndEvent);
            $rootScope.$on("goToPreviousPageStartEvent", goToPreviousPageStartEvent);
            $rootScope.$on("$viewContentLoaded", visitPage);
            $rootScope.$on("startSurvey", goToNextPageStartEvent);
            $rootScope.$on("leavingSurvey", saveProgress);
        }

        factory.returnToLasVisitedPage = function () {
            var page = $rootScope.survey.getLastTravelablePage();
            //setInterpolations(page);
            go(page, true);
        }

        factory.returnToLastPage = function () {
            var page = $rootScope.survey.lastPage
            //setInterpolations(page);
            go(page, true);
        }


        factory.goToBlockPage = function () {
            var page = $rootScope.survey.getBlockPage();
            page.visible = true;
            go(page);
        }

        function go(page, force) {
            $log.debug("Trying to go to", page.name, "[", page.url, "]. Current states", $state.get());

            try {
                $state[force ? "go" : "transitionTo"](page.name);
            } catch (ex) {
                $log.error(ex, $state.get());
            }
        }

        factory.showErrorMessage = showErrorMessage;

        return factory;
    };
    surveyNavigator.$inject = ["$rootScope", "$state", "$surveyAns", "$log", "$saveSurveyService", "storageService", "toaster", "$surveyHttp"];

    angular.module("cv.services").factory("$surveyNavigator", surveyNavigator);
})();