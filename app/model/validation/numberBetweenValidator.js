var NumberBetweenValidator = (function () {
    function NumberBetweenValidator(min, max) {
        var _this = this;
        this.run = function (answers) {
            return answers.length <= _this.max
                && answers.length >= _this.min
                && !isNaN(Number(answers));
        };
        this.max = max;
        this.min = min;
    }
    return NumberBetweenValidator;
}());
//# sourceMappingURL=numberBetweenValidator.js.map