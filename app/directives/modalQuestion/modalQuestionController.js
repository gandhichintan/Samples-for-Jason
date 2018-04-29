"use strict";

angular.module("cv.directives")
    .controller("modalQuestionController", [
        "$scope", "$rootScope", "directivesPath", "$modal", "$log", function ($scope, $rootScope, directivesPath, $modal, $log) {
            var modalTemplateUrl = directivesPath + "modalQuestion/modal/modal.html";
            var properties = $scope.data.properties;
            $scope.data.answers = properties.question.answers; // ?
            $scope.text = properties.triggerButtontText;
            
            $scope.trigger = function () {
                $modal.open(getConfiguration());
            }

            function getConfiguration() {
                return {
                    animation: true,
                    templateUrl: modalTemplateUrl,
                    controller: "modalQuestionModalController",
                    backdrop: "static",
                    keyboard: false,
                    size: "sm",
                    resolve: {
                        question: function () {
                            return properties.question;
                        }
                    }
                };
            }
        }
    ]);