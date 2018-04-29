class SetterFactory {
    rootScope: ICVRootScope;
    keyCollection: Array<string>;

    constructor($rootScope: ICVRootScope) {
        this.rootScope = $rootScope;
        this.keyCollection = [];
    }
    
    create = (key: string, value: number) => {
        if (!_.contains(this.keyCollection, key)) {
            this.keyCollection.push(key);
        }

        return new Setter(this, key, value);
    }

    set = (key: string, value: any) => {
        this.rootScope[key] = value;
    }
}

const setterFactoryProvider = ($rootScope: ICVRootScope) => new SetterFactory($rootScope);

angular.module("cv.services").factory("setterFactoryService", ["$rootScope", setterFactoryProvider]);