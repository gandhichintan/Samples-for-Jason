(function () {
    "use strict";
    /**
     * @desc question directive
     * @example <question></question>
     */   
    function Question(directivesPath) {
        var templateUrl = directivesPath + "question/question.html";
        return {
            restrict: "E",
            scope: { item:"=",langCode:"=langCode"},
            replace: true,
            controller: "questionController",
            templateUrl: templateUrl
        };
    }

    angular
        .module("cv.directives")
        .directive("question", ["directivesPath", Question]);
})();