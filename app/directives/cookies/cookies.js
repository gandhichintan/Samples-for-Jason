"use strict";

angular.module("cv.directives")
    .directive("cookies", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "cookies/cookies.html";
            return {
                restrict: "AEC",
                replace: true,
                require: ["cookies"],
                controller: "cookiesController",
                templateUrl: templateUrl
            };
        }
    ]);