///<reference path="../Scripts/typings/angularjs/angular.d.ts"/>

class Utils {
    static id = "utils";

    static clone = (model: (any | any[])): any => {
        if (_.isArray(model)) {
            return model.map(element => Utils.copy(element));
        }

        return Utils.copy(model);
    }

    private static copy = (model: any): any => angular.copy(model, Object.create(model));
}