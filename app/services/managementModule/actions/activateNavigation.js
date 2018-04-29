var ActivateNavigation = (function () {
    function ActivateNavigation(targets) {
        var _this = this;
        this.run = function () {
            _.each(_this.targets, function (p) { return p.canAdvance = true; });
        };
        this.targets = targets;
    }
    return ActivateNavigation;
}());
//# sourceMappingURL=activateNavigation.js.map