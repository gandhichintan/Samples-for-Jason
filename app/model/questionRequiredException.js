angular.module("cv.model").factory("QuestionRequiredException", function () {

    function QuestionRequiredException(message) {
        this.name = "QuestionRequiredException";       
        this.message = (message || "");
    }

    QuestionRequiredException.prototype = new Error();
    return QuestionRequiredException;
});