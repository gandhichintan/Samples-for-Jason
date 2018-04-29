"use strict";

angular.module("cv.directives")
    .controller("enhancedSelectController",
        ["$scope", "$log",
        function ($scope, $log) {
            var properties = $scope.data.properties;

            ensureHasData();

            $scope.model = $scope.model || false;
            var prompt = properties.prompt || false;
            $scope.options = properties.options;

            if (! $scope.model || $scope.model.length === 0) {
                setPrompt();
            }

            function hasPrompt() {
                var output = false;
                angular.forEach($scope.options, function(el) {
                    if (el.value === prompt.value) {
                        output = true;
                    }
                });
                return output;
            }

            function setPrompt() {
                ensurePromptCorrectFormat();
                if (hasPrompt()) {
                    $scope.model = $scope.options[0];
                    return;
                }
                $scope.options.unshift(prompt);
                $scope.model = $scope.options[0];
            }

            function ensurePromptCorrectFormat() {
                if (! angular.isObject(prompt)) {
                    prompt = { value: prompt, text: prompt };
                } else if (angular.isUndefined(prompt.value)) {
                    prompt = { value: prompt, text: prompt };
                }
            }

            function ensureHasData() {
                if (angular.isUndefined($scope.data) || $scope.data.length < 0) {
                    $log.error('Attribute/parameter data in enhancedSelectDirective is mandatory and was not found');
                }
            }
        }
    ]);