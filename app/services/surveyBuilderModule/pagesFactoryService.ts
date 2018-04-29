class PagesFactoryService {
    private rootScope: ICVRootScope;
    private translationService: TranslationService;

    constructor($rootScope: ICVRootScope, translationService: TranslationService) {
        this.rootScope = $rootScope;
        this.translationService = translationService;
    }

    create = (id: number, url: string, name: string, options: IPageOptions = {}): Page => {
        options.title = this.sanitizeTitle(options.title, id);
        options.quote = options.quote || this.translationService.getPageQuote(id);
        options.header = options.header || this.translationService.getPageHeader(id).map(text => new InterpolableTranslation(text));
        options.texts = options.texts || this.translationService.getExtraTextsArray(id).map(text => new InterpolableTranslation(text));
        options.links = options.links || this.translationService.getLinksArray(id);
        options.urls = options.urls || this.translationService.getLinksUrlArray(id);
        options.footer = options.footer || this.translationService.getFooterTextsArray(id).map(text => new InterpolableTranslation(text));

        return new Page(id, url, name, options);
    }

    private sanitizeTitle = (title: (IInterpolableTranslation | string), id: number): IInterpolableTranslation => {
        if (_.isUndefined(title)) {
            return new InterpolableTranslation(this.translationService.getPageTitle(id));
        } else if (title instanceof InterpolableTranslation) {
            return title;
        } else {
            return new InterpolableTranslation(title as string);
        }
    }
}

const pagesFactoryServiceProvider =
    ($rootScope: ICVRootScope, translationService: TranslationService) => {
        return new PagesFactoryService($rootScope, translationService);
    };

angular.module("cv.services")
    .factory("pagesFactoryService", ["$rootScope", "translationService", pagesFactoryServiceProvider]);