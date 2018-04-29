class QuestionsFactoryService {
    private rootScope: ICVRootScope;
    private translationService: TranslationService;

    constructor($rootScope: ICVRootScope, translationService: TranslationService) {
        this.rootScope = $rootScope;
        this.translationService = translationService;
    }

    create = (id: number, type: string, properties: any, options: IQuestionOptions = {}): Question => {
        return new Question(id, type, properties, this.sanitizeOptions(options, id));
    }

    prepare = (question: Question, options: IQuestionOptions): Question => {
        question.init(this.sanitizeOptions(options, question.id));

        return question;
    }

    getInfo = (id: number): IQuestionInfo => {
        return Customerville.Questions[id];
    }

    private sanitizeOptions = (options: IQuestionOptions, id: number): IQuestionOptions => {
        options.title = this.sanitizeTitle(options.title, id);
        options.errorMessage = options.errorMessage || this.translationService.getQuestionErrorMessage(id);
        options.formatMessage = options.formatMessage || this.translationService.getQuestionFormatMessage(id);
        options.required = options.required || this.getInfo(id).Required || Question.defaultRequirement;

        return options;
    }

    private sanitizeTitle = (title: (IInterpolableTranslation | string), id: number): InterpolableTranslation => {
        if (_.isUndefined(title)) {
            return new InterpolableTranslation(this.translationService.getQuestionText(id));
        } else if (title instanceof InterpolableTranslation) {
            return title;
        } else {
            return new InterpolableTranslation(title as string);
        }
    }
}

const questionsFactoryServiceProvider =
    ($rootScope: ICVRootScope, translationService: TranslationService) => {
        return new QuestionsFactoryService($rootScope, translationService);
    };

angular.module("cv.services")
    .factory("questionsFactoryService", ["$rootScope", "translationService", questionsFactoryServiceProvider]);