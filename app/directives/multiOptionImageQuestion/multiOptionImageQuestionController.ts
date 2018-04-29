// todo extract boilerplate to other files

class MoiQuestionProperties implements IWidgetQuestionProperties {
    options: Array<IMoiqOption>;
    max: number;

    constructor(options: Array<IMoiqOption>, max: number = null) {
        this.options = options;
        this.max = max;
    }
}

interface IStateChangeHandler {
    (element: JQuery, option: IMoiqOption): void;
}

interface IMoiqOption {
    value: any;
    text?: string;
    onmouseover?: IStateChangeHandler;
    onmouseleave?: IStateChangeHandler;
    onselected?: IStateChangeHandler;
    onunselected?: IStateChangeHandler;
}

class MoiQuestion extends WidgetQuestion {
    private static type = "multiOptionImageQuestion";

    properties: MoiQuestionProperties;

    constructor(id: number, properties: MoiQuestionProperties, options: any) {
        super(id, MoiQuestion.type, properties, options);
    }
}

interface IMoiqScope extends angular.IScope {
    data: MoiQuestion;
    model: Array<IMoiqOption>;
}

/**
 * Controller
 */
class MultiOptionImageQuestionController {
    static $inject = ["$scope", "$rootScope"];
    static optionCssClassPrefix = "option-";

    question: WidgetQuestion;
    questionIndex: number;
    model: Array<IMoiqOption>;
    options: Array<IMoiqOption>;
    max: number;
    over: IMoiqOption;

    constructor($scope: IMoiqScope, $rootScope: ICVRootScope) {
        let props: MoiQuestionProperties = $scope.data.properties;

        this.question = $scope.data;
        this.questionIndex = _.findIndex($rootScope.survey.getCurrentPage().questions, this.question);
        this.model = $scope.model;
        this.options = props.options;
        this.max = props.max;

        this.ensureModelIsArray();
        this.reloadAnswers();

        $scope.$watch(_ => this.question.answers, value => {
            if (value.length === 0) {
                this.clear();
            }
        });
    }

    private clear = () => _.forEach(this.model, value => {
        this.unselect(value);
    });

    reloadAnswers() {
        if (this.question.answers.length === 0 || this.question.answers[0].length === 0) {
            return;
        }

        this.model = _.map(this.question.answers[0], answer => _.findWhere(this.options, { value: answer }));
    }

    triggerSelectionCallback = (option: IMoiqOption) => option.onselected && option.onselected(this.getOptionElement(option), option);

    triggerUnselectionCallback = (option: IMoiqOption) => option.onunselected && option.onunselected(this.getOptionElement(option), option);

    triggerMouseoverCallback = (option: IMoiqOption) => option.onmouseover && option.onmouseover(this.getOptionElement(option), option);

    triggerMouseleaveCallback = (option: IMoiqOption) => option.onmouseleave && option.onmouseleave(this.getOptionElement(option), option);

    getOptionElement(option: IMoiqOption) {
        let optionCssClassPrefix: string = MultiOptionImageQuestionController.optionCssClassPrefix,
            optionIndex: number = _.findIndex(this.options, option),
            selector: string = `#question-${this.questionIndex} .${optionCssClassPrefix}${optionIndex}`;

        return $(selector);
    }

    // todo refactor ternaries
    click(option: IMoiqOption): void {
        if (this.isSingleChoice()) {
            this.toggle(option);
        } else {
            if (this.isSelected(option)) {
                this.unselect(option);
            } else if (this.max === null || this.model.length < this.max) {
                this.select(option);
            }
        }
        this.updateAnswers();
    }

    private unselect(option: IMoiqOption): void {
        this.model = _(this.model)
            .filter((a: IMoiqOption) => {
                return a.value !== option.value;
            })
            .value();
        this.triggerUnselectionCallback(option);
    }

    private select(option: IMoiqOption): void {
        this.model.push(option);
        this.triggerSelectionCallback(option);
    }

    private toggle(option: IMoiqOption): void {
        if (this.isSelected(option)) {
            this.model = [];
            this.triggerUnselectionCallback(option);
        } else {
            this.model = [option];
            this.triggerSelectionCallback(option);
        }
    }

    isSingleChoice = (): boolean => this.max && this.max === 1;

    ensureModelIsArray(): void {
        this.model = _.isArray(this.model) ? this.model : [];
    }

    stepOver(option: IMoiqOption): void {
        if (_.isArray(this.model) && this.max && this.model.length === this.max) {
            return;
        }
        this.over = option;
        this.triggerMouseoverCallback(option);
    }

    leave(option: IMoiqOption): void {
        this.triggerMouseleaveCallback(option);
        this.over = this.over === option ? null : this.over;
    }

    isSelected = (option: IMoiqOption): boolean => _.contains(this.model, option);

    mouseIsOver = (option: IMoiqOption): boolean => this.over === option;

    updateAnswers(): void {
        this.question.answers[0] = _.pluck(this.model, "value");
    }
}

(() => {
    angular.module("cv.directives").controller("multiOptionImageQuestionController", MultiOptionImageQuestionController);
})();