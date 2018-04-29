class HasAnswerRule extends Rule {
    constructor(public question: Question) {
        super();
    }

    getValue = (): boolean => {
        return this.question.answers.length > 0;
    };
}