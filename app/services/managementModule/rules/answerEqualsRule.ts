class AnswerEqualsRule extends Rule {
    constructor(public question: Question, public answerIndex : number, public constant: any) {
        super();
    }

    getValue = (): boolean => this.question.answers[this.answerIndex] === this.constant;
}