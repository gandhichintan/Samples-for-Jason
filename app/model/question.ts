class Question {
    static defaultRequirement = false;

    id: any;
    type: string;
    properties: any;
    required: boolean;
    title: InterpolableTranslation;
    errorMessage: string;
    formatMessage: string;
    answers: Array<any>;
    visible: boolean;
    cssClass: Array<string>;
    validator: IValidator;
    locations: Array<string>;
    save: boolean;

    constructor(id: number, type: string, properties: any, options: IQuestionOptions = {}) {
        this.id = id;
        this.type = type;
        this.properties = properties;
        this.init(options);
    }

    init = (options: IQuestionOptions): void => {
        const {
            required = false, title = new InterpolableTranslation(""), errorMessage = "", formatMessage = "",
            answers = [], visible = true, cssClass = [], validator = null, locations = [], save = true
        } = options;

        this.required = required;
        this.title = title;
        this.errorMessage = errorMessage;
        this.formatMessage = formatMessage;
        this.answers = answers;
        this.visible = visible;
        this.cssClass = [`type-${this.type}`].concat(cssClass);
        this.validator = validator;
        this.locations = locations;
        this.save = save;
    }

    getOptions = (): IQuestionOptions => {
        return {
            required: this.required,
            title: this.title,
            errorMessage: this.errorMessage,
            formatMessage: this.formatMessage,
            answers: [],
            visible: this.visible,
            cssClass: this.cssClass,
            validator: this.validator,
            locations: this.locations,
            save: this.save
        };
    }

    isRequired(): boolean {
        return this.required;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }

    validate(): boolean {
        if (this.isRequired()) {
            return this.hasAnswers() && this.hasValidAnswer();
        }
        return true;
    }

    private hasAnswers = (): boolean => this.answers.length > 0 && typeof this.answers[0] !== "undefined";

    hasCorrectFormat = (): boolean => {
        if (!this.hasSpecificValidator()) {
            return true;
        }

        return !this.hasAnswers() || this.validator.run(this.answers[0]);
    }

    private hasValidAnswer(): boolean {
        let answers: any = this.answers[0],
            isValidArrayOfAnswers: boolean = _.isArray(answers) && answers.length > 0,
            isJustOneValidAnswer: boolean = !_.isArray(answers) && answers.trim !== 0;

        return (isValidArrayOfAnswers || isJustOneValidAnswer);
    }

    private hasSpecificValidator = (): boolean => this.validator !== null;

    clear = (): void => {
        this.answers = [];
    }
}

angular
    .module("cv.model")
    .factory("Question", [() => Question]);