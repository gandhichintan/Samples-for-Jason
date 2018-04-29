var AndOperator = (function () {
    function AndOperator(members) {
        var _this = this;
        this.getValue = function () {
            return _.all(_this.members, function (member) { return member.getValue(); });
        };
    }
    return AndOperator;
})();
//# sourceMappingURL=andOperator.js.map