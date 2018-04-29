///<reference path="../Scripts/typings/angularjs/angular.d.ts"/>
var Utils = (function () {
    function Utils() {
    }
    Utils.id = "utils";
    Utils.clone = function (model) {
        if (_.isArray(model)) {
            return model.map(function (element) { return Utils.copy(element); });
        }
        return Utils.copy(model);
    };
    Utils.copy = function (model) { return angular.copy(model, Object.create(model)); };
    return Utils;
}());
//# sourceMappingURL=utils.js.map