var ManipulatorService = (function () {
    function ManipulatorService($rootScope) {
        this.rootScope = $rootScope;
    }
    ManipulatorService.prototype.show = function (targets) {
        _.forEach(targets, function (question) { return question.visible = true; });
    };
    ManipulatorService.prototype.hide = function (targets) {
        _.forEach(targets, function (question) { return question.visible = false; });
    };
    return ManipulatorService;
})();
var manipulatorServiceFactoryProvider = function ($rootScope) { return new ManipulatorService($rootScope); };
angular.module("cv.services").factory("manipulatorService", ["$rootScope", manipulatorServiceFactoryProvider]);
//# sourceMappingURL=manipulator.js.map