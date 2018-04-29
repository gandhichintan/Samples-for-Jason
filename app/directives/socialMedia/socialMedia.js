function socialMedia(directivesPath) {
    return {
        restrict: "AEC",
        replace: true,
        require: ["socialMedia"],
        scope: {
            model: "=ngModel",
            data: "=data"
        },
        templateUrl: directivesPath + "socialMedia/socialMedia.html"
    };
}
angular.module("cv.directives")
    .directive("socialMedia", ["directivesPath", socialMedia]);
//# sourceMappingURL=socialMedia.js.map