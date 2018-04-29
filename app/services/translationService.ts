/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/angular-translate/angular-translate.d.ts" />

"use strict";

interface IParagraphKeyBuilder {
    (pageNumber: number, paragraphNumber: number): string;
}

class TranslationService {

    constructor(private $rootScope: angular.IRootScopeService, private $translate: angular.translate.ITranslateService, private $log: ng.ILogService) {
    }

    // todo refactor (smell -> duplicate code)
    getPageTitle(pageNumber: number) {
        var key: string = this.buildPageTitleKey(pageNumber);

        return this.keyOrNull(key);
    }

    getQuestionText(questionId: number) {
        var key: string = this.buildQuestionTextKey(questionId);

        return this.keyOrNull(key);
    }

    getQuestionErrorMessage(questionId: number) {
        var key: string = this.buildQuestionErrorMessageKey(questionId);

        return this.keyOrNull(key);
    }

    getQuestionFormatMessage = (id: number) => {
        var key: string = this.buildQuestionFormatMessageKey(id);

        return this.keyOrNull(key);
    }

    /**
     * Builds and returns a Quote object for the given page
     * @param {number} pageNumber
     * @returns {Quote}
     */
    getPageQuote(pageNumber: number): Quote {
        return Quote.create({
            title: this.keyOrNull(this.buildPageQuoteTitleKey(pageNumber)),
            paragraphs: this.getQuoteParagraphsArray(pageNumber),
            signature: this.keyOrNull(this.buildPageQuoteSignatureKey(pageNumber))
        });
    }

    getPageHeader = (pageNumber: number): Array<string> => this.getEntityParagraphsArray(pageNumber, this.buildPageHeaderParagraphKey);

    getQuoteParagraphsArray = (pageNumber: number): Array<string> => this.getEntityParagraphsArray(pageNumber, this.buildQuoteParagraphKey);

    getLinksArray = (pageNumber: number): Array<string> => this.getEntityParagraphsArray(pageNumber, this.buildLinksKey);

    getLinksUrlArray = (pageNumber: number): Array<string> => this.getEntityParagraphsArray(pageNumber, this.buildLinksUrlKey);

    getExtraTextsArray = (pageNumber: number): Array<string> => this.getEntityParagraphsArray(pageNumber, this.buildExtraTextKey);

    getFooterTextsArray = (pageNumber: number): Array<string> => this.getEntityParagraphsArray(pageNumber, this.buildFooterTextKey);

    /**
     * Retrieves and returns a collection of paragraphs
     * @param {number} pageNumber
     * @param {IParagraphKeyBuilder} fn
     * @return {Array<string>}
     */
    private getEntityParagraphsArray(pageNumber: number, fn: IParagraphKeyBuilder): Array<string> {
        var paragraphs = [],
            iterate = 1,
            end = false,
            key;

        while (!end) {
            key = fn(pageNumber, iterate);

            if (!this.exists(key)) {
                end = true;
            } else {
                paragraphs.push(key);
                iterate += 1;
            }
        }

        return paragraphs;
    }

    /**
     * Returns an array with the indexes of the translations of the posible options for the question with the given Id
     * @param questionId
     */
    getMultiChoiceAnswers(questionId: number): Array<string> {
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

        let choices: any = [],
            prefix = `QUEST_${questionId}_OPTION`,
            pandorasBox = Customerville.MultiChoiceAnswers;

        choices = _(pandorasBox)
            .pick((value: any, key: string) => key.indexOf(prefix) !== -1)
            .map((value: any, key: string) => ({ text: key, order: value.Order, value: value.Text }))
            .sortBy("order")
            .value();

        return choices;
    }

    // todo refactor (smell -> duplicated code)
    private buildPageHeaderParagraphKey = (pageNumber: number, paragraph: number): string => `PAGES_${pageNumber}_HEADER_${paragraph}`;

    private buildPageQuoteTitleKey = (pageNumber: number): string => `PAGES_${pageNumber}_QUOTE_TITLE`;

    private buildPageQuoteSignatureKey = (pageNumber: number): string => `PAGES_${pageNumber}_QUOTE_SIGNATURE`;

    private buildQuoteParagraphKey = (page: number, paragraph: number): string => `PAGES_${page}_QUOTE_PARAGRAPH_${paragraph}`;

    private buildLinksKey = (page: number, paragraph: number): string => `PAGES_${page}_LINK_${paragraph}`;

    private buildLinksUrlKey = (page: number, paragraph: number): string => `PAGES_${page}_LINK_URL_${paragraph}`;

    private buildExtraTextKey = (page: number, paragraph: number): string => `PAGES_${page}_EXTRA_${paragraph}`;

    private buildFooterTextKey = (page: number, paragraph: number): string => `PAGES_${page}_FOOTER_${paragraph}`;

    private buildQuestionTextKey = (questionId: number): string => `QUEST_${questionId}_TEXT`;

    private buildPageTitleKey = (pageNumber: number): string => `PAGES_${pageNumber}_TITLE`;

    private buildQuestionErrorMessageKey = (questionId: number): string => `QUEST_${questionId}_ERROR`;

    private buildQuestionFormatMessageKey = (id: number): string => `QUESTIONS_${id}_FORMAT_MESSAGE`;

    private keyOrNull = (key: string): string => this.exists(key) ? key : null;

    private exists = (key: string): boolean => this.$translate.instant(key) !== key;
}

angular.module("cv.services")
    .factory("translationService", ["$rootScope", "$translate", "$log",
        ($rootScope: angular.IRootScopeService, $translate: angular.translate.ITranslateService, $log: ng.ILogService) => new TranslationService($rootScope, $translate, $log)]);