var Setter = (function () {
    function Setter(parent, key, value) {
        var _this = this;
        this.run = function () {
            _this.parent.set(_this.key, _this.value);
        };
        this.parent = parent;
        this.key = key;
        this.value = value;
    }
    return Setter;
}());
//# sourceMappingURL=setter.js.map