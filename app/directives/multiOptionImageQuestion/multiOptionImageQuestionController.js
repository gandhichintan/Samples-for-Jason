// todo extract boilerplate to other files
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MoiQuestionProperties = (function () {
    function MoiQuestionProperties(options, max) {
        if (max === void 0) { max = null; }
        this.options = options;
        this.max = max;
    }
    return MoiQuestionProperties;
}());
var MoiQuestion = (function (_super) {
    __extends(MoiQuestion, _super);
    function MoiQuestion(id, properties, options) {
        _super.call(this, id, MoiQuestion.type, properties, options);
    }
    MoiQuestion.type = "multiOptionImageQuestion";
    return MoiQuestion;
}(WidgetQuestion));
/**
 * Controller
 */
var MultiOptionImageQuestionController = (function () {
    function MultiOptionImageQuestionController($scope, $rootScope) {
        var _this = this;
        this.clear = function () { return _.forEach(_this.model, function (value) {
            _this.unselect(value);
        }); };
        this.triggerSelectionCallback = function (option) { return option.onselected && option.onselected(_this.getOptionElement(option), option); };
        this.triggerUnselectionCallback = function (option) { return option.onunselected && option.onunselected(_this.getOptionElement(option), option); };
        this.triggerMouseoverCallback = function (option) { return option.onmouseover && option.onmouseover(_this.getOptionElement(option), option); };
        this.triggerMouseleaveCallback = function (option) { return option.onmouseleave && option.onmouseleave(_this.getOptionElement(option), option); };
        this.isSingleChoice = function () { return _this.max && _this.max === 1; };
        this.isSelected = function (option) { return _.contains(_this.model, option); };
        this.mouseIsOver = function (option) { return _this.over === option; };
        var props = $scope.data.properties;
        this.question = $scope.data;
        this.questionIndex = _.findIndex($rootScope.survey.getCurrentPage().questions, this.question);
        this.model = $scope.model;
        this.options = props.options;
        this.max = props.max;
        this.ensureModelIsArray();
        this.reloadAnswers();
        $scope.$watch(function (_) { return _this.question.answers; }, function (value) {
            if (value.length === 0) {
                _this.clear();
            }
        });
    }
    MultiOptionImageQuestionController.prototype.reloadAnswers = function () {
        var _this = this;
        if (this.question.answers.length === 0 || this.question.answers[0].length === 0) {
            return;
        }
        this.model = _.map(this.question.answers[0], function (answer) { return _.findWhere(_this.options, { value: answer }); });
    };
    MultiOptionImageQuestionController.prototype.getOptionElement = function (option) {
        var optionCssClassPrefix = MultiOptionImageQuestionController.optionCssClassPrefix, optionIndex = _.findIndex(this.options, option), selector = "#question-" + this.questionIndex + " ." + optionCssClassPrefix + optionIndex;
        return $(selector);
    };
    // todo refactor ternaries
    MultiOptionImageQuestionController.prototype.click = function (option) {
        if (this.isSingleChoice()) {
            this.toggle(option);
        }
        else {
            if (this.isSelected(option)) {
                this.unselect(option);
            }
            else if (this.max === null || this.model.length < this.max) {
                this.select(option);
            }
        }
        this.updateAnswers();
    };
    MultiOptionImageQuestionController.prototype.unselect = function (option) {
        this.model = _(this.model)
            .filter(function (a) {
            return a.value !== option.value;
        })
            .value();
        this.triggerUnselectionCallback(option);
    };
    MultiOptionImageQuestionController.prototype.select = function (option) {
        this.model.push(option);
        this.triggerSelectionCallback(option);
    };
    MultiOptionImageQuestionController.prototype.toggle = function (option) {
        if (this.isSelected(option)) {
            this.model = [];
            this.triggerUnselectionCallback(option);
        }
        else {
            this.model = [option];
            this.triggerSelectionCallback(option);
        }
    };
    MultiOptionImageQuestionController.prototype.ensureModelIsArray = function () {
        this.model = _.isArray(this.model) ? this.model : [];
    };
    MultiOptionImageQuestionController.prototype.stepOver = function (option) {
        if (_.isArray(this.model) && this.max && this.model.length === this.max) {
            return;
        }
        this.over = option;
        this.triggerMouseoverCallback(option);
    };
    MultiOptionImageQuestionController.prototype.leave = function (option) {
        this.triggerMouseleaveCallback(option);
        this.over = this.over === option ? null : this.over;
    };
    MultiOptionImageQuestionController.prototype.updateAnswers = function () {
        this.question.answers[0] = _.pluck(this.model, "value");
    };
    MultiOptionImageQuestionController.$inject = ["$scope", "$rootScope"];
    MultiOptionImageQuestionController.optionCssClassPrefix = "option-";
    return MultiOptionImageQuestionController;
}());
(function () {
    angular.module("cv.directives").controller("multiOptionImageQuestionController", MultiOptionImageQuestionController);
})();
//# sourceMappingURL=multiOptionImageQuestionController.js.map