"use strict";

angular.module("cv.directives")
    .directive("dropDown", [
        //"$document", function (directivesPath, $document) {
//            var templateUrl = directivesPath + "cvSelect/cvSelect.html";
        "directivesPath", function (directivesPath) {
            var templateUrl = directivesPath + "dropDowns/dropDowns.html";

            return {
                restrict: "AE",
                scope: { data: "=data", model: "=ngModel" },
                replace: true,
                controller: "dropDownsController",
                //controllerAs: "vm",
                templateUrl: templateUrl,
                link: function (scope, element, attr) {
                    //$document.bind('click', function (event) { closeIfTheClickWasOutside(scope, element, event); });
                }
            };
        }
    ]);