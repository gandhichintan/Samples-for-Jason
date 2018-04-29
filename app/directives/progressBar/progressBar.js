"use strict";
(function () {
    var directiveProvider = function (directivesPath) {
        var TemplateUrl = directivesPath + "progressBar/progressBar.html";
        return {
            restrict: "AE",
            replace: true,
            require: ["progressBar"],
            controller: "progressBarController",
            controllerAs: "vm",
            templateUrl: TemplateUrl
        };
    };
    angular.module("cv.directives")
        .directive("progressBar", ["directivesPath", directiveProvider]);
})();