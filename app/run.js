"use strict";
var Run = (function () {
    function Run($rootScope, $state, $surveyConfigurator, $log, storageService, $surveyNavigator, $translate, journeyPhotos, $location) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$surveyConfigurator = $surveyConfigurator;
        this.$log = $log;
        this.storageService = storageService;
        this.$surveyNavigator = $surveyNavigator;
        this.$translate = $translate;
        this.journeyPhotos = journeyPhotos;
        this.$location = $location;
        this.hasStoredProgress = function () {
            return _this.progress !== null && !_.isEmpty(_this.progress);
        };
        this.hasStoredMetadata = function () { return _this.$rootScope.metadata !== null; };
        this.hasInvitationParams = function () { return Customerville.EmailParams !== null; };
        this.buildState = function (page) {
            return {
                "url": page.url,
                "controller": page.controller,
                "templateUrl": _this.buildTemplateUrl(page)
            };
        };
        this.buildTemplateUrl = function (page) { return ("/app/pages/" + page.template + "/" + page.template + ".html"); };
        this.setExitListener = function (surveyNavigator) {
            window.onunload = _this.saveProgress;
        };
        this.saveProgress = function () {
            _this.$rootScope.$emit("leavingSurvey");
        };
        $surveyNavigator.init();
        this.checkErrors();
        this.setUpLanguage();
        this.hidden = this.storageService.get("hidden") || null;
        this.progress = this.storageService.get("progress") || null;
        this.$rootScope.metadata = this.storageService.get("metadata") || null;
        this.instanceSurvey();
    }
    Run.prototype.checkErrors = function () {
        if (Customerville.ExceptionMessage) {
            this.$log.error(Customerville.ExceptionMessage);
            this.$surveyNavigator.showErrorMessage(Customerville.ExceptionMessage);
        }
    };
    Run.prototype.setUpLanguage = function () {
        var _this = this;
        this.$rootScope.languages = _.map(Customerville.AppLanguages, this.parseToPlsLanguageObj);
        this.$rootScope.hasMultipleLanguages = this.$rootScope.languages.length > 1;
        this.setBaseLanguage(this.$translate.use());
        this.$rootScope.$on('pls.onLanguageChanged', function (event, plsObject) {
            var languageCode = plsObject.lang.id;
            _this.setBaseLanguage(languageCode);
            _this.$translate.use(languageCode);
        });
    };
    Run.prototype.setBaseLanguage = function (languageCode) {
        this.$rootScope.baseLang = languageCode.split("-")[0];
        this.$rootScope.langCode = languageCode;
        localStorage.setItem("lang", languageCode);
    };
    Run.prototype.parseToPlsLanguageObj = function (name, code) {
        return {
            id: code,
            title: name,
            name: name,
            flagImg: Run.flagsFolder + "/" + code + "." + Run.flagsIconsExtension,
            flagTitle: name
        };
    };
    Run.prototype.instanceSurvey = function () {
        if (this.hasStoredProgress()) {
            this.$rootScope.survey = this.$surveyConfigurator.restoreSurvey(this.progress, this.hidden);
            this.setupRouting();
            this.resumeSurvey();
        }
        else {
            this.$rootScope.survey = this.$surveyConfigurator.createSurvey();
            this.setupRouting();
            this.startSurvey();
        }
        this.setExitListener(this.$surveyNavigator);
        this.setupDebugTools();
    };
    Run.prototype.customizeSurvey = function () {
        if (!this.hasStoredMetadata()) {
            return;
        }
        this.setPhotos();
        this.$surveyConfigurator.customizeSurvey();
    };
    Run.prototype.setPhotos = function () {
        var _this = this;
        var flights = this.$rootScope.metadata.flights;
        flights.forEach(function (flight, index) { return _this.journeyPhotos.SetDestinationPhoto(index, flight.airport.depAirportCode); });
        this.journeyPhotos.SetDestinationPhoto(flights.length, _.last(flights).airport.arrAirportCode);
    };
    Run.prototype.setupRouting = function () {
        var _this = this;
        var initialStatesCollectionLength = 1;
        if (this.$state.get().length > initialStatesCollectionLength) {
            this.$log.error("Trying to modify already setted up routing", this.$state.get());
            return;
        }
        this.$rootScope.survey.pages.forEach(function (page) {
            $stateProviderRef.state(page.name, _this.buildState(page));
        });
    };
    Run.prototype.resumeSurvey = function () {
        var lastPage = this.$rootScope.survey.lastPage;
        if (lastPage === null || lastPage == undefined) {
            lastPage = this.$rootScope.survey.getFirstPage();
        }
        this.$log.debug("Resuming survey");
        this.setDefaultPage(lastPage);
        this.$rootScope.survey.go(lastPage);
        setTimeout(this.$surveyNavigator.returnToLastPage.bind(this), 300);
    };
    Run.prototype.startSurvey = function () {
        this.$log.debug("Starting new survey");
        this.$location.path("/");
        this.setDefaultPage(this.$rootScope.survey.getFirstPage());
        this.$surveyNavigator.goToLandingPage();
    };
    Run.prototype.setDefaultPage = function (page) {
        this.$log.debug("Default page", page);
        if (page != null) {
            $urlRouterProviderRef.otherwise(page.url);
        }
        else {
            $urlRouterProviderRef.otherwise(this.$rootScope.survey.getFirstVisiblePage());
        }
    };
    Run.prototype.setupDebugTools = function () {
        var _this = this;
        var arrowRight = 39, arrowLeft = 37;
        document.onkeydown = function (e) {
            var evtobj = window.event ? event : e;
            if (evtobj.keyCode === arrowLeft && evtobj.ctrlKey) {
                _this.$rootScope.$emit("goToPreviousPageStartEvent");
            }
            if (evtobj.keyCode === arrowRight && evtobj.ctrlKey) {
                _this.$rootScope.$emit("goToNextPageStartEvent");
            }
            if (evtobj.keyCode === arrowRight && evtobj.ctrlKey && evtobj.shiftKey) {
                _this.$rootScope.$emit("goToNextPageWithoutValidationForDebug");
            }
        };
    };
    Run.flagsFolder = "company_res/veciteescucha/survey/images/flags";
    Run.flagsIconsExtension = "png";
    return Run;
}());
var runFn = function ($rootScope, $state, $surveyConfigurator, $log, storageService, $surveyNavigator, $translate, journeyPhotos, $location) {
    return new Run($rootScope, $state, $surveyConfigurator, $log, storageService, $surveyNavigator, $translate, journeyPhotos, $location);
};
angular.module(App.identifier).run([
    "$rootScope", "$state", SurveyConfigurator.id, "$log",
    "storageService", "$surveyNavigator", "$translate", "journeyPhotos", "$location",
    runFn]);
//# sourceMappingURL=run.js.map