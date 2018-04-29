var SetEnvironment = (function () {
    function SetEnvironment(environment, environmentService) {
        var _this = this;
        this.run = function () {
            _this.environmentService.set(_this.environment);
        };
        this.environment = environment;
        this.environmentService = environmentService;
    }
    return SetEnvironment;
}());
//# sourceMappingURL=changeEnvironment.js.map