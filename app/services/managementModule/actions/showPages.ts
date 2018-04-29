class ShowPages implements IAction {
    targets: Array<Page>;

    constructor(targets: Array<Page>) {
        this.targets = targets;
    }

    run = (): void => {
        _.each(this.targets, p => p.visible = true);
    }
}