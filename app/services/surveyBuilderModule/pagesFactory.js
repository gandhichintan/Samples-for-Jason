var PagesFactoryService = (function () {
    function PagesFactoryService($rootScope, $surveyHttp, $surveyConfigurator, $log, routerConfiguratorService, $translate, $saveSurveyService) {
        this.rootScope = $rootScope;
    }
    return PagesFactoryService;
})();
var userValidationServiceFactoryProvider = function ($rootScope, $surveyHttp, $surveyConfigurator, $log, routerConfiguratorService, $translate, $saveSurveyService) {
    return new UserValidationService($rootScope, $surveyHttp, $surveyConfigurator, $log, routerConfiguratorService, $translate, $saveSurveyService);
};
angular.module("cv.services").factory("userValidationService", ["$rootScope", "$surveyHttp", "$surveyConfigurator", "$log", "routerConfiguratorService", "$translate", "$saveSurveyService", userValidationServiceFactoryProvider]);
//# sourceMappingURL=pagesFactory.js.map