var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EqRule = (function (_super) {
    __extends(EqRule, _super);
    function EqRule(question, constant) {
        var _this = this;
        _super.call(this);
        this.question = question;
        this.constant = constant;
        this.getValue = function () {
            if (_this.question.answers.length > 0) {
                var a = _this.question.answers[0][0];
                return a === _this.constant.Text;
            }
            return false;
        };
    }
    return EqRule;
}(Rule));
//# sourceMappingURL=eqRule.js.map