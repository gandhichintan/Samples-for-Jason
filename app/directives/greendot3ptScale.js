"use strict";

angular.module("cv.directives")
    .directive("greendot3ptScale", function() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                model: "=",
                id: "@",
                stories: "@",
                click: "&"
            },
            controller: [
                "$scope", "$timeout", function($scope, $timeout) {

                    setBackgroundImage();

                    $scope.onHover = function(option) {
                        $scope.model = option.model;
                        setBackgroundImage();
                    };

                    $scope.onMouseOut = function() {
                        $scope.model = "";

                        setBackgroundImage();
                    };

                    $scope.options = [];
                    $scope.stories = angular.fromJson($scope.stories);

                    $scope.options.push({ "btnText": "Absolutely", "story": $scope.stories.absolute, 'model': "5" });
                    $scope.options.push({ "btnText": "Somewhat", "story": $scope.stories.somewhat, 'model': "3" });
                    $scope.options.push({ "btnText": "Not at all", "story": $scope.stories.negative, 'model': "1" });

                    function setBackgroundImage() {
                        $timeout(function() {
                            var answer = parseInt($scope.model);

                            switch (answer) {
                            case 1:
                                $(".site-bg").addClass("allgray");

                                break;
                            case 3:
                                $(".site-bg").addClass("halfgray");

                                break;
                            case 5:
                                $(".site-bg").removeClass("halfgray");
                                $(".site-bg").removeClass("allgray");

                                break;
                            default:
                                $(".site-bg").removeClass("halfgray");
                                $(".site-bg").removeClass("allgray");

                                break;
                            }
                        });
                    }

                }
            ],
            template: "<div class=\"cta hover-effect\">" +
                "<div ng-repeat=\"option in options\">" +
                "<div " +
                "ng-mouseover=\"onHover(option)\" " +
                "ng-mouseleave=\"onMouseOut(option)\" " +
                "class=\"btn btn-lg btn-outline md-ripple\" " +
                "role=\"button\" " +
                "ng-class=\"{active: option.model === model}\"" +
                "ng-click=\"click()\">" +
                "{{option.btnText}}" +
                "</div>" +
                "<div class=\"answer-comment\" ng-class=\"{active: option.model == model}\" >" +
                "<p>{{option.story}}</p>" +
                "</div>" +
                "<div>" +
                "</div>"
        };
    });