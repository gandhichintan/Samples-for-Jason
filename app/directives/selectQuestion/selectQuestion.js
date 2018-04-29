"use strict";

angular.module("cv.directives")
    .directive("selectQuestion", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "selectQuestion/selectQuestion.html";
            return {
                restrict: "AE",
                scope: { properties: "=" },
                replace: true,
                require: ["selectQuestion"],
                controller: "selectQuestionController",
                controllerAs: "ctrl",
                templateUrl: templateUrl
            };
        }
    ]);