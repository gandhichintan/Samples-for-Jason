"use strict";

// todo promote to higher scope
interface IWidgetQuestionProperties { }

class WidgetQuestion extends Question {
    properties: IWidgetQuestionProperties;
}

const moiqDirectiveProvider = (directivesPath) => {
    return {
        restrict: "AE",
        replace: true,
        require: ["multiOptionImageQuestion"],
        controller: "multiOptionImageQuestionController",
        controllerAs: "vm",
        templateUrl: `${directivesPath}multiOptionImageQuestion/multiOptionImageQuestion.html`,
        scope: {
            data: "=data",
            model: "=ngModel"
        }
    };
};

angular.module("cv.directives")
    .directive("multiOptionImageQuestion", ["directivesPath", moiqDirectiveProvider]);