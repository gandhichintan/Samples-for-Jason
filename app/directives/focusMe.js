"use strict";

angular.module("cv.directives")
    .directive("focusMe", [
        "$timeout", function($timeout) {
            //  http://stackoverflow.com/questions/14833326/how-to-set-focus-in-angularjs
            return {
                link: function(scope, element, attrs) {
                    scope.$watch(attrs.focusMe, function(value) {
                        if (value === true) {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    ]);