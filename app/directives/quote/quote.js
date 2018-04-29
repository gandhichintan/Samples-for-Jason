"use strict";

angular.module("cv.directives")
    .directive("quote", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "quote/quote.html";
            return {
                restrict: "AE",
                replace: true,
                require: ["quote"],
                controller: "quoteController",
                templateUrl: templateUrl,
                scope: {
                    data: "="
                }
            };
        }
    ]);