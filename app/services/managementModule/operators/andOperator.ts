class AndOperator extends Operator {

    constructor(public members: IEvaluable[]) {
        super();
    }

    getValue(): boolean {
        return _.all(this.members, (member: IEvaluable) => member.getValue());
    };
}