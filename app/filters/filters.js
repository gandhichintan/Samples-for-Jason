angular.module("cv.filters", [])
    .filter("withoutSpaces", function () { return function (input) { return input.split(" ").join(""); }; });
//# sourceMappingURL=filters.js.map