class GtRule extends Rule {
    constructor(public question: Question, public constant: any) {
        super();
    }

    getValue = (): boolean=> parseFloat(this.question.answers[0]) > this.constant;
}