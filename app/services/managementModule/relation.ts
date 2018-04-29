class Relation {
    constructor(private condition: IEvaluable, private actions: IReactionCollection) {}

    apply = (): void => {
        let conditionPasses: boolean = this.condition.getValue(),
            actionsToBeRun = this.actions[conditionPasses ? "onTrue" : "onFalse"];

        this.runAllActions(actionsToBeRun);
    }

    private runAllActions = (actions: Array<IAction>): void => {
        _.each(actions, (a: IAction) => {
            a.run();
        });
    };
}