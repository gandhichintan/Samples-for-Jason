function textQuestionDirective(directivesPath) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            model: "=ngModel",
        },
        controller: TextQuestionController.id,
        controllerAs: "vm",
        templateUrl: directivesPath + "textQuestion/textQuestion.html"
    };
}
angular.module("cv.directives")
    .directive("textQuestion", ["directivesPath", textQuestionDirective]);
//# sourceMappingURL=textQuestion.js.map