var SetterFactory = (function () {
    function SetterFactory($rootScope) {
        var _this = this;
        this.create = function (key, value) {
            if (!_.contains(_this.keyCollection, key)) {
                _this.keyCollection.push(key);
            }
            return new Setter(_this, key, value);
        };
        this.set = function (key, value) {
            _this.rootScope[key] = value;
        };
        this.rootScope = $rootScope;
        this.keyCollection = [];
    }
    return SetterFactory;
}());
var setterFactoryProvider = function ($rootScope) { return new SetterFactory($rootScope); };
angular.module("cv.services").factory("setterFactoryService", ["$rootScope", setterFactoryProvider]);
//# sourceMappingURL=setterFactoryService.js.map