function singleCheckbox(directivesPath) {
    return {
        restrict: "AEC",
        replace: true,
        require: ["singleCheckbox"],
        controller: "singleCheckboxController",
        controllerAs: "vm",
        scope: {
            model: "=ngModel",
            data: "=data"
        },
        templateUrl: directivesPath + "singleCheckbox/singleCheckbox.html"
    };
}
angular.module("cv.directives")
    .directive("singleCheckbox", ["directivesPath", singleCheckbox]);
//# sourceMappingURL=singleCheckbox.js.map