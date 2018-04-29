interface ITextQuestionDirectiveScope extends ng.IScope {
    model: Question;
}

class TextQuestionController {
    static id = "TextQuestionController";
    static $inject = ["$log", "$scope"];
    constructor (private $log: ng.ILogService, private $scope: ITextQuestionDirectiveScope) {}
}

angular.module("cv.directives")
    .controller(TextQuestionController.id, TextQuestionController);