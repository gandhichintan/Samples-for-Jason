"use strict";

angular.module("cv.directives")
    .directive("boolQuestion", [
        "directivesPath",
        function (directivesPath,ngChange) {
            var templateUrl = directivesPath + "boolQuestion/boolQuestion.html";
            return {
                restrict: "E",
                replace: true,
                scope: {
                    data: "=",
                    model: "=ngModel"                
                },
                controller: "boolQuestionController",
                templateUrl: templateUrl,
                link: function (scope, elements, attrs, controller) {
                    scope.question = scope.data;                   
                }
            };
        }
    ]);