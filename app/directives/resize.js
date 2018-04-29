"use strict";

angular.module("cv.directives")
    .directive("resize", [
        "$window", "$timeout", "$surveyUtils", function($window, $timeout, $surveyUtils) {
            return function(scope) {
                $timeout(function() {

                    var w = angular.element($window);
                    scope.getWindowDimensions = function() {
                        return { 'h': w.outerHeight(), 'w': w.width() };
                    };

                    scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
                        scope.windowHeight = newValue.h;
                        scope.windowWidth = newValue.w;

                        scope.style = function() {

                            if ($surveyUtils.getInternetExplorerVersion() < 9 && $surveyUtils.getInternetExplorerVersion() !== -1) {
                                scaleImage();
                            }

                            return {
                                'height': (newValue.h) + "px",
                                'width': (newValue.w) + "px",
                            };
                        };

                    }, true);

                    w.bind("resize", function() {
                        scope.$apply();
                    });

                    function scaleImage() {
                        var images = angular.element(".bg-grid img");

                        angular.forEach(images, function(img, i) {
                            var image = angular.element(img);

                            var mode = Math.max;
                            var parent = image.parent();

                            if (!parent) {
                                return;
                            }

                            var width = image.width();
                            var height = image.height();

                            if (width == 0 || height == 0) {
                                return;
                            }

                            var parentWidth = parent.width();
                            var parentHeight = parent.height();

                            if ($surveyUtils.getInternetExplorerVersion() >= 9) {
                                if (parent.attr("class").indexOf("bg-grid-1") > 0) {
                                    parentHeight = scope.windowHeight;
                                }
                            }

                            var widthRatio = parentWidth / width;
                            var heightRatio = parentHeight / height;

                            var ratio = mode(widthRatio, heightRatio);

                            var newWidth = ratio * width;
                            var newHeight = ratio * height;

                            parent.css("overflow", "hidden");

                            image.css("width", newWidth + "px");
                            image.css("height", newHeight + "px");

                            image.css("margin-left", (parentWidth - newWidth) / 2);
                            image.css("margin-top", (parentHeight - newHeight) / 2);
                        });
                    }

                });
            };
        }
    ]);