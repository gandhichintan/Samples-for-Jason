var SetEnvironment = (function () {
    function SetEnvironment(environment, environmentService, rootScope) {
        var _this = this;
        this.environment = environment;
        this.environmentService = environmentService;
        this.rootScope = rootScope;
        this.run = function () {
            _this.environmentService.changeStyle(_this.environment, _this.environment);
            _this.rootScope.survey.currentSurvey = _this.environment;
        };
        this.environmentService.changeStyle('', '');
    }
    return SetEnvironment;
}());
//# sourceMappingURL=setEnvironment.js.map