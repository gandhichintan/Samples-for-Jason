///<reference path="../utils.ts"/>

"use strict";

class SurveyConfigurator {
    static id = "$surveyConfigurator";
    private static titleTranslation = "SURVEY_TITLE";
    private static true = "True";

    private t: TranslationService;
    private questions: any;
    private pages: any;
    private metadata: IMetadata;

    constructor(
        private $rootScope: ICVRootScope,
        private $surveyHttp,
        private $translate: ng.translate.ITranslateService,
        translationService: TranslationService,
        private management: ManagementService,
        private questionsFactoryService: QuestionsFactoryService,
        private pagesFactoryService: PagesFactoryService,
        private $log: ng.ILogService,
        private storageService: StorageService,
        private environmentService: environmentService.IEnvironmentService
    ) {
        this.t = translationService;
    }

    createSurvey(): Survey {
        this.createQuestions();
        this.createPages();

        let survey = new Survey(
            this.$translate.instant(SurveyConfigurator.titleTranslation),
            Customerville.SiteId,
            null,
            this.getPagesSequence()
        );

        this.createRelations(survey);

        return survey;
    }

    restoreSurvey(progress: any, hidden: any): Survey {
        let survey = this.createSurvey();
        this.$log.debug("SURVEY->", survey);
        this.$rootScope.survey = survey;
        this.customizeSurvey();


        //Restore PageQuestions
        survey.pages.forEach(page => {
            let pageProgress = progress[page.name] || null;
            if (!pageProgress) {
                return;
            }
            if (pageProgress.current) {
                survey.lastPage = page;
            }

            page.visited = true;
            page.currentGroupIndex = pageProgress.currentBlock;
            page.questions.forEach((questionGroup, groupIndex) => {
                questionGroup.forEach((question, questionIndex) => {
                    let savedQuestion = pageProgress.answers[groupIndex][questionIndex];
                    let questionProperties = pageProgress.properties[groupIndex][questionIndex];

                    question.answers = savedQuestion.answers;
                    question.locations = savedQuestion.locations || [];
                    question.properties = questionProperties;
                });
            });
        });

        //Restore HiddenQuestions
        if (hidden === null) {
            return survey;
        }

        survey.questions = _(survey.questions).concat(
            hidden.map((questionInfo: any) => new Question(questionInfo.questionId, "hidden", {}, {
                answers: questionInfo.answers,
                locations: questionInfo.location
            }))
        ).value();

        return survey;
    }

    private hasMetadata = (): boolean => !_.isUndefined(this.$rootScope.metadata) && this.$rootScope.metadata !== null;

    customizeSurvey() { // todo rename, this is not a getter
        let metadata = this.$rootScope.metadata;
        if (this.hasMetadata()) {
            //Implement if has metadata
        }
    }

    private buildArray = (from: any[]): Function => (...args: number[]): any[] => _.at(from, args);

