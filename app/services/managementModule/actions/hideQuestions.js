var HideQuestions = (function () {
    function HideQuestions(targets) {
        var _this = this;
        this.run = function () {
            _.each(_this.targets, function (q) {
                q.visible = false;
                q.answers = [];
            });
        };
        this.targets = targets;
    }
    return HideQuestions;
}());
//# sourceMappingURL=hideQuestions.js.map