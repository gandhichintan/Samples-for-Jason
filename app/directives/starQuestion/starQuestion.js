"use strict";

angular.module("cv.directives")
   .directive("starQuestion", ["directivesPath", function (directivesPath) {
       var templateUrl = directivesPath + "starQuestion/starQuestion.html";

        return {
            restrict: "AEC",
            replace: true,

            require: ["starQuestion", "ngModel"],
            controller: "starQuestionController",
            templateUrl: templateUrl,
            scope: {
                data: "=",
                model: "=ngModel",
            },
            link: function (scope, element, attributes, controllers) {
                scope.question = scope.data;
                scope.text = scope.data.answers[0];

                var starQuestionController = controllers[0];
                var ngModelController = controllers[1];

                var min = parseInt(scope.question.properties.options[0].min || "1");
                var max = parseInt(scope.question.properties.options[1].max || "5");
                starQuestionController.init(min, max, ngModelController);
            }
        };
}]);