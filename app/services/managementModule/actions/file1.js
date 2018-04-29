var DeactivateNavigation = (function () {
    function DeactivateNavigation(targets) {
        var _this = this;
        this.run = function () {
            _.each(_this.targets, function (p) { return p.canAdvance = false; });
        };
        this.targets = targets;
    }
    return DeactivateNavigation;
}());
//# sourceMappingURL=file1.js.map