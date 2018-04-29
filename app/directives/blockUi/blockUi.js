"use strict";

angular.module("cv.directives")
    .directive("blockUi", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "blockUi/blockUi.html";
            return {
                restrict: "AEC",
                replace: true,
                require: ["blockUi"],
                controller: "blockUiController",
                scope: {
                    step: "=?",
                    delay: "=?"
                },
                templateUrl: templateUrl
            };
        }
    ]);