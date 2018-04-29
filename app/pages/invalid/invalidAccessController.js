"use strict";

(function (app) {
   
    var invalidAccessController = function ($rootScope, $scope, $controller) {


        var statuses = {
            validating: 0,
            valid: 1,
            invalid: 2,
            noTokenFound: 3,
            alreadyDone: 4
        }
        $scope.statuses = statuses;

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

            $scope.pageStrings = Customerville.pageStrings;

            $scope.status = $rootScope.seemsToHaveInvitation ? statuses.validating : statuses.noTokenFound;
            $rootScope.showLoading = $rootScope.seemsToHaveInvitation;

            setTimeout(function () {
                if ($rootScope.seemsToHaveInvitation) {
                    userValidationService.validateInvitation(Customerville.InvitationCode,
                        function () {
                            $rootScope.survey.getPage("invalid-access").navigable = true;
                            $scope.status = statuses.valid;
                            $rootScope.showLoading = false;
                        }, function (status) {
                            $scope.status = status;
                            $rootScope.showLoading = false;
                        });
                }
            }, 1500);
        }



    };

    app.controller("InvalidAccessController", [
       "$rootScope", "$scope", "$controller", invalidAccessController
    ]);
})(angular.module("cv.controllers"));