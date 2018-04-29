"use strict";

(function () {
    var userDataController = function ($controller, $scope, $translate) {
        // todo is this prototyping??? if yes, is the better way to do it???

        function init() {
            $controller("pageBaseController", { $scope: $scope });

            if (!$scope.pageInit()) {
                return;
            }
        }

        /**
         * Throws the error message if the question is not answered
         */
        function isSuplied(question) {
            if (question.answers.length === 0) {
                throw question.errorMessage;
            }
        }

        /**
         * Expression wrapping for more readability
         */
        var isAccepted = isSuplied;

        /**
         * Throws an error message if neither email or phone are suplied
         */
        function theresContactMethodSuplied() {
            var email = $scope.questions[2],
                phone = $scope.questions[3],
                emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                emailSuplied = email.answers.length > 0 && emailPattern.test(email.answers[0]),
                phoneSuplied = phone.answers.length > 0 && phone.answers[0].trim() !== "";

            if (!emailSuplied && !phoneSuplied) {
                throw email.errorMessage || phone.errorMessage;
            }
        }

        /**
         * Calls more specific validation methods and 
         * returns {success: (bool), errorMessage: (string | failed question error message)} 
         */
        function validate() {
            var name = $scope.questions[0],
                surname = $scope.questions[1],
                policy = $scope.questions[4];

            try {
                isSuplied(name);
                isSuplied(surname);
                theresContactMethodSuplied();
                isAccepted(policy);
            } catch (errorMessage) {
                return { success: false, errorMessage: errorMessage };
            }

            return { success: true, errorMessage: "" };
        }

        /**
         * Event handlers
         */
        $scope.$on("validate_userDataController",
               function () {
                   var validationResult = validate(),
                       isValid = validationResult.success,
                       message = validationResult.errorMessage || "";

                   $scope.$emit("goToNextPageEndEvent", isValid, $translate.instant(message));
               });

        // Main
        try {
            init();
        } catch (ex) {
            $scope.showErrorMessage(ex);
        }
    };

    angular.module("cv.controllers")
        .controller("userDataController", ["$controller", "$scope", "$translate", userDataController]);
})();