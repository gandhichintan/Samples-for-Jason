"use strict";

angular.module("cv.directives")
    .directive("copyright", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "copyright/copyright.html";
            return {
                restrict: "AE",
                replace: true,
                require: ["copyright"],
                controller: "copyrightController",
                templateUrl: templateUrl
            };
        }
    ]);