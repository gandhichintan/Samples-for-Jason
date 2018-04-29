//class RouterConfiguratorService {
//    private rootScope: ICVRootScope;
//    private surveyHttp: any;
//    private surveyConfigurator: any;
//    private iterator: any;
//    private state: any;
//    private log: any;
//    constructor($rootScope: ICVRootScope, $surveyHttp: any, $surveyConfigurator: any, $log: any, $iterator: any, $state: any) {
//        this.rootScope = $rootScope;
//        this.surveyHttp = $surveyHttp;
//        this.surveyConfigurator = $surveyConfigurator;
//        this.log = $log;
//        this.iterator = $iterator;
//        this.state = $state;
//    }
//    buildRouter() {
//        //this.rootScope.survey = this.surveyConfigurator.getSurvey();
//        if (!this.rootScope.surveyPages) {
//            this.rootScope.surveyPages = this.iterator(this.rootScope.survey.pages);
//            this.rootScope.surveyPages.reset();
//            this.surveyConfigurator.setupStates(this.rootScope.survey.pages);
//            this.state.go(this.rootScope.survey.pages[0].name);
//        }
//    }
//    refreshRouter(currentIndex: number): void {
//        this.rootScope.survey = this.surveyConfigurator.refreshSurvey();        
//        this.rootScope.surveyPages = this.iterator(this.rootScope.survey.pages);
//        this.rootScope.surveyPages.setIndex(currentIndex);
//    }
//}
//const routerConfiguratorServiceFactoryProvider =
//    ($rootScope: ICVRootScope, $surveyHttp: any, $surveyConfigurator: any, $log: any, $iterator: any, $state: any) =>
//        new RouterConfiguratorService($rootScope, $surveyHttp, $surveyConfigurator, $log, $iterator, $state);
//angular.module("cv.services").factory("routerConfiguratorService", ["$rootScope", "$surveyHttp", "$surveyConfigurator", "$log", "$iterator", "$state", routerConfiguratorServiceFactoryProvider]); 
//# sourceMappingURL=routerConfiguratorService.js.map