"use strict";

angular.module("cv.controllers").controller("thankYouController",
     ["$rootScope","$scope", "$controller",
    function ($rootScope, $scope, $controller) {
        try {
            init();
        } catch (ex) {
            $scope.showErrorMessage(ex);
        }

        function init() {
            $controller("pageBaseController", { $scope: $scope });

            if (!$scope.pageInit()) {
                return;
            }
            if ($rootScope.survey.raffle == true) {
                $scope.postitClass = "thankyou-postit thankyou-postit-raffle";
            } else {
                $scope.postitClass = "thankyou-postit thankyou-postit-no-raffle";
            }

            loadAnswers();
        }


        // Answers
        function loadAnswers() {
        }

        function saveAnswers() {

        }


        // Validate
        $scope.$on("validate_thankYouController",
            function (event, toState, toParams, fromState, fromParams) {
                validate();
            });

        function validate() {
            
        }
    }
    ]);