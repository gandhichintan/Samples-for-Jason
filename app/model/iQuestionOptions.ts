interface IQuestionOptions {
    required?: boolean;
    title?: InterpolableTranslation;
    errorMessage?: string;
    formatMessage?: string;
    answers?: Array<any>;
    visible?: boolean;
    cssClass?: Array<string>;
    validator?: IValidator;
    locations?: any;
    save?: boolean;
}