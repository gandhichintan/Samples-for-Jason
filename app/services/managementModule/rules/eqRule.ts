class EqRule extends Rule {
    constructor(public question: Question, public constant: any) {
        super();
    }

    getValue = (): boolean => {
        if (this.question.answers.length > 0) {
            var a = this.question.answers[0][0];
            return a === this.constant.Text;
        }
        return false;
    }
}