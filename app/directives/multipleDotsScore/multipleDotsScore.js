"use strict";

angular.module("cv.directives")
    .directive("multipleDotsScore", [
        "directivesPath", function (directivesPath) {
            var templateUrl = directivesPath + "multipleDotsScore/multipleDotsScore.html";
            return {
                restrict: "E",
                replace: true,
                scope: {
                    data: "=",
                    model: "=ngModel"
                },
                controller: "MultipleDotsScoreController",
                templateUrl: templateUrl,
                link: function (scope, elements, attrs, controller) {
                    scope.question = scope.data;
                }
            };
        }   
    ]);