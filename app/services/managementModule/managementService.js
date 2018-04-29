"use strict";
var ManagementService = (function () {
    function ManagementService($rootScope) {
        var _this = this;
        this.registerSurvey = function (survey) {
            _this.survey = survey;
            return _this;
        };
        this.rootScope = $rootScope;
    }
    ManagementService.prototype.registerRelation = function (condition, actions) {
        var _this = this;
        var master = new Relation(condition, actions);
        var registerWatcherForEachQuestionAt = function (member) {
            if (member instanceof Rule) {
                _this.registerWatcher(member.question, master);
            }
            else if (condition instanceof Operator) {
                _.forEach(member.members, function (submember) {
                    registerWatcherForEachQuestionAt(submember);
                });
            }
        };
        registerWatcherForEachQuestionAt(condition);
        return this;
    };
    ManagementService.prototype.registerWatcher = function (trigger, relation) {
        var _this = this;
        this.rootScope.$watchCollection(function () { return trigger.answers; }, function () {
            _this.rootScope.$evalAsync(function () { return relation.apply(); });
        });
    };
    ManagementService.$inject = ["$rootScope"];
    return ManagementService;
}());
var managementServiceFactoryProvider = function ($rootScope) { return new ManagementService($rootScope); };
angular.module("cv.services").factory("managementService", ["$rootScope", managementServiceFactoryProvider]);
//# sourceMappingURL=managementService.js.map