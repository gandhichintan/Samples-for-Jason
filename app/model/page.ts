class Page {
    private static defaults = {
        Controller: "questionsPageController",
        Template: "questionsPage",
        environment: ''
    };

    id: number;
    url: string;
    name: string;
    questions: Array<Array<Question>>;
    title: IInterpolableTranslation;
    header: Array<IInterpolableTranslation>;
    texts: Array<IInterpolableTranslation>;
    links: Array<string>;
    urls: Array<string>;
    footer: Array<IInterpolableTranslation>;
    quote: Quote;
    controller: string;
    template: string;
    visited: boolean;
    canAdvance: boolean;
    canRetreat: boolean;
    visible: boolean;
    cssClass: string;
    environment: string;
    autoAdvance: boolean;
    currentGroupIndex: number;
    surveyImage: string;

    constructor(id: number, url: string, name: string, options: IPageOptions = {}) {
        const {
            questions = [], title = new InterpolableTranslation(""), header = [], texts = [], links = [], urls = [], footer = [], quote = null,
            controller = Page.defaults.Controller, canAdvance = true, canRetreat = true, visible = true,
            template = Page.defaults.Template, cssClass = "", environment = '', autoAdvance = false, surveyImage = ''
        } = options;

        this.id = id;
        this.url = url;
        this.name = name;
        this.questions = questions;
        this.title = title as IInterpolableTranslation;
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

    getCurrentBlock = (): Question[] => this.questions[this.currentGroupIndex];

    private getNextVisitableBlockIndex = (): number => _.findIndex(this.questions, (group: Question[], index: number) => {
        return index > this.currentGroupIndex && _.any(group, (question: Question) => question.visible);
    });

    private getPreviousVisitableBlockIndex = (): number => _.findIndex(this.questions, (group: Question[], index: number) => {
        return index < this.currentGroupIndex && _.any(group, (question: Question) => question.visible);
    });

    goToLastVisitableBlock = (): void => {
        this.currentGroupIndex = _.findLastIndex(this.questions, (group: Question[]) => _.any(group, (question: Question) => question.visible));
    }

    goToFirstVisitableBlock = (): void => {
        const index = _.findIndex(this.questions, (group: Question[]) => _.any(group, (question: Question) => question.visible));

        this.currentGroupIndex = index === -1 ? 0 : index;
    }

    validate() {
        const isValidQuestion = (acumulate, current) => acumulate && current.validate();
        const allQuestionsAreValid = this.questions.reduce(isValidQuestion, true);

        return this.questions.length === 0 || allQuestionsAreValid;
    }

    hasVisitableFutureBlock = (): boolean => this.getNextVisitableBlockIndex() !== -1;

    hasVisitablePreviousBlock = (): boolean => this.getPreviousVisitableBlockIndex() !== -1;

    isQuestionsPage = (): boolean => this.questions.length > 0;

    currentGroupIsEmpty = (): boolean => _.all(this.questions[this.currentGroupIndex], q => !q.visible);

    hasMultipleGroups = (): boolean => this.questions.length > 1;

    calculateLastIndex = (): number => this.questions.length - 1;

    isAtLastGroup = (): boolean => this.currentGroupIndex >= this.calculateLastIndex();

    isAtFirstGroup = (): boolean => this.currentGroupIndex === 0;

    previousBlock = (): void => {
        this.currentGroupIndex = this.getPreviousVisitableBlockIndex();
    }

    nextBlock = (): void => {
        this.currentGroupIndex = this.getNextVisitableBlockIndex();
    }

    isVisitable = (): boolean => this.visible && (!this.isQuestionsPage() || this.hasVisibleQuestions());

    hasVisibleQuestions = (): boolean => _.any(this.questions, (group: Question[]) => _.any(group, (question: Question) => question.visible));
}

angular
    .module("cv.model")
    .factory("Page", [() => Page]);