var SpanishPhoneValidator = (function () {
    function SpanishPhoneValidator() {
        this.run = function (answer) {
            if (isNaN(Number(answer))) {
                return false;
            }
            var firstNumber = Number(answer.charAt(0));
            return answer.length === SpanishPhoneValidator.dimension
                && _.contains(SpanishPhoneValidator.allowedInitialNumbers, firstNumber);
        };
    }
    SpanishPhoneValidator.allowedInitialNumbers = [6, 7, 9];
    SpanishPhoneValidator.dimension = 9;
    return SpanishPhoneValidator;
}());
//# sourceMappingURL=spanishPhoneValidator.js.map