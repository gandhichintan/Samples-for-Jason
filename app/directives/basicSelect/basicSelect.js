"use strict";

angular.module("cv.directives")
    .directive("basicSelect", [
        "directivesPath", "$document", function (directivesPath, $document) {
            var templateUrl = directivesPath + "basicSelect/basicSelect.html";

            function closeIfTheClickWasOutside(scope, element, event) {
                var isInnerElement = element.find(event.target).length > 0;

                if (isInnerElement) {
                    return;
                }

                scope.isOpen = false;
                scope.$apply();
            }

            return {
                restrict: "AE",
                scope: { data: "=", model: "=ngModel" },
                replace: true,
                require: ["basicSelect"],
                controller: "basicSelectController",
                templateUrl: templateUrl,
                link: function (scope, element, attr) {
                    $document.bind('click', function (event) { closeIfTheClickWasOutside(scope, element, event); });
                }
            };
        }
    ]);