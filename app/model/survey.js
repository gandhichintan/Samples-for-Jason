///<reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
var Survey = (function () {
    function Survey(name, siteId, lastPage, pages, _a) {
        var _this = this;
        if (lastPage === void 0) { lastPage = null; }
        if (pages === void 0) { pages = []; }
        var _b = _a === void 0 ? {} : _a, _c = _b.questions, questions = _c === void 0 ? [] : _c, _d = _b.cssClass, cssClass = _d === void 0 ? "" : _d, _e = _b.eventPages, eventPages = _e === void 0 ? [] : _e;
        this.name = name;
        this.siteId = siteId;
        this.lastPage = lastPage;
        this.pages = pages;
        this.clearProgress = function () {
            _this.pages.forEach(function (page) {
                page.visited = false;
                page.questions.forEach(function (questionGroup) {
                    questionGroup.forEach(function (question) {
                        question.clear();
                    });
                });
            });
        };
        this.getNext = function () { return _.findIndex(_this.pages, function (page, index) { return index > _this.currentIndex && page.isVisitable(); }); };
        this.next = function () {
            _this.currentIndex = _this.getNext();
            var currentPage = _this.getCurrentPage();
            _this.getCurrentPage().goToFirstVisitableBlock();
            return currentPage;
        };
        this.getPrevious = function () { return _.findLastIndex(_this.pages, function (page, index) { return index < _this.currentIndex && page.isVisitable(); }); };
        this.previous = function () {
            _this.currentIndex = _this.getPrevious();
            return _this.getCurrentPage();
        };
        this.getCurrentIndex = function () { return _this.currentIndex; };
        this.getCurrentPage = function () { return _this.pages[_this.currentIndex]; };
        this.getFirstPage = function () { return _.first(_this.pages); };
        this.getFirstVisiblePage = function () { return _.first(_.filter(_this.pages, function (page) { return page.visible; })); };
        this.go = function (target) {
            _this.currentIndex = _.findIndex(_this.pages, function (page) { return page.name === target.name; });
        };
        this.hasNext = function () { return !_.isUndefined(_this.getNext()); };
        this.hasPrevious = function () { return !_.isUndefined(_this.getPrevious()); };
        this.getLastTravelablePage = function () { return _.findLast(_this.pages, function (page) { return page.visited; }); };
        this.getBlockPage = function () { return _.find(_this.pages, function (page) { return !page.canRetreat && !page.canAdvance; }); };
        this.getPage = function (name) { return _.findWhere(_this.pages, { name: name }); };
        this.getPageByUrl = function (url) { return _.findWhere(_this.pages, { url: url }); };
        this.getPageIndex = function (name) { return _.findKey(_this.pages, function (page) { return page.name === name; }); };
        this.hasFinished = function () { return _this.currentIndex + 1 === _this.pages.length; };
        this.hidePage = function (name) {
            _this.setPageVisibility(name, false);
        };
        this.setPageVisibility = function (name, visibility) {
            _this.pages[_this.getPageIndex(name)].visible = visibility;
        };
        this.showPage = function (name) {
            _this.setPageVisibility(name, true);
        };
        this.questions = questions;
        this.cssClass = cssClass;
        this.configured = false;
        this.currentIndex = 0;
    }
    return Survey;
}());
angular
    .module("cv.model")
    .factory("Survey", [function () { return Survey; }]);
//# sourceMappingURL=survey.js.map