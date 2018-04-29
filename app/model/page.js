var Page = (function () {
    function Page(id, url, name, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.getCurrentBlock = function () { return _this.questions[_this.currentGroupIndex]; };
        this.getNextVisitableBlockIndex = function () { return _.findIndex(_this.questions, function (group, index) {
            return index > _this.currentGroupIndex && _.any(group, function (question) { return question.visible; });
        }); };
        this.getPreviousVisitableBlockIndex = function () { return _.findIndex(_this.questions, function (group, index) {
            return index < _this.currentGroupIndex && _.any(group, function (question) { return question.visible; });
        }); };
        this.goToLastVisitableBlock = function () {
            _this.currentGroupIndex = _.findLastIndex(_this.questions, function (group) { return _.any(group, function (question) { return question.visible; }); });
        };
        this.goToFirstVisitableBlock = function () {
            var index = _.findIndex(_this.questions, function (group) { return _.any(group, function (question) { return question.visible; }); });
            _this.currentGroupIndex = index === -1 ? 0 : index;
        };
        this.hasVisitableFutureBlock = function () { return _this.getNextVisitableBlockIndex() !== -1; };
        this.hasVisitablePreviousBlock = function () { return _this.getPreviousVisitableBlockIndex() !== -1; };
        this.isQuestionsPage = function () { return _this.questions.length > 0; };
        this.currentGroupIsEmpty = function () { return _.all(_this.questions[_this.currentGroupIndex], function (q) { return !q.visible; }); };
        this.hasMultipleGroups = function () { return _this.questions.length > 1; };
        this.calculateLastIndex = function () { return _this.questions.length - 1; };
        this.isAtLastGroup = function () { return _this.currentGroupIndex >= _this.calculateLastIndex(); };
        this.isAtFirstGroup = function () { return _this.currentGroupIndex === 0; };
        this.previousBlock = function () {
            _this.currentGroupIndex = _this.getPreviousVisitableBlockIndex();
        };
        this.nextBlock = function () {
            _this.currentGroupIndex = _this.getNextVisitableBlockIndex();
        };
        this.isVisitable = function () { return _this.visible && (!_this.isQuestionsPage() || _this.hasVisibleQuestions()); };
        this.hasVisibleQuestions = function () { return _.any(_this.questions, function (group) { return _.any(group, function (question) { return question.visible; }); }); };
        var _a = options.questions, questions = _a === void 0 ? [] : _a, _b = options.title, title = _b === void 0 ? new InterpolableTranslation("") : _b, _c = options.header, header = _c === void 0 ? [] : _c, _d = options.texts, texts = _d === void 0 ? [] : _d, _e = options.links, links = _e === void 0 ? [] : _e, _f = options.urls, urls = _f === void 0 ? [] : _f, _g = options.footer, footer = _g === void 0 ? [] : _g, _h = options.quote, quote = _h === void 0 ? null : _h, _j = options.controller, controller = _j === void 0 ? Page.defaults.Controller : _j, _k = options.canAdvance, canAdvance = _k === void 0 ? true : _k, _l = options.canRetreat, canRetreat = _l === void 0 ? true : _l, _m = options.visible, visible = _m === void 0 ? true : _m, _o = options.template, template = _o === void 0 ? Page.defaults.Template : _o, _p = options.cssClass, cssClass = _p === void 0 ? "" : _p, _q = options.environment, environment = _q === void 0 ? '' : _q, _r = options.autoAdvance, autoAdvance = _r === void 0 ? false : _r, _s = options.surveyImage, surveyImage = _s === void 0 ? '' : _s;
        this.id = id;
        this.url = url;
        this.name = name;
        this.questions = questions;
        this.title = title;
        this.quote = quote;
        this.header = header;
        this.texts = texts;
        this.links = links;
        this.urls = urls;
        this.footer = footer;
        this.canAdvance = canAdvance;
        this.canRetreat = canRetreat;
        this.visible = visible;
        this.cssClass = cssClass;
        this.environment = environment;
        this.autoAdvance = autoAdvance;
        this.currentGroupIndex = 0;
        this.surveyImage = surveyImage;
        this.visited = false;
        this.controller = controller;
        this.template = template;
    }
    Page.prototype.validate = function () {
        var isValidQuestion = function (acumulate, current) { return acumulate && current.validate(); };
        var allQuestionsAreValid = this.questions.reduce(isValidQuestion, true);
        return this.questions.length === 0 || allQuestionsAreValid;
    };
    Page.defaults = {
        Controller: "questionsPageController",
        Template: "questionsPage",
        environment: ''
    };
    return Page;
}());
angular
    .module("cv.model")
    .factory("Page", [function () { return Page; }]);
//# sourceMappingURL=page.js.map