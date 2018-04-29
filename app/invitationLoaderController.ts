interface CVRootScope extends ng.IRootScopeService {
    conf: any;
    firstPage: string;
    surveyPages: any;
    metadata: any;
    survey: any;
}

class InvitationLoaderController {
    static $inject = ['$rootScope', '$scope', '$surveyNavigator', '$surveyUtils', '$controller', '$surveyHttp', '$surveyConfigurator', '$log', 'journeyPhotos'];
    static controllerName = 'InvitationLoaderController';

    private invitationParams: any;

    constructor(
        private $rootScope: ICVRootScope, private $scope: IPageControllerScope, private $surveyNavigator,
        private $surveyUtils, private $controller, private $surveyHttp, private $surveyConfigurator: SurveyConfigurator,
        private $log: ng.ILogService, private journeyPhotoService: JourneyPhotosService
    ) {
        $(".polyglot-language-switcher.ng-polyglot-language-switcher a").each((index: number, anchor: Element) => $(anchor).removeAttr("href")); // fix for PLS weird behaviour. Todo find out a better solution

        this.$controller("pageBaseController", { $scope: this.$scope });

        if (!this.$scope.pageInit()) {
            return;
        }

        this.invitationParams = Customerville.EmailParams;

        this.$rootScope.$on(`validate_${InvitationLoaderController.controllerName}`,
            () => {
                this.$rootScope.$emit("goToNextPageEndEvent", true);
            });


        this.showSearchingPrompt();
        this.loadInvitation(this.invitationParams);
    }

    public loadInvitation = (invitationParams: any) => {
        this.$surveyHttp.loadInvitation(invitationParams)
            .success((result: any) => {
                //TODO load invitation success
                this.startSurvey(); 
            })
            .error((data, status) => {
                throw `${data} ${status}`;
            });
    }

    private sanitizeDate = (date: string): string => {
        const [day, month, year] = date.split("/");
        return `${month}/${day}/${year}`;
    }    

    private setHiddenQuestions = (resultJson) => {
        //TODO
    }
    
    private startSurvey = () => {
        this.$surveyConfigurator.customizeSurvey();
        this.hideSearchingPrompt();
        this.$rootScope.$broadcast("goToNextPageStartEvent");
    }

    private setPhotos = () => {
        var flights = this.$rootScope.metadata.flights;
        for (var i = 0; i < flights.length; i++) {
            this.journeyPhotoService.SetDestinationPhoto(i, flights[i].airport.depAirportCode);
        }
        this.journeyPhotoService.SetDestinationPhoto(flights.length, flights[flights.length - 1].airport.arrAirportCode);
    }

    //TODO:
    // - Move the functions for searchingprompt to a correct place
    public showSearchingPrompt = () => {
        this.$surveyUtils.blockUI({
            message: $('div.page-loading-box'),
            fadeIn: 300,
            fadeOut: 200,
            centerY: false,
            centerX: false,
            css: {
                width: '100%',
                left: '0%',
                top: '30%',
                cursor: 'wait'
            },
            overlayCSS: {
                opacity: 0.60
            }
        });
    }

    public hideSearchingPrompt = () => {
        this.$surveyUtils.unblockUI();
    }

}

angular.module("cv.controllers").controller(InvitationLoaderController.controllerName, InvitationLoaderController);

//let result = {
//    AnswerValues: { "AnswerValues": [{ "QuestID": "QUEST102", "Value": "NJNH3" }, { "QuestID": "QUEST27", "Value": "RAYNALJACQUES" }, { "QuestID": "QUEST6", "Value": "JACQUES_RAYNAL@YAHOO.FR" }, { "QuestID": "QUEST101", "Value": "confirmationCode" }] },
//    ErrorCode: 0,
//    FlightsJson: { "pnr": "NJNH3", "pnrTest": "", "buyChannel": "", "ckiChannel": "", "email": "JACQUES_RAYNAL@YAHOO.FR", "passenger": { "name": "RAYNALJACQUES", "surname": "RAYNALJACQUES", "conexMAD": true, "vipReg": false, "bag": null, "FF": "IB90000000", "FFType": null }, "flights": [{ "haul": "MEDIO", "cabin": "Turista", "boardingName": "RAYNALJACQUES/ RAYN", "plane": null, "airlineMkt": "IB", "airlineOp": "YW", "airport": { "depAirportCode": "BIQ", "arrAirportCode": "MAD", "depAirportName": "Biq - Ib", "arrAirportName": "Madrid (MAD)" }, "flightNumber": "8243", "flightDate": "24/ 08 / 2016", "flightDateGMT": null, "depTime": "13: 45", "depTimeGMT": null, "depTimeReal": null, "depTimeGMTReal": null, "arrTime": "14: 45", "arrTimeGMT": null, "arrTimeReal": null, "arrTimeGMTReal": null }] },
//    Message: "Success",
//    SessionTimeout: false,
//    Success: true
//};