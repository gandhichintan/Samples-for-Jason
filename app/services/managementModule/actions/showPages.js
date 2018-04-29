var ShowPages = (function () {
    function ShowPages(targets) {
        var _this = this;
        this.run = function () {
            _.each(_this.targets, function (p) { return p.visible = true; });
        };
        this.targets = targets;
    }
    return ShowPages;
}());
//# sourceMappingURL=showPages.js.map