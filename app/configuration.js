"use strict";
var $stateProviderRef, $urlRouterProviderRef;
var Configuration = (function () {
    function Configuration($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $translateProvider) {
        var _this = this;
        this.$translateProvider = $translateProvider;
        this.isAllowedLanguage = function () { return _.any(Customerville.LanguageCollections, function (collection) { return collection.LanguageCode === localStorage.getItem('lang'); }); };
        this.configureLanguages = function () {
            var category = ["QuestionTexts", "QuestionErrors", "MultiChoiceAnswers", "Strings"];
            var defaultLanguage = localStorage.getItem('lang') || Customerville.userLang || Customerville.LanguageCollections[0].LanguageCode;
            _.each(Customerville.LanguageCollections, function (lang) {
                _.each(category, function (category) {
                    _.each(lang[category], function (value, attributeName) {
                        lang.Strings[attributeName] = value;
                    });
                });
                _this.$translateProvider.translations(lang.LanguageCode, lang.Strings);
            });
            _this.$translateProvider
                .preferredLanguage(defaultLanguage)
                .fallbackLanguage(defaultLanguage);
        };
        $stateProviderRef = $stateProvider;
        $urlRouterProviderRef = $urlRouterProvider;
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(false);
        this.configureLanguages();
        localStorageServiceProvider.setStorageType('sessionStorage');
    }
    return Configuration;
}());
var configurationFn = function ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $translateProvider) {
    return new Configuration($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $translateProvider);
};
angular.module(App.identifier).config([
    "$stateProvider", "$urlRouterProvider", "$locationProvider", "localStorageServiceProvider", "$translateProvider", configurationFn
]);
//# sourceMappingURL=configuration.js.map