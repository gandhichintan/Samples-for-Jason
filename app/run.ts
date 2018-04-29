"use strict";

class Run {
    private static flagsFolder = "company_res/veciteescucha/survey/images/flags";
    private static flagsIconsExtension = "png";

    private progress: any;
    private hidden: any;

    constructor(
        public $rootScope: ICVRootScope, private $state: ng.ui.IStateService,
        private $surveyConfigurator: SurveyConfigurator,
        private $log: ng.ILogService, private storageService: StorageService,
        private $surveyNavigator, private $translate: ng.translate.ITranslateService,
        private journeyPhotos: JourneyPhotosService,
        private $location
    ) {
        $surveyNavigator.init();
        this.checkErrors();
        this.setUpLanguage();
        this.hidden = this.storageService.get("hidden") || null;
        this.progress = this.storageService.get("progress") || null;
        this.$rootScope.metadata = this.storageService.get("metadata") || null;

        this.instanceSurvey();
    }

    private hasStoredProgress = (): boolean => {
       return this.progress !== null && !_.isEmpty(this.progress);
    } 

    private hasStoredMetadata = (): boolean => this.$rootScope.metadata !== null;

    private hasInvitationParams = ():boolean => Customerville.EmailParams !== null;

    private checkErrors() {
        if (Customerville.ExceptionMessage) {
            this.$log.error(Customerville.ExceptionMessage);
            this.$surveyNavigator.showErrorMessage(Customerville.ExceptionMessage);
        }
    }

    private setUpLanguage() {
        this.$rootScope.languages = _.map(Customerville.AppLanguages, this.parseToPlsLanguageObj);
        this.$rootScope.hasMultipleLanguages = this.$rootScope.languages.length > 1;
        this.setBaseLanguage(this.$translate.use());

        this.$rootScope.$on('pls.onLanguageChanged', (event, plsObject) => {
            const languageCode = plsObject.lang.id;

            this.setBaseLanguage(languageCode);
            this.$translate.use(languageCode);
        });
    }

    private setBaseLanguage(languageCode: string) {
        this.$rootScope.baseLang = languageCode.split("-")[0];
        this.$rootScope.langCode = languageCode;

        localStorage.setItem("lang", languageCode);
    }

    private parseToPlsLanguageObj(name, code): IPlsObject {
        return {
            id: code,
            title: name,
            name: name,
            flagImg: `${Run.flagsFolder}/${code}.${Run.flagsIconsExtension}`,
            flagTitle: name
        };
    }

    private instanceSurvey() {
        if (this.hasStoredProgress()) {
            this.$rootScope.survey = this.$surveyConfigurator.restoreSurvey(this.progress, this.hidden);
            this.setupRouting();
            this.resumeSurvey();
        } else {
            this.$rootScope.survey = this.$surveyConfigurator.createSurvey();
            this.setupRouting();
            this.startSurvey();
            
        }

        this.setExitListener(this.$surveyNavigator);
        this.setupDebugTools();
    }

    private customizeSurvey() {
        if (!this.hasStoredMetadata()) {
            return;
        }

        this.setPhotos();
        this.$surveyConfigurator.customizeSurvey();
    }

    private setPhotos() {
        const flights = this.$rootScope.metadata.flights;

        flights.forEach((flight: IFlightInfo, index) => this.journeyPhotos.SetDestinationPhoto(index, flight.airport.depAirportCode));
        this.journeyPhotos.SetDestinationPhoto(flights.length, _.last(flights).airport.arrAirportCode);
    }

    private setupRouting() {
        const initialStatesCollectionLength = 1;
        if (this.$state.get().length > initialStatesCollectionLength ) {
            this.$log.error("Trying to modify already setted up routing", this.$state.get());
            return;
        }

        this.$rootScope.survey.pages.forEach((page: Page) => {
            $stateProviderRef.state(page.name, this.buildState(page));
        });
    }

    private buildState = (page: Page): ng.ui.IState => {
        return {
            "url": page.url,
            "controller": page.controller,
            "templateUrl": this.buildTemplateUrl(page)
        }
    }

    private buildTemplateUrl = (page: Page): string => `/app/pages/${page.template}/${page.template}.html`;

    private resumeSurvey() {

        var lastPage = this.$rootScope.survey.lastPage;

        if (lastPage === null || lastPage == undefined) {
            lastPage = this.$rootScope.survey.getFirstPage();
        }

        this.$log.debug("Resuming survey");
        this.setDefaultPage(lastPage);
        this.$rootScope.survey.go(lastPage);
        setTimeout(this.$surveyNavigator.returnToLastPage.bind(this), 300);
    }

    private startSurvey() {
        this.$log.debug("Starting new survey");
        this.$location.path("/");
        this.setDefaultPage(this.$rootScope.survey.getFirstPage());
        this.$surveyNavigator.goToLandingPage();
    }

    private setDefaultPage(page) {

        this.$log.debug("Default page", page);
        if (page != null) {
            $urlRouterProviderRef.otherwise(page.url);
        }
        else {
            $urlRouterProviderRef.otherwise(this.$rootScope.survey.getFirstVisiblePage());
        }

    }

    private setupDebugTools() {
        const arrowRight = 39, arrowLeft = 37;

        document.onkeydown = e => {
            const evtobj = window.event ? event as KeyboardEvent : e;

            if (evtobj.keyCode === arrowLeft && evtobj.ctrlKey) {
                this.$rootScope.$emit("goToPreviousPageStartEvent");
            }

            if (evtobj.keyCode === arrowRight && evtobj.ctrlKey) {
                this.$rootScope.$emit("goToNextPageStartEvent");
            }

            if (evtobj.keyCode === arrowRight && evtobj.ctrlKey && evtobj.shiftKey) {
                this.$rootScope.$emit("goToNextPageWithoutValidationForDebug");
            }
        };
    }

    private setExitListener = (surveyNavigator) => {
        window.onunload = this.saveProgress;
    }

    private saveProgress = () => {
        this.$rootScope.$emit("leavingSurvey");
    }
}

const runFn = ($rootScope, $state, $surveyConfigurator: SurveyConfigurator, $log, storageService, $surveyNavigator, $translate, journeyPhotos, $location): Run =>
    new Run($rootScope, $state, $surveyConfigurator, $log, storageService, $surveyNavigator, $translate, journeyPhotos, $location);

angular.module(App.identifier).run([
    "$rootScope", "$state", SurveyConfigurator.id, "$log",
    "storageService", "$surveyNavigator", "$translate", "journeyPhotos","$location",
    runFn]);