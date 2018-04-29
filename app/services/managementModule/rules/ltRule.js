var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LtRule = (function (_super) {
    __extends(LtRule, _super);
    function LtRule(question, constant) {
        var _this = this;
        _super.call(this);
        this.question = question;
        this.constant = constant;
        this.getValue = function () {
            return _this.question.answers.length > 0 && parseFloat(_this.question.answers[0]) < _this.constant;
        };
    }
    return LtRule;
}(Rule));
//# sourceMappingURL=ltRule.js.map