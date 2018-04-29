"use strict";

angular.module("cv.directives")
    .controller("basicSelectController", ["$scope", "$log",
        function ($scope, $log) {

            var prompt = { text: $scope.data.properties.prompt, value: undefined };

            $log.debug("SELECT", $scope.data);

            // todo replace data.properties.selected with data.answers. Duplication of single responsibility???

            function ensureParamsCorrectFormat() {
                $scope.data.properties.options = $scope.data.properties.options || [];
                $scope.data.properties.selected = $scope.data.properties.selected || prompt;
                saveAnswer();
            }

            (function () {
                ensureParamsCorrectFormat();
                $scope.isOpen = false;
            })();

            function saveAnswer() {
                $scope.data.answers[0] = $scope.data.properties.selected.value;
            }

            $scope.$watchCollection("data.properties", ensureParamsCorrectFormat);

            $scope.toggle = function () {
                $scope.isOpen = !$scope.isOpen;
            }

            $scope.open = function () {
                $scope.isOpen = true;
            }

            $scope.close = function () {
                $scope.isOpen = false;
            }

            $scope.select = function(option) {
                $scope.data.properties.selected = option;
                saveAnswer();
                $scope.close();
            }

            $scope.hasNoData = function() {
                var hasNothing = $scope.data.properties.options.length === 0;
                var hasJustAnUndefinedPrompt = $scope.data.properties.options.length === 1 && angular.isUndefined($scope.data.properties.options[0].value);
                return hasNothing || hasJustAnUndefinedPrompt;
            }

            $scope.getText = function (option) {
                return typeof option.text === "string" ? option.text : option.text.key;
            }

            $scope.getInterpolations = function (option) {
                return typeof option.text === "string" ? {} : option.text.interpolations;
            }
        }
    ]);