    private createQuestions() {

        this.questions = {
            1: this.questionsFactoryService.create(1, "basicSelect", this.getBasicSelectQuestionProperties([], "PAGES_2_PROMPT_2"), { title: new InterpolableTranslation("") }),
            5: this.questionsFactoryService.create(5, "textbox", this.getTextInputProperties(this.t.getQuestionText(5)), { title: new InterpolableTranslation("") }), // Text
            6: this.questionsFactoryService.create(6, "textbox", this.getEmailInputProperties(this.t.getQuestionText(6)), { title: new InterpolableTranslation("") }),
            7: this.questionsFactoryService.create(7, "textbox", this.getTextInputProperties(this.t.getQuestionText(7)), { title: new InterpolableTranslation("") }),
            8: this.questionsFactoryService.create(8, "textbox", this.getTextAreaProperties('GENERAL_COMMENT_PLACEHOLDER')),
            16: this.questionsFactoryService.create(16, "basicSelect", this.getBasicSelectQuestionProperties([], "PAGES_2_PROMPT_1"), { title: new InterpolableTranslation("") }),
            23: this.questionsFactoryService.create(23, "squaresSlider", { range: [0, 10], rates: 10, headers: { left: 'RECOMMEND_SLIDER_HEADER_LEFT', right: 'RECOMMEND_SLIDER_HEADER_RIGHT' } }),
            31: this.questionsFactoryService.create(31, "checkbox", this.getMultiChoiceQuestionProperties(this.t.getMultiChoiceAnswers(31), 1)),
            32: this.questionsFactoryService.create(32, "textbox", this.getTextAreaProperties('OVERALL_COMMENT_PLACEHOLDER'), { title: new InterpolableTranslation("") }),
            101: this.questionsFactoryService.create(101, "squaresSlider", { range: [1, 5], rates: 5, headers: { left: 'GUESTSERVICE_SLIDER_HEADER_LEFT', right: 'GUESTSERVICE_SLIDER_HEADER_RIGHT' } }),
            102: this.questionsFactoryService.create(102, "radioButtons", this.getMultiChoiceQuestionProperties(this.t.getMultiChoiceAnswers(102), 1)),
            103: this.questionsFactoryService.create(103, "squaresSlider", { range: [1, 5], rates: 5, headers: { left: 'FOODQUALITY_SLIDER_HEADER_LEFT', right: 'FOODQUALITY_SLIDER_HEADER_RIGHT' } }),
            104: this.questionsFactoryService.create(104, "squaresSlider", { range: [1, 5], rates: 5, headers: { left: 'ORDER_SLIDER_HEADER_LEFT', right: 'ORDER_SLIDER_HEADER_RIGHT' } }),
            109: this.questionsFactoryService.create(109, "singleCheckbox", this.getTextInputProperties()),
            110: this.questionsFactoryService.create(110, "squaresSlider", { range: [1, 5], rates: 5, headers: { left: 'CLEANLINESS_SLIDER_HEADER_LEFT', right: 'CLEANLINESS_SLIDER_HEADER_RIGHT' } }),
            121: this.questionsFactoryService.create(121, "datepicker", { interface: 'textbox' }, this.getTextInputProperties()),
            122: this.questionsFactoryService.create(122, "timepicker", this.getTextInputProperties()),
            123: this.questionsFactoryService.create(123, "basicSelect", this.getBasicSelectQuestionProperties(this.t.getMultiChoiceAnswers(123), "PAGES_10_PROMPT_1")),
            125: this.questionsFactoryService.create(125, "radioButtons", this.getMultiChoiceQuestionProperties(this.t.getMultiChoiceAnswers(125), 1)),

        };
    }

    private createPages() {
        var getQuestions = this.buildArray(this.questions);


        this.pages = {
            0: this.pagesFactoryService.create(0, "/landing", "landing", { template: 'landing', surveyImage: "issaquah" }),
            1: this.pagesFactoryService.create(1, "/whereDidYouVisit", "whereDidYouVisit", { template: 'whereDidYouVisit', controller: 'locationController', surveyImage: "issaquah-2", questions: [getQuestions(16, 1, 121, 122, 125)] }),
            2: this.pagesFactoryService.create(2, "/yourRecommendation", "yourRecommendation", { surveyImage: "salad", questions: [getQuestions(23)] }),
            3: this.pagesFactoryService.create(3, "/guestService", "guestService", { surveyImage: "cashregister", questions: [getQuestions(101)] }),
            4: this.pagesFactoryService.create(4, "/foodQuality", "foodQuality", { surveyImage: "salsabar", questions: [getQuestions(103)] }),
            5: this.pagesFactoryService.create(5, "/orderAccuracy", "orderAccuracy", { surveyImage: "burritos", questions: [getQuestions(104)] }),
            6: this.pagesFactoryService.create(6, "/speedOfService", "speedOfService", { surveyImage: "drivethru", questions: [getQuestions(102)] }),
            7: this.pagesFactoryService.create(7, "/cleanliness", "cleanliness", { surveyImage: "tomatoes", questions: [getQuestions(110)] }),
            8: this.pagesFactoryService.create(8, "/comment", "comment", { surveyImage: "taco", questions: [getQuestions(8)] }),
            9: this.pagesFactoryService.create(9, "/uh-oh", "uh-oh", { surveyImage: "taco", questions: [getQuestions(31, 32)] }),
            10: this.pagesFactoryService.create(10, "/contactInformation", "contactInformation", { template: 'contactInformation', surveyImage: "salsa", questions: [getQuestions(5, 6, 7, 123, 109)] }),
            11: this.pagesFactoryService.create(11, "/thankYou", "thankYou", { template: 'socialMedia', surveyImage: "waiter", canAdvance: false, canRetreat: false }),
            12: this.pagesFactoryService.create(12, "/thankYou-redflag", "thankYou-redflag", { template: 'thankyou', surveyImage: "waiter", canAdvance: false, canRetreat: false, visible: false }),
        };
    }

