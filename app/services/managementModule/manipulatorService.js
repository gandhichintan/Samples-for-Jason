var ManipulatorService = (function () {
    function ManipulatorService($rootScope) {
        this.rootScope = $rootScope;
        this.survey = $rootScope.survey;
    }
    ManipulatorService.prototype.show = function (targets) {
        _.forEach(targets, function (question) {
            question.visible = true;
        });
    };
    ManipulatorService.prototype.hide = function (targets) {
        _.forEach(targets, function (question) {
            question.visible = false;
            question.answers = [];
        });
    };
    return ManipulatorService;
}());
var manipulatorServiceFactoryProvider = function ($rootScope) { return new ManipulatorService($rootScope); };
angular.module("cv.services").factory("manipulatorService", ["$rootScope", manipulatorServiceFactoryProvider]);
//# sourceMappingURL=manipulatorService.js.map