var PagesFactoryService = (function () {
    function PagesFactoryService($rootScope, translationService) {
        var _this = this;
        this.create = function (id, url, name, options) {
            if (options === void 0) { options = {}; }
            options.title = _this.sanitizeTitle(options.title, id);
            options.quote = options.quote || _this.translationService.getPageQuote(id);
            options.header = options.header || _this.translationService.getPageHeader(id).map(function (text) { return new InterpolableTranslation(text); });
            options.texts = options.texts || _this.translationService.getExtraTextsArray(id).map(function (text) { return new InterpolableTranslation(text); });
            options.links = options.links || _this.translationService.getLinksArray(id);
            options.urls = options.urls || _this.translationService.getLinksUrlArray(id);
            options.footer = options.footer || _this.translationService.getFooterTextsArray(id).map(function (text) { return new InterpolableTranslation(text); });
            return new Page(id, url, name, options);
        };
        this.sanitizeTitle = function (title, id) {
            if (_.isUndefined(title)) {
                return new InterpolableTranslation(_this.translationService.getPageTitle(id));
            }
            else if (title instanceof InterpolableTranslation) {
                return title;
            }
            else {
                return new InterpolableTranslation(title);
            }
        };
        this.rootScope = $rootScope;
        this.translationService = translationService;
    }
    return PagesFactoryService;
}());
var pagesFactoryServiceProvider = function ($rootScope, translationService) {
    return new PagesFactoryService($rootScope, translationService);
};
angular.module("cv.services")
    .factory("pagesFactoryService", ["$rootScope", "translationService", pagesFactoryServiceProvider]);
//# sourceMappingURL=pagesFactoryService.js.map