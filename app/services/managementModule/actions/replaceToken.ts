class ReplaceToken implements IAction {
    targets: string;
    action: string;

    constructor(targets: string, action: string, private $rootScope) {
        this.targets = targets;
        this.action = action;

    }

    run = (): void => {
        switch (this.action) {
            case "remove":
                this.removeToken(this.targets);
                break;

            case "add":
                this.addToken(this.targets);
                break;

        }
    }

    private removeToken = (key): void => {
        if (this.$rootScope.replaceToken !== undefined) {
            var index = this.$rootScope.replaceToken.indexOf(key);
            if (index > -1) {
                this.$rootScope.replaceToken.splice(index, 1);
            }
        }
    }

    private addToken = (key): void => {
        if (this.$rootScope.replaceToken === undefined) {
            this.$rootScope.replaceToken = [];
        }

        var index = this.$rootScope.replaceToken.indexOf(key);
        if (index === -1) {
            this.$rootScope.replaceToken.push(key);
        }
    }
}