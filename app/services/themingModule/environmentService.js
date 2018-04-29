var environmentService;
(function (environmentService) {
    var EnvironmentService = (function () {
        function EnvironmentService() {
            this.activeEnvironment = '';
            this.activeSurvey = '';
            this.activeImage = '';
            this.fullBg = false;
            this.windowScreen = undefined;
            this.imageDirectory = 'company_res/TellTacoTimeNW.Survey/survey/images/';
            this.watchers = [];
        }
        EnvironmentService.prototype.changeStyle = function (environment, survey) {
            this.activeEnvironment = environment;
            this.activeSurvey = survey;
            this.changed();
        };
        EnvironmentService.prototype.watch = function (callback) {
            this.watchers.push(callback);
        };
        EnvironmentService.prototype.unwatch = function (callback) {
            var index = this.watchers.indexOf(callback);
            if (index !== -1) {
                this.watchers.splice(index, 1);
            }
        };
        EnvironmentService.prototype.setEnvironment = function (environment) {
            this.changed();
            this.activeEnvironment = environment;
        };
        EnvironmentService.prototype.getEnvironment = function () {
            return this.activeEnvironment;
        };
        EnvironmentService.prototype.setActiveSurvey = function (survey) {
            this.activeSurvey = survey;
            this.changed();
        };
        EnvironmentService.prototype.setActiveImage = function (image) {
            this.activeImage = image;
        };
        EnvironmentService.prototype.setWindowScreen = function (width) {
            this.windowScreen = width;
        };
        EnvironmentService.prototype.changed = function () {
            angular.forEach(this.watchers, function (w) {
                w(this.activeEnvironment, this.activeSurvey);
            }.bind(this));
        };
        EnvironmentService.$inject = ['$rootScope'];
        return EnvironmentService;
    }());
    angular.module('cv.theme').service('environmentService', EnvironmentService);
})(environmentService || (environmentService = {}));
//# sourceMappingURL=environmentService.js.map