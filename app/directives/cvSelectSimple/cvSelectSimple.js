"use strict";

angular.module("cv.directives")
    .directive("cvSelectSimple", [
        "directivesPath", function (directivesPath) {
            var templateUrl = directivesPath + "cvSelectSimple/cvSelectSimpleWrapper.html";

            /* Parameters:
            ---------------------------------------------
                data = {
                    prompt: "string",
                    options: [
                        text: "string", value: "string"
                    ]
                }
            ---------------------------------------------
            */

            return {
                restrict: "AE",
                scope: { data: "=", model: "=ngModel" },
                replace: true,
                require: ["cvSelectSimple"],
                controller: "cvSelectSimpleController",
                templateUrl: templateUrl
            };
        }
    ]);