"use strict";

/* Services */
angular.module("cv.surveyNav", [])
    .factory("$saveSurvey", [
        "$surveyHttp", "$surveyNav", function($surveyHttp, $surveyNav) {
            var factory = {};

            factory.saveSurvey = function(answers) {
                $surveyHttp.saveSurvey(answers)
                    .success(function(result, status, headers, config) {
                        try {
                            if (result.Success) {
                                $surveyNav.gotoThankyouPage();
                            } else {
                                throw result.Message;
                            }
                        } catch (ex) {
                            $surveyNav.showErrorMessage(ex);
                            $surveyNav.unblockUI();
                        }
                    })
                    .error(function(data, status, headers, config) {
                        if (status != 0) {
                            $surveyNav.showErrorMessage("Service call failed (" + status + ") - httpSurvey.saveSurvey");
                        }

                        $surveyNav.unblockUI();
                    });
            };

            return factory;
        }
    ])
    .factory("$surveyUhOh", [
        "$surveyAns", "$surveyUtils", function($surveyAns, $surveyUtils) {

            var factory = {};

            factory.PageInfo = Customerville.PageInfo;

            factory.isUhOhSurvey = function() {
                var answers = $surveyAns.loadAnswers();

                var foundUhOhAnswer = 0;
                angular.forEach(answers, function(value, key) {
                    var questID = factory.getQuestID(key);
                    if (factory.isUhOhValue(questID, value)) {
                        foundUhOhAnswer += 1;
                    }
                });

                return (foundUhOhAnswer > 1);
            };

            factory.isUhOhValue = function(questID, value) {
                if ($surveyUtils.isNullOrWhiteSpace(value)) {
                    return false;
                }

                var foundUhOhAnswer = false;
                angular.forEach(factory.PageInfo.UhOhQuestions, function(quest, key) {
                    if (questID == quest.QuestID) {
                        for (var i = 0; i < quest.UhOhValues.length; i++) {
                            var uhOhValue = quest.UhOhValues[i];
                            if (uhOhValue == value) {
                                foundUhOhAnswer = true;
                            }
                        }
                    }
                });

                return foundUhOhAnswer;
            };

            factory.getQuestID = function(value) {
                if ($surveyUtils.isNullOrWhiteSpace(value)) {
                    return -1;
                }

                var prefix = "QUEST";
                if (value.length <= prefix.length) {
                    return -1;
                }

                var questID = value.substr(prefix.length);
                return parseInt(questID);
            };

            return factory;

        }
    ]);