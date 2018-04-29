///<reference path="../../Scripts/typings/angularjs/angular.d.ts"/>

class Survey {
    questions: Array<Question>;
    cssClass: string;
    configured: boolean;
    private currentIndex: number;
    currentSurvey: string;

    constructor(private name: string, private siteId: number, public lastPage: Page = null, public pages: Array<Page> = [],
        {questions = [], cssClass = "", eventPages = []} = {}) {

        this.questions = questions;
        this.cssClass = cssClass;

        this.configured = false;
        this.currentIndex = 0;
    }

    clearProgress = (): void => {
        this.pages.forEach((page: Page) => {
            page.visited = false;
            page.questions.forEach((questionGroup: Array<Question>) => {
                questionGroup.forEach((question: Question) => {
                    question.clear();
                });
            });
        });
    }

    getNext = (): number => _.findIndex(this.pages, (page: Page, index: number) =>  index > this.currentIndex && page.isVisitable());

    next = (): Page => {
        this.currentIndex = this.getNext();
        const currentPage = this.getCurrentPage();

        this.getCurrentPage().goToFirstVisitableBlock();

        return currentPage;
    }

    getPrevious = (): number => _.findLastIndex(this.pages, (page: Page, index: number) => index < this.currentIndex && page.isVisitable());

    previous = (): Page => {
        this.currentIndex = this.getPrevious();

        return this.getCurrentPage();
    }

    getCurrentIndex = (): number => this.currentIndex;

    getCurrentPage = (): Page => this.pages[this.currentIndex];

    getFirstPage = (): Page => _.first(this.pages);

    getFirstVisiblePage = (): Page => _.first(_.filter(this.pages, (page) => { return page.visible }))

    go = (target: Page): void => {
        this.currentIndex = _.findIndex(this.pages, (page: Page) => page.name === target.name);
    };

    hasNext = (): boolean => !_.isUndefined(this.getNext());

    hasPrevious = (): boolean => !_.isUndefined(this.getPrevious());

    getLastTravelablePage = (): Page => _.findLast(this.pages, (page: Page) => page.visited);

    getBlockPage = (): Page => _.find(this.pages, (page: Page) => !page.canRetreat && !page.canAdvance);

    getPage = (name: string): Page => _.findWhere(this.pages, { name: name });

    getPageByUrl = (url: string): Page => _.findWhere(this.pages, { url: url });

    getPageIndex = (name: string): string => _.findKey(this.pages, (page: Page) => page.name === name);

    hasFinished = (): boolean => this.currentIndex + 1 === this.pages.length;

    hidePage = (name: string): void => {
        this.setPageVisibility(name, false);
    }

    private setPageVisibility = (name: string, visibility: boolean) => {
        this.pages[this.getPageIndex(name)].visible = visibility;
    }

    showPage = (name: string): void => {
        this.setPageVisibility(name, true);
    }
}

angular
    .module("cv.model")
    .factory("Survey", [() => Survey]);