"use strict";

let $stateProviderRef, $urlRouterProviderRef;

class Configuration {

    constructor(
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: angular.ILocationProvider,
        localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider,
        private $translateProvider: ng.translate.ITranslateProvider
    ) {
        $stateProviderRef = $stateProvider;
        $urlRouterProviderRef = $urlRouterProvider;

        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(false);

        this.configureLanguages();

        localStorageServiceProvider.setStorageType('sessionStorage');
    }

    private isAllowedLanguage = (): boolean => _.any(Customerville.LanguageCollections, collection => collection.LanguageCode === localStorage.getItem('lang'));

    private configureLanguages = () => {
        const category = ["QuestionTexts", "QuestionErrors", "MultiChoiceAnswers", "Strings"];
        const defaultLanguage = localStorage.getItem('lang') || Customerville.userLang || Customerville.LanguageCollections[0].LanguageCode;

        _.each(Customerville.LanguageCollections, (lang) => {
            _.each(category, category => {
                _.each(lang[category], (value, attributeName) => {
                    lang.Strings[attributeName] = value;
                });
            });
            this.$translateProvider.translations(lang.LanguageCode, lang.Strings);
        });
        this.$translateProvider
            .preferredLanguage(defaultLanguage)
            .fallbackLanguage(defaultLanguage);
    }
}

const configurationFn = (
    $stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider,
    $locationProvider: angular.ILocationProvider,
    localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider,
    $translateProvider: ng.translate.ITranslateProvider
): Configuration => new Configuration($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $translateProvider);

angular.module(App.identifier).config([
    "$stateProvider", "$urlRouterProvider", "$locationProvider", "localStorageServiceProvider", "$translateProvider", configurationFn
]);