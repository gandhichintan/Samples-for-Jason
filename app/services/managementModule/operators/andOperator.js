var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AndOperator = (function (_super) {
    __extends(AndOperator, _super);
    function AndOperator(members) {
        _super.call(this);
        this.members = members;
    }
    AndOperator.prototype.getValue = function () {
        return _.all(this.members, function (member) { return member.getValue(); });
    };
    ;
    return AndOperator;
}(Operator));
//# sourceMappingURL=andOperator.js.map