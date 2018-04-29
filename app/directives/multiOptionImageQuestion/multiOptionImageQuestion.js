"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WidgetQuestion = (function (_super) {
    __extends(WidgetQuestion, _super);
    function WidgetQuestion() {
        _super.apply(this, arguments);
    }
    return WidgetQuestion;
}(Question));
var moiqDirectiveProvider = function (directivesPath) {
    return {
        restrict: "AE",
        replace: true,
        require: ["multiOptionImageQuestion"],
        controller: "multiOptionImageQuestionController",
        controllerAs: "vm",
        templateUrl: directivesPath + "multiOptionImageQuestion/multiOptionImageQuestion.html",
        scope: {
            data: "=data",
            model: "=ngModel"
        }
    };
};
angular.module("cv.directives")
    .directive("multiOptionImageQuestion", ["directivesPath", moiqDirectiveProvider]);
//# sourceMappingURL=multiOptionImageQuestion.js.map