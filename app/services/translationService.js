/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/angular-translate/angular-translate.d.ts" />
"use strict";
var TranslationService = (function () {
    function TranslationService($rootScope, $translate, $log) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$translate = $translate;
        this.$log = $log;
        this.getQuestionFormatMessage = function (id) {
            var key = _this.buildQuestionFormatMessageKey(id);
            return _this.keyOrNull(key);
        };
        this.getPageHeader = function (pageNumber) { return _this.getEntityParagraphsArray(pageNumber, _this.buildPageHeaderParagraphKey); };
        this.getQuoteParagraphsArray = function (pageNumber) { return _this.getEntityParagraphsArray(pageNumber, _this.buildQuoteParagraphKey); };
        this.getLinksArray = function (pageNumber) { return _this.getEntityParagraphsArray(pageNumber, _this.buildLinksKey); };
        this.getLinksUrlArray = function (pageNumber) { return _this.getEntityParagraphsArray(pageNumber, _this.buildLinksUrlKey); };
        this.getExtraTextsArray = function (pageNumber) { return _this.getEntityParagraphsArray(pageNumber, _this.buildExtraTextKey); };
        this.getFooterTextsArray = function (pageNumber) { return _this.getEntityParagraphsArray(pageNumber, _this.buildFooterTextKey); };
        // todo refactor (smell -> duplicated code)
        this.buildPageHeaderParagraphKey = function (pageNumber, paragraph) { return ("PAGES_" + pageNumber + "_HEADER_" + paragraph); };
        this.buildPageQuoteTitleKey = function (pageNumber) { return ("PAGES_" + pageNumber + "_QUOTE_TITLE"); };
        this.buildPageQuoteSignatureKey = function (pageNumber) { return ("PAGES_" + pageNumber + "_QUOTE_SIGNATURE"); };
        this.buildQuoteParagraphKey = function (page, paragraph) { return ("PAGES_" + page + "_QUOTE_PARAGRAPH_" + paragraph); };
        this.buildLinksKey = function (page, paragraph) { return ("PAGES_" + page + "_LINK_" + paragraph); };
        this.buildLinksUrlKey = function (page, paragraph) { return ("PAGES_" + page + "_LINK_URL_" + paragraph); };
        this.buildExtraTextKey = function (page, paragraph) { return ("PAGES_" + page + "_EXTRA_" + paragraph); };
        this.buildFooterTextKey = function (page, paragraph) { return ("PAGES_" + page + "_FOOTER_" + paragraph); };
        this.buildQuestionTextKey = function (questionId) { return ("QUEST_" + questionId + "_TEXT"); };
        this.buildPageTitleKey = function (pageNumber) { return ("PAGES_" + pageNumber + "_TITLE"); };
        this.buildQuestionErrorMessageKey = function (questionId) { return ("QUEST_" + questionId + "_ERROR"); };
        this.buildQuestionFormatMessageKey = function (id) { return ("QUESTIONS_" + id + "_FORMAT_MESSAGE"); };
        this.keyOrNull = function (key) { return _this.exists(key) ? key : null; };
        this.exists = function (key) { return _this.$translate.instant(key) !== key; };
    }
    // todo refactor (smell -> duplicate code)
    TranslationService.prototype.getPageTitle = function (pageNumber) {
        var key = this.buildPageTitleKey(pageNumber);
        return this.keyOrNull(key);
    };
    TranslationService.prototype.getQuestionText = function (questionId) {
        var key = this.buildQuestionTextKey(questionId);
        return this.keyOrNull(key);
    };
    TranslationService.prototype.getQuestionErrorMessage = function (questionId) {
        var key = this.buildQuestionErrorMessageKey(questionId);
        return this.keyOrNull(key);
    };
    /**
     * Builds and returns a Quote object for the given page
     * @param {number} pageNumber
     * @returns {Quote}
     */
    TranslationService.prototype.getPageQuote = function (pageNumber) {
        return Quote.create({
            title: this.keyOrNull(this.buildPageQuoteTitleKey(pageNumber)),
            paragraphs: this.getQuoteParagraphsArray(pageNumber),
            signature: this.keyOrNull(this.buildPageQuoteSignatureKey(pageNumber))
        });
    };
    /**
     * Retrieves and returns a collection of paragraphs
     * @param {number} pageNumber
     * @param {IParagraphKeyBuilder} fn
     * @return {Array<string>}
     */
    TranslationService.prototype.getEntityParagraphsArray = function (pageNumber, fn) {
        var paragraphs = [], iterate = 1, end = false, key;
        while (!end) {
            key = fn(pageNumber, iterate);
            if (!this.exists(key)) {
                end = true;
            }
            else {
                paragraphs.push(key);
                iterate += 1;
            }
        }
        return paragraphs;
    };
    /**
     * Returns an array with the indexes of the translations of the posible options for the question with the given Id
     * @param questionId
     */
    TranslationService.prototype.getMultiChoiceAnswers = function (questionId) {
        /*
        let choices: any = [],
            prefix = `QUEST_${questionId}_OPTION`,
            pandorasBox = Customerville.LanguageCollections[0].MultiChoiceAnswers,
            containsPrefix = (value: any) => value.indexOf(prefix) !== -1;

        choices = _.reduce(pandorasBox, (collection: any, translation: string, index: string) => {
            if (containsPrefix(index)) {
                let value = Customerville.MultiChoiceAnswers[index];
                collection[value] = translation;
            }
            return collection;
        }, {});
        */
        var choices = [], prefix = "QUEST_" + questionId + "_OPTION", pandorasBox = Customerville.MultiChoiceAnswers;
        choices = _(pandorasBox)
            .pick(function (value, key) { return key.indexOf(prefix) !== -1; })
            .map(function (value, key) { return ({ text: key, order: value.Order, value: value.Text }); })
            .sortBy("order")
            .value();
        return choices;
    };
    return TranslationService;
}());
angular.module("cv.services")
    .factory("translationService", ["$rootScope", "$translate", "$log",
    function ($rootScope, $translate, $log) { return new TranslationService($rootScope, $translate, $log); }]);
//# sourceMappingURL=translationService.js.map