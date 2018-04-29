var Setter = (function () {
    function Setter(reference, value) {
        var _this = this;
        this.run = function () {
            _this.reference = _this.value;
        };
        this.reference = reference;
        this.value = value;
    }
    return Setter;
})();
//# sourceMappingURL=setter.js.map