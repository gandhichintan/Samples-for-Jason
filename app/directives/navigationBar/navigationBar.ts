"use strict";

let directiveProvider = (directivesPath) => {
    const TemplateUrl = `${directivesPath}navigationBar/navigationBar.html`;

    return {
        restrict: "AEC",
        replace: true,
        scope: { data: "=" },
        require: ["navigationBar"],
        controller: "navigationBarController",
        controllerAs: "vm",
        templateUrl: TemplateUrl
    };
}

angular.module("cv.directives")
    .directive("navigationBar", ["directivesPath", directiveProvider]);