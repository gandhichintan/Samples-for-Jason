"use strict";

angular.module("cv.directives")
    .directive("multiOptionQuestion", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "multiOptionQuestion/multiOptionQuestion.html";

            return {
                restrict: "E",
                require: ["multiOptionQuestion"],
                replace: true,
                controller: "multiOptionQuestionController",
                templateUrl: templateUrl,
                scope: {
                    data: "=",
                    model: "=ngModel",
                    langCode: "="
                }
            };
        }
    ]);