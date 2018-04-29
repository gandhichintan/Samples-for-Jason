var landingController = (function () {
"use strict";
angular.module("cv.controllers")
    .controller("landingController", landingController);
    function landingController($rootScope, $scope, $controller, environmentService, $surveyNavigator) {

        (function () {
            environmentService.changeStyle('', '');
        })();

        $scope.environment = environmentService;
        $scope.nextPage = function (surv) {
            $scope.$emit("goToNextPageEndEvent", true);
            environmentService.setActiveSurvey(surv);
            $rootScope.survey.currentSurvey = surv;          
        };

        function init() {
            $controller("pageBaseController", { $scope: $scope });
            if (!$scope.pageInit()) {
                return;
            }
        }

        try {
            init();
        } catch (ex) {
            $scope.showErrorMessage(ex);
        }
    }
})();

angular.$inject = ["$rootScope", "$scope", "$controller", "environmentService", "$surveyNavigator"];