"use strict";

angular.module("cv.directives")
    .controller("cvSelectSimpleController",
        ["$scope", "$rootScope", "$log", "directivesPath",
        function ($scope, $rootScope, $log, directivesPath) {

            var contentTemplate = directivesPath + "cvSelectSimple/cvSelectSimpleContent.html";

            // $scope.data.properties
            //  -> options
            //  -> prompt

            function getPrompt() {
                return angular.isDefined($scope.data.properties.prompt)
                    ? $scope.data.properties.prompt : $scope.data.properties.options[0];
            }

            function initInnerSelect() {
                $scope.selectData = {
                    prompt: getPrompt().text,
                    contentTemplate: contentTemplate
                };
            }

            (function () {
                initInnerSelect();
            })();

            $scope.$on("askForOptions", function () {
                $scope.$broadcast("init", $scope.data.properties.options, getPrompt());
            });

            $scope.$watch("data.properties", function (value) {
                initInnerSelect();

                $scope.$broadcast("init", $scope.data.properties.options, getPrompt());
            });
        }
        ]);