class LtRule extends Rule {
    constructor(public question: Question, public constant: any) {
        super();
    }

    getValue = (): boolean => {
        return this.question.answers.length > 0 && parseFloat(this.question.answers[0]) < this.constant;
    };
}
