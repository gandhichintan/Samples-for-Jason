'use strict';

angular.module('cv.controllers').
    controller('AnswerLoaderController', ['$scope', '$surveyAns', '$surveyHttp', '$surveyNav', '$surveyUtils', '$location', 'localStorageService',
        function ($scope, $surveyAns, $surveyHttp, $surveyNav, $surveyUtils, $location, localStorageService) {

        try {
            init();
        } catch (ex) {
            $surveyNav.showErrorMessage(ex);
        }

        function init() {
            $scope.pageStrings = Customerville.pageStrings;

            $surveyNav.resetSurvey();
            //$surveyNav.initSession();
            showSearchingPrompt();

            var emailParams = Customerville.PageInfo.EmailParams;

            if (!$surveyUtils.isNullOrWhiteSpace(emailParams)) {
                var answers = $surveyAns.loadAnswers();

                answers.hideFlightMethod = true;
                localStorageService.set('PNR', emailParams[0].Value);
                localStorageService.set('maildate', emailParams[2].Value);
                answers.QUEST102 = emailParams[0].Value;
                answers.QUEST103 = emailParams[2].Value;
                answers.emailSurvey = true;

                $surveyAns.saveAnswers(answers);

                try {
                    $surveyHttp.logPageVisit($location.path(), 1, 0);
                } catch (err) {
                }

                loadInvitation(emailParams);
            } else {
                $surveyNav.gotoFirstPage();
            }
        }

        function loadInvitation(emailParams) {
            $surveyHttp.loadInvitation(emailParams)
                .success(function (data, status, headers, config) {
                    try {
                        var result = data;
                        loadAnswers(result.AnswerValues);
                        processInvitation(result.FlightsJson);
                        // PNR validation failed
                        if (result.FlightsJson == null) {
                            var answers = $surveyAns.loadAnswers();
                            answers.QUEST225 = result.Message;
                            answers.emailSurvey = false;
                            $surveyAns.saveAnswers(answers);

                            localStorageService.set('api_response', result.Message);

                            $surveyHttp.logErrorMessage("PNR Validation error. No flights found");
                            $surveyHttp.logPageVisit('/pnr_ko', 1, 0);
                        } else {
                            localStorageService.set('api_response', JSON.stringify(result.FlightsJson));
                            $surveyHttp.logPageVisit('/pnr_ok', 1, 0);
                        }

                    } catch (ex) {
                        $surveyHttp.logErrorMessage("PNR Validation error. " + ex.message);
                        $surveyHttp.logPageVisit('/pnr_ko', 1, 0);
                        throw '';
                    }
                })
                .error(function (data, status, headers, config) {
                    $surveyHttp.logErrorMessage("PNR Validation error. " + error.message);
                    $surveyHttp.logPageVisit('/pnr_ko', 1, 0);
                    throw '';
                });            
        }

        function processInvitation(flightJson) {
            saveAnswers();

            $surveyNav.gotoFirstPage();
        }

        function loadAnswers(answersResult) {

            if (!$surveyUtils.isNullOrWhiteSpace(answersResult)) {

                var answers = $surveyAns.loadAnswers();
                var answerValues = angular.fromJson(answersResult);

                angular.forEach(answerValues.AnswerValues, function(item, key) {
                    answers[item.QuestID] = item.Value;
                });

                $surveyAns.saveAnswers(answers);
            }
        }

        function saveAnswers() {
            var answers = $surveyAns.loadAnswers();

            answers.hideFlightMethod = true;

            $surveyAns.saveAnswers(answers);
        }

        function showSearchingPrompt() {
            $surveyNav.blockUI({
                message: $('div.page-loading-box'),
                fadeIn: 300,
                fadeOut: 200,
                centerY: false,
                centerX: false,
                css: {
                    width: '100%',
                    left: '0%',
                    top: '30%',
                    cursor: 'wait'
                },
                overlayCSS: {
                    opacity: 0.60
                }
            });
        }
    }
]);
