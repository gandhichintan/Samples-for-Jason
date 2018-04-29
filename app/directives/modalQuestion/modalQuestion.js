"use strict";

angular.module("cv.directives")
    .directive("modalQuestion", [
        "directivesPath", function (directivesPath) {
            var templateUrl = directivesPath + "modalQuestion/modalQuestion.html";

            return {
                restrict: "E",
                replace: true,
                require: ["modalQuestion"],
                controller: "modalQuestionController",
                templateUrl: templateUrl,
                scope: {
                    data: "=data"
                }
            };
        }
    ]);