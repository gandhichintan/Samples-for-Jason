angular.module("cv.filters", [])

.filter("withoutSpaces", () => (input:string) => input.split(" ").join(""));