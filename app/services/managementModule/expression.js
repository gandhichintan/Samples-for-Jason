var OrOperator = (function () {
    function OrOperator(members) {
    }
    OrOperator.prototype.getValue = function () {
        return _.some(this.members, function (member) { return member.getValue(); });
    };
    return OrOperator;
})();
//# sourceMappingURL=expression.js.map