    private isRestoring(): boolean {
        const progress = this.storageService.get("progress") || null;

        return progress !== null && !_.isEmpty(progress);
    }

    private hasInvitation = (): boolean => Customerville.EmailParams !== null;

    private getPages = (...from: number[]): Page[] => _.at(this.pages, from) as Page[];

    private getPagesSequence() {
        const sequence = _([]).concat(
            this.getPages(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
        ).value();
        return sequence;
    }

    private getValue = index => _.find(
        Customerville.MultiChoiceAnswers, (value, key) => (key === index))["Text"];


    private createRelations(survey) {
        var getQuestions = this.buildArray(this.questions),
            getPages = this.buildArray(this.pages),
            getValue = function (index) {
                return _.find(Customerville.MultiChoiceAnswers, function (value, key) {
                    return key === index;
                });
            };

        this.management.registerSurvey(survey)
            .registerRelation(
            new OrOperator([
                new AndOperator([
                    new HasAnswerRule(this.questions[23]), new LtRule(this.questions[23], 5)
                ]),
                new AndOperator([
                    new GtRule(this.questions[101], 0), new LtRule(this.questions[101], 3)
                ]),
                new AndOperator([
                    new GtRule(this.questions[102], 0), new LtRule(this.questions[102], 3)
                ]),
                new AndOperator([
                    new GtRule(this.questions[103], 0), new LtRule(this.questions[103], 3)
                ]),
                new AndOperator([
                    new GtRule(this.questions[104], 0), new LtRule(this.questions[104], 3)
                ])
            ]),
            {
                onTrue: [
                    new ShowPages(getPages(9)),
                    new HidePages(getPages(8)),
                    new ShowPages(getPages(12)),
                    new HidePages(getPages(11))
                ],
                onFalse: [
                    new ShowPages(getPages(8)),
                    new HidePages(getPages(9)),
                    new ShowPages(getPages(11)),
                    new HidePages(getPages(12))
                ]
            })
        this.management
            .registerRelation(
            new AndOperator([
                new AndOperator([
                    new HasAnswerRule(this.questions[23]), new LtRule(this.questions[23], 5)
                ])

            ]),
            {
                onTrue: [
                    new ReplaceToken("overall experience", "add", this.$rootScope)
                ],
                onFalse: [
                    new ReplaceToken("overall experience", "remove", this.$rootScope)
                ]
            });

        this.management
            .registerRelation(
            new AndOperator([
                new AndOperator([
                    new GtRule(this.questions[101], 0), new LtRule(this.questions[101], 3)
                ])

            ]),
            {
                onTrue: [
                    new ReplaceToken("guest experience", "add", this.$rootScope)
                ],
                onFalse: [
                    new ReplaceToken("guest experience", "remove", this.$rootScope)
                ]
            });

        this.management
            .registerRelation(
            new AndOperator([
                new AndOperator([
                    new GtRule(this.questions[102], 0), new LtRule(this.questions[102], 3)
                ])

            ]),
            {
                onTrue: [
                    new ReplaceToken("wait time", "add", this.$rootScope)
                ],
                onFalse: [
                    new ReplaceToken("wait time", "remove", this.$rootScope)
                ]
            });

        this.management
            .registerRelation(
            new AndOperator([
                new AndOperator([
                    new GtRule(this.questions[103], 0), new LtRule(this.questions[103], 3)
                ])

            ]),
            {
                onTrue: [
                    new ReplaceToken("meal", "add", this.$rootScope)
                ],
                onFalse: [
                    new ReplaceToken("meal", "remove", this.$rootScope)
                ]
            });

        this.management
            .registerRelation(
            new AndOperator([
                new AndOperator([
                    new GtRule(this.questions[104], 0), new LtRule(this.questions[104], 3)
                ])

            ]),
            {
                onTrue: [
                    new ReplaceToken("order", "add", this.$rootScope)
                ],
                onFalse: [
                    new ReplaceToken("order", "remove", this.$rootScope)
                ]
            });
    }

    private getSliderProperties(na: boolean, sliderHeader: string): any {
        na = na || false;

        var headers = {};

        if (this.isValidSliderHeader(sliderHeader)) {

            var prefix = "GENERAL_SLIDER_HEADER_"
            var left = "_LEFT";
            var right = "_RIGHT";

            var header_left = prefix + sliderHeader + left;
            var header_right = prefix + sliderHeader + right;

            headers["left"] = header_left;
            headers["right"] = header_right;
        }

        return {
            limits: { min: 0, max: 10 },
            step: 1,
            headers: headers,
            na: na
        }
    }

    private isValidSliderHeader = (sliderType): boolean => _.contains(["A", "B", "C", "D"], sliderType);

    private getYesNoQuestionProperties(): any {
        return {
            clickableContainers: true,
            customSprites: true,
            choiceLimits: { max: 1 },
            options: [
                { text: "GENERAL_YES", value: "yes" },
                { text: "GENERAL_NO", value: "no" }
            ],
        };
    }

    private getCheckboxProperties(text: any = ""): any {
        var options;
        if (typeof text === 'string') {
            options = [
                {
                    text: text,
                    value: "yes"
                }
            ];
        } else {
            options = text;
        }

        return {
            clickableContainers: true,
            customSprites: true,
            options: options,
            choiceLimits: { max: 4 }
        };
    }

    private getMultiChoiceQuestionProperties = (options, max): MoiQuestionProperties => new MoiQuestionProperties(options, max);

    private getBasicSelectQuestionProperties(options, prompt) {
        return {
            options: options,
            prompt: prompt || ""
        };
    }

    private getTextInputProperties(placeholder: string = null) {
        return {
            type: "textinput",
            placeholder: placeholder
        };
    }

    private getEmailInputProperties(placeholder: string = null) {
        return {
            type: "email",
            placeholder: placeholder
        };
    }

    private getTextAreaProperties(placeholder: string = null): any {
        return {
            type: "textarea",
            placeholder: placeholder
        };
    }

    private getOne(...collection: number[]): number {
        return collection[Math.floor(Math.random() * collection.length)];
    }

    private memoizedGetOne(...collection: number[]): number {
        return this.getOne.apply(null, collection);
    }
}

const surveyConfiguratorProviderFunction = (
    $rootScope: ICVRootScope,
    $surveyHttp,
    $translate: ng.translate.ITranslateService,
    translationService: TranslationService,
    management: ManagementService,
    questionsFactoryService: QuestionsFactoryService,
    pagesFactoryService: PagesFactoryService,
    $log: ng.ILogService,
    storageService: StorageService,
    environmentService: environmentService.IEnvironmentService
) => new SurveyConfigurator($rootScope, $surveyHttp, $translate, translationService, management, questionsFactoryService, pagesFactoryService, $log, storageService, environmentService);

angular.module("cv.services")
    .factory(SurveyConfigurator.id, ["$rootScope", "$surveyHttp", "$translate", "translationService", "managementService", "questionsFactoryService", "pagesFactoryService", "$log", "storageService", "environmentService", surveyConfiguratorProviderFunction]);