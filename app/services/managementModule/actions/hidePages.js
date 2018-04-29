var HidePages = (function () {
    function HidePages(targets) {
        var _this = this;
        this.run = function () {
            var clearAnswers = function (question) { return question.answers = []; };
            _.each(_this.targets, function (p) {
                p.visible = false;
                _.each(p.questions, function (questionsGroup) { return _.each(questionsGroup, clearAnswers); });
            });
        };
        this.targets = targets;
    }
    return HidePages;
}());
//# sourceMappingURL=hidePages.js.map