var InterpolableTranslation = (function () {
    function InterpolableTranslation(key, _interpolations) {
        if (key === void 0) { key = ""; }
        if (_interpolations === void 0) { _interpolations = {}; }
        this.key = key;
        this._interpolations = _interpolations;
    }
    Object.defineProperty(InterpolableTranslation.prototype, "interpolations", {
        get: function () {
            return this._interpolations;
        },
        set: function (interpolations) {
            this._interpolations = interpolations;
        },
        enumerable: true,
        configurable: true
    });
    return InterpolableTranslation;
}());
//# sourceMappingURL=interpolableTranslation.js.map