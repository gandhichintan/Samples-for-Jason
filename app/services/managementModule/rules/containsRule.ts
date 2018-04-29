class ContainsRule extends Rule {
    constructor(public question: Question, public constant: any) {
        super();
    }

    getValue = (): boolean => {
        return _.contains(this.question.answers, this.constant);
    };
}