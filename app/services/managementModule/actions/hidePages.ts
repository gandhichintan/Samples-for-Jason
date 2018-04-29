class HidePages implements IAction {
    targets: Array<Page>;

    constructor(targets: Array<Page>) {
        this.targets = targets;
    }

    run = (): void => {
        let clearAnswers = (question: Question) => question.answers = [];

        _.each(this.targets, p => {
            p.visible = false;

            _.each(p.questions, questionsGroup => _.each(questionsGroup, clearAnswers));
        });
    }
}