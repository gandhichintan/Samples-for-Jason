"use strict";

angular.module("cv.directives")
    .directive("enhancedSelect", [
        "directivesPath", function (directivesPath) {
            var templateUrl = directivesPath + "enhancedSelect/enhancedSelect.html";

            return {
                restrict: "E",
                replace: true,
                require: ["enhancedSelect"],
                controller: "enhancedSelectController",
                templateUrl: templateUrl,
                scope: {
                    //question: "=question", todo allow passing a question object as a parameter after implementing logic
                    data: "=data",
                    model: "=ngModel"
                }
            };
        }
    ]);