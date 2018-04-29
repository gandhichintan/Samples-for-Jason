"use strict";

angular.module("cv.directives")
    .directive("modal", [
        "directivesPath", function(directivesPath) {
            var templateUrl = directivesPath + "modal/modal.html";

            return {
                restrict: "E",
                require: ["modal"],
                controller: "modalController",
                templateUrl: templateUrl
            };
        }
    ])
    .filter("unsafe", ["$sce", function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    }]);