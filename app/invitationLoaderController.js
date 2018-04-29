var InvitationLoaderController = (function () {
    function InvitationLoaderController($rootScope, $scope, $surveyNavigator, $surveyUtils, $controller, $surveyHttp, $surveyConfigurator, $log, journeyPhotoService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$surveyNavigator = $surveyNavigator;
        this.$surveyUtils = $surveyUtils;
        this.$controller = $controller;
        this.$surveyHttp = $surveyHttp;
        this.$surveyConfigurator = $surveyConfigurator;
        this.$log = $log;
        this.journeyPhotoService = journeyPhotoService;
        this.loadInvitation = function (invitationParams) {
            _this.$surveyHttp.loadInvitation(invitationParams)
                .success(function (result) {
                //TODO load invitation success
                _this.startSurvey();
            })
                .error(function (data, status) {
                throw data + " " + status;
            });
        };
        this.sanitizeDate = function (date) {
            var _a = date.split("/"), day = _a[0], month = _a[1], year = _a[2];
            return month + "/" + day + "/" + year;
        };
        this.setHiddenQuestions = function (resultJson) {
            //TODO
        };
        this.startSurvey = function () {
            _this.$surveyConfigurator.customizeSurvey();
            _this.hideSearchingPrompt();
            _this.$rootScope.$broadcast("goToNextPageStartEvent");
        };
        this.setPhotos = function () {
            var flights = _this.$rootScope.metadata.flights;
            for (var i = 0; i < flights.length; i++) {
                _this.journeyPhotoService.SetDestinationPhoto(i, flights[i].airport.depAirportCode);
            }
            _this.journeyPhotoService.SetDestinationPhoto(flights.length, flights[flights.length - 1].airport.arrAirportCode);
        };
        //TODO:
        // - Move the functions for searchingprompt to a correct place
        this.showSearchingPrompt = function () {
            _this.$surveyUtils.blockUI({
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
        };
        this.hideSearchingPrompt = function () {
            _this.$surveyUtils.unblockUI();
        };
        $(".polyglot-language-switcher.ng-polyglot-language-switcher a").each(function (index, anchor) { return $(anchor).removeAttr("href"); }); // fix for PLS weird behaviour. Todo find out a better solution
        this.$controller("pageBaseController", { $scope: this.$scope });
        if (!this.$scope.pageInit()) {
            return;
        }
        this.invitationParams = Customerville.EmailParams;
        this.$rootScope.$on("validate_" + InvitationLoaderController.controllerName, function () {
            _this.$rootScope.$emit("goToNextPageEndEvent", true);
        });
        this.showSearchingPrompt();
        this.loadInvitation(this.invitationParams);
    }
    InvitationLoaderController.$inject = ['$rootScope', '$scope', '$surveyNavigator', '$surveyUtils', '$controller', '$surveyHttp', '$surveyConfigurator', '$log', 'journeyPhotos'];
    InvitationLoaderController.controllerName = 'InvitationLoaderController';
    return InvitationLoaderController;
}());
angular.module("cv.controllers").controller(InvitationLoaderController.controllerName, InvitationLoaderController);
//let result = {
//    AnswerValues: { "AnswerValues": [{ "QuestID": "QUEST102", "Value": "NJNH3" }, { "QuestID": "QUEST27", "Value": "RAYNALJACQUES" }, { "QuestID": "QUEST6", "Value": "JACQUES_RAYNAL@YAHOO.FR" }, { "QuestID": "QUEST101", "Value": "confirmationCode" }] },
//    ErrorCode: 0,
//    FlightsJson: { "pnr": "NJNH3", "pnrTest": "", "buyChannel": "", "ckiChannel": "", "email": "JACQUES_RAYNAL@YAHOO.FR", "passenger": { "name": "RAYNALJACQUES", "surname": "RAYNALJACQUES", "conexMAD": true, "vipReg": false, "bag": null, "FF": "IB90000000", "FFType": null }, "flights": [{ "haul": "MEDIO", "cabin": "Turista", "boardingName": "RAYNALJACQUES/ RAYN", "plane": null, "airlineMkt": "IB", "airlineOp": "YW", "airport": { "depAirportCode": "BIQ", "arrAirportCode": "MAD", "depAirportName": "Biq - Ib", "arrAirportName": "Madrid (MAD)" }, "flightNumber": "8243", "flightDate": "24/ 08 / 2016", "flightDateGMT": null, "depTime": "13: 45", "depTimeGMT": null, "depTimeReal": null, "depTimeGMTReal": null, "arrTime": "14: 45", "arrTimeGMT": null, "arrTimeReal": null, "arrTimeGMTReal": null }] },
//    Message: "Success",
//    SessionTimeout: false,
//    Success: true
//}; 
//# sourceMappingURL=invitationLoaderController.js.map