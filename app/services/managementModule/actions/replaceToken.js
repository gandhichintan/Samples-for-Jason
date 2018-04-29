var ReplaceToken = (function () {
    function ReplaceToken(targets, action, $rootScope) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.run = function () {
            switch (_this.action) {
                case "remove":
                    _this.removeToken(_this.targets);
                    break;
                case "add":
                    _this.addToken(_this.targets);
                    break;
            }
        };
        this.removeToken = function (key) {
            if (_this.$rootScope.replaceToken !== undefined) {
                var index = _this.$rootScope.replaceToken.indexOf(key);
                if (index > -1) {
                    _this.$rootScope.replaceToken.splice(index, 1);
                }
            }
        };
        this.addToken = function (key) {
            if (_this.$rootScope.replaceToken === undefined) {
                _this.$rootScope.replaceToken = [];
            }
            var index = _this.$rootScope.replaceToken.indexOf(key);
            if (index === -1) {
                _this.$rootScope.replaceToken.push(key);
            }
        };
        this.targets = targets;
        this.action = action;
    }
    return ReplaceToken;
}());
//# sourceMappingURL=replaceToken.js.map