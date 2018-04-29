var QuestionsFactoryService = (function () {
    function QuestionsFactoryService($rootScope, translationService) {
        var _this = this;
        this.create = function (id, type, properties, options) {
            if (options === void 0) { options = {}; }
            return new Question(id, type, properties, _this.sanitizeOptions(options, id));
        };
        this.prepare = function (question, options) {
            question.init(_this.sanitizeOptions(options, question.id));
            return question;
        };
        this.getInfo = function (id) {
            return Customerville.Questions[id];
        };
        this.sanitizeOptions = function (options, id) {
            options.title = _this.sanitizeTitle(options.title, id);
            options.errorMessage = options.errorMessage || _this.translationService.getQuestionErrorMessage(id);
            options.formatMessage = options.formatMessage || _this.translationService.getQuestionFormatMessage(id);
            options.required = options.required || _this.getInfo(id).Required || Question.defaultRequirement;
            return options;
        };
        this.sanitizeTitle = function (title, id) {
            if (_.isUndefined(title)) {
                return new InterpolableTranslation(_this.translationService.getQuestionText(id));
            }
            else if (title instanceof InterpolableTranslation) {
                return title;
            }
            else {
                return new InterpolableTranslation(title);
            }
        };
        this.rootScope = $rootScope;
        this.translationService = translationService;
    }
    return QuestionsFactoryService;
}());
var questionsFactoryServiceProvider = function ($rootScope, translationService) {
    return new QuestionsFactoryService($rootScope, translationService);
};
angular.module("cv.services")
    .factory("questionsFactoryService", ["$rootScope", "translationService", questionsFactoryServiceProvider]);
//# sourceMappingURL=questionsFactoryService.js.map