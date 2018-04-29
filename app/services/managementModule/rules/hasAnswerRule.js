var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HasAnswerRule = (function (_super) {
    __extends(HasAnswerRule, _super);
    function HasAnswerRule(question) {
        var _this = this;
        _super.call(this);
        this.question = question;
        this.getValue = function () {
            return _this.question.answers.length > 0;
        };
    }
    return HasAnswerRule;
}(Rule));
//# sourceMappingURL=hasAnswerRule.js.map