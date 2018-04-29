"use strict";

angular.module("cv.services").factory("questionPropertiesBuilderService",
[
    function() {

        var emptySelectOption = { text: "", value: undefined };

        var factory = {};

        // todo move build question directives properties functions from surveyConfigurator to here

        factory.getBasicSelectQuestionProperties = function(options, defaultOption) {
            var _options = options;
            if (!isNaN(options)) {
                _options = getMultiChoiceAnswers(options);
            }

            return {
                options: _options,
                selected: defaultOption || emptySelectOption
            };
        }

        return factory;
    }
]);