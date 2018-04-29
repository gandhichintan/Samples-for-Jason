"use strict";

(() => {

    let directiveProvider = (directivesPath) => {
        const TemplateUrl = `${directivesPath}datepicker/datepicker.html`;

        return {
            restrict: "AE",
            replace: true,
            require: ["datepickero"],
            controller: "datepickerController",
            controllerAs:"vm",
            templateUrl: TemplateUrl,
            scope: {
                data: "=data",
                model: "=ngModel"
            }
        };
    };

    angular.module("cv.directives")
        .directive("datepickero", ["directivesPath", directiveProvider]);

})();