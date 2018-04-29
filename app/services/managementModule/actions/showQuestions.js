var ShowQuestions = (function () {
    function ShowQuestions(targets) {
        var _this = this;
        this.run = function () {
            _.each(_this.targets, function (q) { return q.visible = true; });
        };
        this.targets = targets;
    }
    return ShowQuestions;
}());
//# sourceMappingURL=showQuestions.js.map