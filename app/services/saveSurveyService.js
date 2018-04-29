"use strict";
var SaveSurveyService = (function () {
    function SaveSurveyService($rootScope, $surveyHttp, $translate, $log) {
        var _this = this;
        this.$log = $log;
        /**
         * Prepares and send the request to save the survey
         */
        this.saveSurvey = function () {
            var answers = _this.getQuestIdAnswerAssociativeArray();
            if (_this.rootScope.locationId) {
                answers[SaveSurveyService.locationQuestionId] = _this.rootScope.locationId;
            }
            _this.surveyHttp.saveSurvey(answers)
                .success(_this.done)
                .error(_this.connectionError);
        };
        /**
         * Triggered when the request is answered without problems
         * Goes to thankyou page or throws
         * @param result
         */
        this.done = function (result) {
            try {
                //this.surveyNav.unblockUI();
                if (result.Success) {
                }
                else {
                    throw result.Message;
                }
            }
            catch (ex) {
                _this.$log.error(ex);
            }
        };
        this.getVisibleQuestionsAnswers = function () {
            var answers = {};
            _.each(_this.rootScope.survey.pages, function (page) {
                _.each(page.questions, function (questionsGroup) {
                    _.each(questionsGroup, function (question, questionIndex) { return _this.buildDictionaryAnswerItem(answers, question, questionIndex); });
                });
            });
            return answers;
        };
        this.buildDictionaryAnswerItem = function (answers, question, questionIndex) {
            if (!question.save || question.answers.length === 0) {
                return;
            }
            if (question.locations.length === 0) {
                answers["QUEST" + question.id] = _this.getAllAnswers(question);
                return;
            }
            _.each(question.locations, function (location) {
                answers["QUEST" + location] = _this.getAllAnswers(question);
            });
        };
        this.getHiddenQuestionsAnswers = function () {
            var answers = {};
            _.each(_this.rootScope.survey.questions, function (question, questionIndex) { return _this.buildDictionaryAnswerItem(answers, question, questionIndex); });
            return answers;
        };
        this.rootScope = $rootScope;
        this.surveyHttp = $surveyHttp;
        this.translate = $translate;
    }
    /**
     * Triggered when the request returns an error. Logs the error
     * @param data
     * @param status
     */
    SaveSurveyService.prototype.connectionError = function (data, status) {
        if (status !== 0) {
            this.$log.error("Service call failed (\" " + status + " \") - httpSurvey.saveSurvey");
        }
    };
    /**
     * Returns a key value collection with the answers of the answered questions
     */
    SaveSurveyService.prototype.getQuestIdAnswerAssociativeArray = function () {
        var dictionary = _({}).merge(this.getVisibleQuestionsAnswers()).value();
        if (this.rootScope.survey.questions.length > 0) {
            dictionary = _(dictionary).merge(this.getHiddenQuestionsAnswers()).value();
        }
        return _(dictionary).omit(function (value) { return value === null; }).value();
    };
    SaveSurveyService.prototype.getFirstAnswer = function (question) {
        return question.answers[0];
    };
    SaveSurveyService.prototype.getAllAnswers = function (question) {
        return question.answers.join("|");
    };
    SaveSurveyService.$inject = ["$rootScope", "$surveyHttp", "$translate", "$log"];
    SaveSurveyService.locationQuestionId = "QUEST1";
    SaveSurveyService.checkboxSuffix = "CHECKED";
    return SaveSurveyService;
}());
/**
 * Provides a new instance of SaveSurveyService after supply it with the given dependencies
 * @param $rootScope
 * @param $surveyHttp
 * @param $surveyNavService
 */
var saveSurveyServiceFactoryProvider = function ($rootScope, $surveyHttp, $translate, $log) {
    return new SaveSurveyService($rootScope, $surveyHttp, $translate, $log);
};
angular.module("cv.services").factory("$saveSurveyService", ["$rootScope", "$surveyHttp", "$translate", "$log", saveSurveyServiceFactoryProvider]);
//# sourceMappingURL=saveSurveyService.js.map