"use strict";

angular.module("cv.directives")
    .directive("radioButtonGroup", function() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                model: "=",
                options: "=",
                click: "&"
            },
            controller: [
                "$scope", function($scope) {
                    $scope.activate = function(option, $event) {
                        $scope.model = option["Value"];

                        if ($event.stopPropagation) {
                            $event.stopPropagation();
                        }

                        if ($event.preventDefault) {
                            $event.preventDefault();
                        }

                        $event.cancelBubble = true;
                        $event.returnValue = false;
                    };

                    $scope.isActive = function(option) {
                        return option["Value"] == $scope.model;
                    };

                    $scope.getName = function(option) {
                        return option["Text"];
                    };

                }
            ],
            template: "<div class='cta scene_element scene_element--fadeinup'>" +
                "<div class='btn-group btn-group-justified radio-button-group' role='group' aria-label='...'>" +
                "<a role='button' class='btn btn-lg btn-outline md-ripple' " +
                "ng-class='{active: isActive(option)}'" +
                "ng-repeat='option in options' " +
                "ng-click='click()'" +
                "ng-mouseover='activate(option, $event)'" +
                "ng-mouseleave='clearScore(option, $event)' >" +
                "{{getName(option)}} " +
                "</a>" +
                "</div>" +
                "</div>"
        };
    });