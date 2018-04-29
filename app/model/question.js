var Question = (function () {
    function Question(id, type, properties, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.init = function (options) {
            var _a = options.required, required = _a === void 0 ? false : _a, _b = options.title, title = _b === void 0 ? new InterpolableTranslation("") : _b, _c = options.errorMessage, errorMessage = _c === void 0 ? "" : _c, _d = options.formatMessage, formatMessage = _d === void 0 ? "" : _d, _e = options.answers, answers = _e === void 0 ? [] : _e, _f = options.visible, visible = _f === void 0 ? true : _f, _g = options.cssClass, cssClass = _g === void 0 ? [] : _g, _h = options.validator, validator = _h === void 0 ? null : _h, _j = options.locations, locations = _j === void 0 ? [] : _j, _k = options.save, save = _k === void 0 ? true : _k;
            _this.required = required;
            _this.title = title;
            _this.errorMessage = errorMessage;
            _this.formatMessage = formatMessage;
            _this.answers = answers;
            _this.visible = visible;
            _this.cssClass = [("type-" + _this.type)].concat(cssClass);
            _this.validator = validator;
            _this.locations = locations;
            _this.save = save;
        };
        this.getOptions = function () {
            return {
                required: _this.required,
                title: _this.title,
                errorMessage: _this.errorMessage,
                formatMessage: _this.formatMessage,
                answers: [],
                visible: _this.visible,
                cssClass: _this.cssClass,
                validator: _this.validator,
                locations: _this.locations,
                save: _this.save
            };
        };
        this.hasAnswers = function () { return _this.answers.length > 0 && typeof _this.answers[0] !== "undefined"; };
        this.hasCorrectFormat = function () {
            if (!_this.hasSpecificValidator()) {
                return true;
            }
            return !_this.hasAnswers() || _this.validator.run(_this.answers[0]);
        };
        this.hasSpecificValidator = function () { return _this.validator !== null; };
        this.clear = function () {
            _this.answers = [];
        };
        this.id = id;
        this.type = type;
        this.properties = properties;
        this.init(options);
    }
    Question.prototype.isRequired = function () {
        return this.required;
    };
    Question.prototype.getErrorMessage = function () {
        return this.errorMessage;
    };
    Question.prototype.validate = function () {
        if (this.isRequired()) {
            return this.hasAnswers() && this.hasValidAnswer();
        }
        return true;
    };
    Question.prototype.hasValidAnswer = function () {
        var answers = this.answers[0], isValidArrayOfAnswers = _.isArray(answers) && answers.length > 0, isJustOneValidAnswer = !_.isArray(answers) && answers.trim !== 0;
        return (isValidArrayOfAnswers || isJustOneValidAnswer);
    };
    Question.defaultRequirement = false;
    return Question;
}());
angular
    .module("cv.model")
    .factory("Question", [function () { return Question; }]);
//# sourceMappingURL=question.js.map