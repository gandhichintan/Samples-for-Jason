class LoweqRule extends Rule {
    constructor(public question: Question, public constant: any) {
        super();
    }

    getValue = (): boolean => {
        let answer = String(this.question.answers[0]).toLowerCase(),
            toMatch = this.constant.toLowerCase();

        return answer === toMatch;
    };
}