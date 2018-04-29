var Relation = (function () {
    function Relation(condition, actions) {
        var _this = this;
        this.condition = condition;
        this.actions = actions;
        this.apply = function () {
            var conditionPasses = _this.condition.getValue(), actionsToBeRun = _this.actions[conditionPasses ? "onTrue" : "onFalse"];
            _this.runAllActions(actionsToBeRun);
        };
        this.runAllActions = function (actions) {
            _.each(actions, function (a) {
                a.run();
            });
        };
    }
    return Relation;
}());
//# sourceMappingURL=relation.js.map