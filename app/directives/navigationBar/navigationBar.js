"use strict";
var directiveProvider = function (directivesPath) {
    var TemplateUrl = directivesPath + "navigationBar/navigationBar.html";
    return {
        restrict: "AEC",
        replace: true,
        scope: { data: "=" },
        require: ["navigationBar"],
        controller: "navigationBarController",
        controllerAs: "vm",
        templateUrl: TemplateUrl
    };
};
angular.module("cv.directives")
    .directive("navigationBar", ["directivesPath", directiveProvider]);
//# sourceMappingURL=navigationBar.js.map