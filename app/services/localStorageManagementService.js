angular.module("cv.services")
    .factory("localStorageManagementService", ["$rootScope", "localStorageService", function($rootScope, localStorageService) {
        return {
            getSurvey: function() {
                return localStorageService.get("survey");
            },

            saveSurvey: function(survey) {
                var survey = survey || $rootScope.survey;

                localStorageService.set("survey", survey);
            }
        }
    }]);