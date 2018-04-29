"use strict";

angular.module("cv.directives")
    .directive("surveyHeader", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "surveyHeader/surveyHeader.html";
            return {
                restrict: "AE",
                replace: true,
                templateUrl: templateUrl
            };
        }
    ]);