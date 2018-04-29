var TextQuestionController = (function () {
    function TextQuestionController($log, $scope) {
        this.$log = $log;
        this.$scope = $scope;
    }
    TextQuestionController.id = "TextQuestionController";
    TextQuestionController.$inject = ["$log", "$scope"];
    return TextQuestionController;
}());
angular.module("cv.directives")
    .controller(TextQuestionController.id, TextQuestionController);
//# sourceMappingURL=textQuestionController.js.map