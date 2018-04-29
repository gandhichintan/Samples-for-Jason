var DniValidator = (function () {
    function DniValidator() {
        var _this = this;
        this.isChar = function (item) { return item.match(/([A-Z])/i) !== null; };
        this.isNumber = function (item) { return !_.isNaN(Number(item)); };
        this.run = function (answer) {
            var isCorrect = false, oneCharFormat = answer.length === 9, twoCharFormat = answer.length === 10;
            if (oneCharFormat) {
                var numbers = answer.substring(0, 8), char = answer.substring(8);
                isCorrect = _this.isNumber(numbers) && _this.isChar(char);
            }
            if (twoCharFormat) {
                var firstChar = answer.substring(0, 1), numbers = answer.substring(1, 9), lastChar = answer.substring(9);
                isCorrect = _this.isChar(firstChar) && _this.isNumber(numbers) && _this.isChar(lastChar);
            }
            return isCorrect;
        };
    }
    return DniValidator;
})();
//# sourceMappingURL=dniValidator.js.map