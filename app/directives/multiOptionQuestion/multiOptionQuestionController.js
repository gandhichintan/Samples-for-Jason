"use strict";

angular.module("cv.directives")
    .controller("multiOptionQuestionController", [
        "$scope", "$log", "$rootScope", function ($scope, $log, $rootScope) {
            var properties = $scope.data.properties;
            var CLICKABLE_CONTAINERS = properties.clickableContainers || false;
            var areChoicesLimitsDefined = angular.isDefined(properties.choiceLimits);
            var CHOICE_LIMITS = areChoicesLimitsDefined ? properties.choiceLimits : false;
            var isMaxChoicesLimitDefined = areChoicesLimitsDefined ? angular.isDefined(properties.choiceLimits.max) : false;
            $scope.isSingleChoice = isMaxChoicesLimitDefined ? CHOICE_LIMITS.max === 1 : false;
            $scope.customSprites = properties.customSprites || false;
            $scope.options = properties.options;
            $scope.extraIconClass = properties.extraIconClass;
            $scope.glyphicons = properties.glyphicons || false;


            //if (hasDefaultValue()) {
            //    if (!$rootScope.survey.getCurrentPage().visited) {
            //        fillWithDefaultValue();
            //    }             
            //}

            $scope.isSelected = function (option,index) {

                if( hasDefaultValue()){
                    return $scope.data.answers[index] == $scope.options[0].value;
                }
                else{
                    return $scope.data.answers.indexOf(option.value) > -1;
                }
               
            }

            $scope.maxChoicesLimitReached = function () {
                return isMaxChoicesLimitDefined ? $scope.data.answers.length >= CHOICE_LIMITS.max : false;
            }

            $scope.getGlyphClass = function(option) {
                return $scope.isSelected(option) ? $scope.glyphicons.trueIcon : $scope.glyphicons.falseIcon;
            }

          
            $scope.toggle = function (option, fromClickableContainer,index,event) {
                if (CLICKABLE_CONTAINERS && !fromClickableContainer) {
                    return;
                }
                if (event) {
                    $log.log("stop propagation");
                    event.stopPropagation();
                }

                if ($scope.isSelected(option,index)) {
                    hasDefaultValue() ? unselectDefaultMode(option,index) : unselect(option);
                } else {
                    hasDefaultValue() ? selectDefaultMode(option,index) : select(option);
                }
            }

            $scope.toggleIfClickable = function (option,index) {
                if (CLICKABLE_CONTAINERS) {
                    $scope.toggle(option, true, index);
                }
            }

            $scope.getText = function (option) {
               
                return typeof option.text === "string" ? option.text : option.text.key;
            }

            $scope.getInterpolations = function(option) {
                var output = typeof option.text === "string" ? {} : option.text.interpolations;

                output["langCode"] = $rootScope.langCode;

                return output;
            }


            function hasDefaultValue() {
                return typeof properties.defaultValue !== "undefined";
            }

            function select(option) {
                if ($scope.isSingleChoice) {
                    switchTo(option);
                }

                if ($scope.maxChoicesLimitReached()) {
                    return;
                }

                $scope.data.answers.push(option.value);
            }

            function unselect(option) {
                var index = $scope.data.answers.indexOf(option.value);
                
                $scope.data.answers.splice(index, 1);
            }

            function fillWithDefaultValue() {
                _.each($scope.options,function(option,index){
                    $scope.data.answers[index] = properties.defaultValue;
                });
            }

            function selectDefaultMode(option,index) {
                //var index = $scope.data.answers.indexOf(properties.defaultValue);
                $scope.data.answers[index] = option.value;
            }

            function unselectDefaultMode(option,index) {
                //var index = $scope.data.answers.indexOf(option.value);
                $scope.data.answers[index] = properties.defaultValue;
            }

            function switchTo(choice) {
                $scope.data.answers = [choice.value];
            }

        }
    ]);