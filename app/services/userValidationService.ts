//enum ValidationStatuses { Invalid, Valid, AlreadyDone };

//interface IValidationObject {
//    Status: ValidationStatuses;
//    CustomerData: any;
//}

//interface IValidationResponse {
//    data: IValidationObject;
//}

//class UserValidationService {
//    private rootScope: ICVRootScope;
//    private surveyHttp: any;
//    private surveyConfigurator: any;
//    private saveSurveyService: SaveSurveyService;
//    private log: any;
//    private routerConfiguratorService: any;
//    private translate: angular.translate.ITranslateService;
//    private conf: any;

//    constructor($rootScope: ICVRootScope, $surveyHttp: any, $surveyConfigurator: any, $log: any, routerConfiguratorService: any, $translate: angular.translate.ITranslateService, $saveSurveyService: SaveSurveyService) {
//        //this.rootScope = $rootScope;
//        //this.surveyHttp = $surveyHttp;
//        //this.surveyConfigurator = $surveyConfigurator;
//        //this.saveSurveyService = $saveSurveyService;
//        //this.log = $log;
//        //this.routerConfiguratorService = routerConfiguratorService;
//        //this.translate = $translate;
//    }

//    validateInvitation(invitationToken: string, success: Function, fail: Function): void {
//        //var url = "/UserValidation/ValidateInvitation",
//        //    params = { invitationToken: invitationToken };
//        //this.rootScope.conf = { ID_CLAVE: invitationToken };

//        //this.checkValidation(url, params, success, fail);
//    }

//    private checkValidation(url: string, params: any, success: Function, fail: Function) {
//        //this.rootScope.$broadcast("blockUiMessage");
//        //this.surveyHttp.postSecure(url, params)
//        //    .then(response => {
//        //        this.validationEnded(response, success, fail);
//        //    }, response => {
//        //        this.displayError(response);
//        //    });
//    }

//    validationEnded = (response: IValidationResponse, success: Function, fail: Function) => {
//        //this.rootScope.$broadcast("unblockUiMessage");
//        //this.rootScope.conf = response.data.CustomerData;

//        //if (response.data.Status === ValidationStatuses.Valid) {
//        //    this.invitationValidated(success);
//        //} else {
//        //    let status = response.data.Status === ValidationStatuses.Invalid ? 2 : 4;

//        //    fail(status);
//        //}
//    }

//    private invitationValidated = (callback: Function) => {
//        //this.routerConfiguratorService.refreshRouter(0);
//        //callback();
//    }

//    private displayError = (response: any) => {
//        //Todo implement show error message!
//    }
//}

//const userValidationServiceFactoryProvider =
//    ($rootScope: ICVRootScope, $surveyHttp: any, $surveyConfigurator: any, $log: any, routerConfiguratorService: any, $translate: angular.translate.ITranslateService, $saveSurveyService: SaveSurveyService) => {
//        return new UserValidationService($rootScope, $surveyHttp, $surveyConfigurator, $log, routerConfiguratorService, $translate, $saveSurveyService);
//    };

//angular.module("cv.services").factory("userValidationService",
//    ["$rootScope", "$surveyHttp", "$surveyConfigurator", "$log", "routerConfiguratorService", "$translate", "$saveSurveyService", userValidationServiceFactoryProvider]);
