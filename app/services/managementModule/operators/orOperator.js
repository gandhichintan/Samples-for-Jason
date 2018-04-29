var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrOperator = (function (_super) {
    __extends(OrOperator, _super);
    function OrOperator(members) {
        _super.call(this);
        this.members = members;
    }
    OrOperator.prototype.getValue = function () {
        return _.some(this.members, function (member) { return member.getValue(); });
    };
    return OrOperator;
}(Operator));
//# sourceMappingURL=orOperator.js.map