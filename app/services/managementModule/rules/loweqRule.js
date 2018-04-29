var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoweqRule = (function (_super) {
    __extends(LoweqRule, _super);
    function LoweqRule(question, constant) {
        var _this = this;
        _super.call(this);
        this.question = question;
        this.constant = constant;
        this.getValue = function () {
            var answer = String(_this.question.answers[0]).toLowerCase(), toMatch = _this.constant.toLowerCase();
            return answer === toMatch;
        };
    }
    return LoweqRule;
}(Rule));
//# sourceMappingURL=loweqRule.js.map