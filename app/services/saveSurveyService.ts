"use strict";

/**
 * Expected response for save survey request
 */
interface ISaveSurveyRequestResponse {
    Success: boolean;
    Message?: string;
}

class SaveSurveyService {
    private static $inject = ["$rootScope", "$surveyHttp", "$translate", "$log"];
    private static locationQuestionId = "QUEST1";
    private static checkboxSuffix = "CHECKED";

    private rootScope: ICVRootScope;
    private surveyHttp: any;
    private translate: angular.translate.ITranslateService;

    constructor($rootScope: ICVRootScope, $surveyHttp: any, $translate: angular.translate.ITranslateService, private $log: ng.ILogService) {
        this.rootScope = $rootScope;
        this.surveyHttp = $surveyHttp;
        this.translate = $translate;
    }
    /**
     * Prepares and send the request to save the survey
     */
    public saveSurvey = (): void => {
        var answers = this.getQuestIdAnswerAssociativeArray();
        if (this.rootScope.locationId) {
            answers[SaveSurveyService.locationQuestionId] = this.rootScope.locationId;
        }

        this.surveyHttp.saveSurvey(answers)
            .success(this.done)
            .error(this.connectionError);
    }
    /**
     * Triggered when the request is answered without problems
     * Goes to thankyou page or throws
     * @param result
     */
    private done = (result: ISaveSurveyRequestResponse): void => {
        try {
            //this.surveyNav.unblockUI();
            if (result.Success) {
            } else {
                throw result.Message;
            }
        } catch (ex) {
            this.$log.error(ex);
        }
    }
    /**
     * Triggered when the request returns an error. Logs the error
     * @param data
     * @param status
     */
    private connectionError(data, status) {
        if (status !== 0) {
            this.$log.error(`Service call failed (" ${status} ") - httpSurvey.saveSurvey`);
        }
    }
    /**
     * Returns a key value collection with the answers of the answered questions
     */
    private getQuestIdAnswerAssociativeArray(): Object {
        let dictionary = _({}).merge(this.getVisibleQuestionsAnswers()).value();

        if (this.rootScope.survey.questions.length > 0) {
            dictionary = _(dictionary).merge(this.getHiddenQuestionsAnswers()).value();
        }

        return _(dictionary).omit(value => value === null).value();
    }

    private getFirstAnswer(question: Question): string {
        return question.answers[0];
    }

    private getAllAnswers(question: Question): string {
        return question.answers.join("|");
    }

    private getVisibleQuestionsAnswers = (): Object => {
        let answers: Object = {};

        _.each(this.rootScope.survey.pages, (page) => {
            _.each(page.questions, (questionsGroup) => {
                _.each(questionsGroup, (question:Question, questionIndex:number) => this.buildDictionaryAnswerItem(answers, question,questionIndex));
            });
        });

        
        return answers;
    }

    private buildDictionaryAnswerItem = (answers: Object, question: Question, questionIndex: number): void => {
        if (!question.save || question.answers.length === 0) {
            return;
        }

        if (question.locations.length === 0) {
            answers["QUEST" + question.id] = this.getAllAnswers(question);
            return;
        }

        _.each(question.locations, location => {
            answers["QUEST" + location] = this.getAllAnswers(question);
        });
    }

    private getHiddenQuestionsAnswers = (): Object => {
        var answers = {};

        _.each(this.rootScope.survey.questions, (question: Question, questionIndex) => this.buildDictionaryAnswerItem(answers, question, questionIndex));

        return answers;
    }
}

/**
 * Provides a new instance of SaveSurveyService after supply it with the given dependencies
 * @param $rootScope
 * @param $surveyHttp
 * @param $surveyNavService
 */
const saveSurveyServiceFactoryProvider = ($rootScope: ICVRootScope, $surveyHttp: any, $translate: angular.translate.ITranslateService, $log: ng.ILogService) => {
    return new SaveSurveyService($rootScope, $surveyHttp, $translate, $log);
}

angular.module("cv.services").factory("$saveSurveyService",
    ["$rootScope", "$surveyHttp", "$translate", "$log", saveSurveyServiceFactoryProvider]);