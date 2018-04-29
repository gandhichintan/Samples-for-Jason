"use strict";

angular.module("cv.directives")
    .directive("greendot11ptScale", function() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                model: "=",
                id: "@",
                click: "&"
            },
            controller: [
                "$scope", "$element", function($scope, $element) {
                    $scope.options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

                    setBackgroundImage();

                    $scope.onHover = function(option) {
                        $scope.model = option.toString();
                        setBackgroundImage();
                    };

                    $scope.onMouseOut = function() {
                        $scope.model = undefined;
                        setBackgroundImage();
                    };

                    function setBackgroundImage() {
                        if (angular.isDefined($scope.model)) {

                            if ($scope.model < 11) {
                                $element.parents().find(".site-bg").removeClass("allgray");
                                $element.parents().find(".site-bg").removeClass("halfgray");
                            }
                            if ($scope.model < 8) {
                                $element.parents().find(".site-bg").addClass("halfgray");
                                $element.parents().find(".site-bg").removeClass("allgray");
                            }
                            if ($scope.model < 4) {
                                $element.parents().find(".site-bg").addClass("allgray");
                                $element.parents().find(".site-bg").removeClass("halfgray");
                            }
                        } else {
                            $element.parents().find(".site-bg").removeClass("allgray");
                            $element.parents().find(".site-bg").removeClass("halfgray");
                        }
                    }

                }
            ],
            template: "<div class=\"cta scene_element scene_element--fadeinup\">" +
                "<div class=\"custom-rating\">" +
                "<div class=\"rating-caption\">" +
                "<p class=\"pull-left\">Unlikely</p>" +
                "<p class=\"pull-right\">Very likely</p>" +
                "</div>" +
                "<ul class=\"pagination\" ng-mouseleave=\"onMouseOut(option)\">" +
                "<li ng-repeat=\"option in options\" class=\"rating_{{option}}\">" +
                "<a " +
                "ng-click=\"click()\" " +
                "ng-mouseover=\"onHover(option)\" " +
                "ng-class=\"{active:option <= model}\"" +
                "class=\"md-ripple\">{{option}}</a>" +
                "</li>" +
                "</ul>" +
                "</div>" +
                "</div>"
        };
    });