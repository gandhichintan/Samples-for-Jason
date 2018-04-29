"use strict";

angular.module("cv.directives")
    .controller("cvSelectSimpleInnerController",
        ["$scope", "$log",
        function ($scope, $log) {

            function set(option) {
                $scope.$emit("executeOnSelectScope", function ($selectScope) {
                    $selectScope.prompt = option.text;
                    $selectScope.model = option;
                    $selectScope.close();
                });
            }

            $scope.$on("init", function (event, options, selected) {
                $scope.options = options;
                set(selected);
            });

            (function () {
                $scope.$emit("askForOptions");
            })();

            $scope.select = function(option) {
                set(option);
            }
        }
        ]);