var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnswerEqualsRule = (function (_super) {
    __extends(AnswerEqualsRule, _super);
    function AnswerEqualsRule(question, answerIndex, constant) {
        var _this = this;
        _super.call(this);
        this.question = question;
        this.answerIndex = answerIndex;
        this.constant = constant;
        this.getValue = function () { return _this.question.answers[_this.answerIndex] === _this.constant; };
    }
    return AnswerEqualsRule;
}(Rule));
//# sourceMappingURL=answerEquals.js.map