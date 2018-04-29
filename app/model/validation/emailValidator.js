var EmailValidator = (function () {
    function EmailValidator() {
        this.run = function (answer) {
            return EmailValidator.pattern.test(answer);
        };
    }
    EmailValidator.pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return EmailValidator;
}());
//# sourceMappingURL=emailValidator.js.map