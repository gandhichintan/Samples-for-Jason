class HideQuestions implements IAction {
    targets: Array<Question>;

    constructor(targets: Array<Question>) {
        this.targets = targets;
    }

    run = (): void => {
        _.each(this.targets, q => {
            q.visible = false;
            q.answers = [];
        });
    }
}