class OrOperator extends Operator{

    constructor(public members: IEvaluable[]) {
        super();
    }

    getValue(): boolean {
        return _.some(this.members, (member: IEvaluable) => member.getValue());
    }
}