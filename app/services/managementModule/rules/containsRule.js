var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContainsRule = (function (_super) {
    __extends(ContainsRule, _super);
    function ContainsRule(question, constant) {
        var _this = this;
        _super.call(this);
        this.question = question;
        this.constant = constant;
        this.getValue = function () {
            return _.contains(_this.question.answers, _this.constant);
        };
    }
    return ContainsRule;
}(Rule));
//# sourceMappingURL=containsRule.js.map