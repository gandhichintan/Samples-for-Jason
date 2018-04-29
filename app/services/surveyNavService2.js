//"use strict";

///* Services */
//angular.module("cv.services2", [])
//    .factory("$surveyNavService2", ["$cookies", "$rootScope", "$location", "$surveyAns", "$surveyHttp", "$surveyPages", "$surveyUhOh", "$surveyUtils", "$surveyAnalytics","toaster",
//        function ($cookies, $rootScope, $location, $surveyAns, $surveyHttp, $surveyPages, $surveyUhOh, $surveyUtils, $surveyAnalytics, toaster) {

//            //  page navigation
//            //
//            //  When a question has an uhoh value... then jump to the uhoh page.
//            //  If they press prev... go back to that originating page.
//            //  if another uhoh value is found... ignore it and show the factors page at before the contact page.
//            //  also.. if we are in an uhoh state... don't show the comments page.  We have a comments box on the factors page.
//            //

//            var factory = {};

//            factory.nextBtnPressed = false;

//            //  block ui
//            //
//            factory.blockUI = function (options) {
//                var defOptions = {
//                    message: "<div></div>",
//                    overlayCSS: {
//                        opacity: 0.03
//                    }
//                };

//                options = $.extend(true, {}, defOptions, options);

//                $.blockUI.defaults.css = {};
//                $.blockUI(options);
//            };

//            factory.unblockUI = function () {
//                $.unblockUI();
//            };

//            factory.isSessionExpired = function () {

//                var currentSession = Customerville.PageInfo.SessionID;
//                var answers = $surveyAns.loadAnswers();

//                if (angular.isUndefined(answers.currentSession)) {
//                    answers.currentSession = currentSession;
//                    $surveyAns.saveAnswers(answers);
//                }

//                if (currentSession != answers.currentSession) {
//                    return true;
//                }

//                return false;
//            };

//            factory.showErrorMessage = function (msg) {

//                var errMsg = (msg != null && msg != undefined && msg != "") ? msg.toString() : "Error";
//                toaster.pop({
//                    type: "info",
//                    title: "",
//                    body: errMsg,
//                    showCloseButton: false
//                });
//            };

//            factory.clearErrorMessage = function () {
//                toastr.clear();
//            };

//            //  page initialization
//            //
//            factory.pageInit = function () {
//                var page = $location.path();

//                $rootScope.$broadcast("PageChanged", page);

//                factory.unblockUI();

//                if (factory.isSessionExpired()) {
//                    factory.resetSurvey();
//                    factory.redirectToFirstPage();
//                    return false;
//                }

//                var surveyPage = $surveyAnalytics.savePageTracker(page);

//                $surveyHttp.logPageVisit(page, surveyPage.pages[page])
//                .success(function (result, status, headers, config) {
//                    if (result.SessionTimeout) {
//                        var url = $surveyUtils.toFullUrl("/");

//                        if (!factory.isFirstPage() && !factory.isThankyouPage()) {
//                            window.location = url;
//                        }
//                    }
//                });

//                if (factory.isThankyouPage()) {
//                    factory.setPageCompleted();
//                }
//                else {
//                    //  if we have visited the thankyou page
//                    //      reset survey (clear page visits and previous answers etc.)
//                    if (factory.haveCompletedThankyouPage()) {
//                        factory.resetSurvey();
//                    }

//                    //  make sure we have visited the previous page
//                    if (!factory.isFirstPage()) {
//                        var prevPage = factory.getPrevPage();
//                        if (!factory.haveCompletedPage(prevPage)) {
//                            factory.gotoFirstPage();
//                            return false;
//                        }
//                    }
//                }

//                return true;
//            };

//            factory.redirectToFirstPage = function () {
//                var baseUrl = "/";
//                if ($("body").hasClass("onbehalf")) {
//                    baseUrl = "/onbehalf";
//                }

//                var url = $surveyUtils.toFullUrl(baseUrl);
//                if (!factory.isThankyouPage()) {
//                    window.location = url;
//                }
//            };

//            factory.resetSurvey = function () {
//                factory.clearUhOhPrevPage();
//                factory.clearPagesCompleted();
//                $surveyAns.clearAnswers();
//            };

//            //  page navigation
//            //
//            factory.gotoPage = function (page) {
//                $location.path(page);
//            };

//            factory.gotoFirstPage = function () {
//                var url = $surveyUtils.toFullUrl("/");
//                window.location = url;
//            };

//            factory.gotoLastPage = function () {
//                $location.path(factory.getLastPage());
//            };

//            factory.gotoThankyouPage = function () {
//                $location.path(factory.getThankyouPage());
//            };

//            factory.gotoPrevPage = function () {
//                factory.nextBtnPressed = false;

//                if (!factory.isFirstPage()) {
//                    $location.path(factory.getPrevPage());
//                }
//            };

//            factory.gotoNextPage = function () {
//                factory.nextBtnPressed = true;

//                factory.setPageCompleted();

//                var nextPage = factory.getNextPage();

//                if (!factory.isUhOhPage()
//                  && !factory.isFactorsPage()
//                  && !factory.isCommentsPage()
//                  && !factory.isLastPage()
//                  && !factory.isThankyouPage()) {

//                    factory.setUhOhPrevPage($location.path());
//                }

//                $location.path(nextPage);
//            };

//            factory.getPrevPage = function () {
//                var page = factory.getStdPrevPage();

//                if ($surveyUhOh.isUhOhSurvey()) {

//                    if (factory.isUhOhPage() || factory.isFactorsPage()) {
//                        page = factory.getUhOhPrevPage();
//                    }
//                    else if (factory.isLastPage()) {
//                        page = factory.getFactorsPage();
//                    }
//                }

//                return page;
//            };

//            factory.getNextPage = function () {
//                var page = factory.getStdNextPage();

//                if ($surveyUhOh.isUhOhSurvey()) {

//                    if (factory.isUhOhPage()) {
//                        page = factory.getFactorsPage();
//                    }
//                    else if (factory.isFactorsPage()) {
//                        page = factory.getLastPage();
//                    }
//                    else if (!factory.isLastPage()) {
//                        if (factory.isCommentsPage(page)) {
//                            //  skip past comments page to factors page
//                            //      We have a comments box on the factors page.
//                            page = factory.getFactorsPage();
//                        }
//                        else if (!factory.haveCompletedUhOhPage()) {
//                            page = factory.getUhOhPage();
//                        }
//                    }
//                }

//                return page;
//            };

//            factory.getStdPrevPage = function () {
//                if (factory.isThankyouPage()) {
//                    return factory.getLastPage();
//                }

//                var pageNum = factory.getPageNumber();
//                if (pageNum > 1) {
//                    return "/survey" + (pageNum - 1);
//                }

//                return $location.path();
//            };

//            factory.getStdNextPage = function () {
//                if (factory.isLastPage()) {
//                    return factory.getThankyouPage();
//                }

//                var pageNum = factory.getPageNumber();
//                return "/survey" + (pageNum + 1);
//            };

//            factory.getPageNumber = function (path) {
//                var pageName = factory.getPageName(path);

//                if (pageName.indexOf("survey") == 0) {
//                    var number = pageName.substring("survey".length);
//                    return parseInt(number);
//                }

//                return -1;
//            };

//            factory.getPageName = function (path) {
//                if ($surveyUtils.isNullOrWhiteSpace(path)) {
//                    path = $location.path();
//                }

//                //  strip leading '/'
//                var pageName = path;
//                var firstChar = pageName.charAt(0);
//                if (firstChar === "/") {
//                    pageName = pageName.substring(1);
//                }

//                return pageName.toLowerCase();
//            };

//            //  Page identification
//            factory.isFirstPage = function (path) {
//                if ($surveyUtils.isNullOrWhiteSpace(path)) {
//                    path = $location.path();
//                }
//                return path === factory.getFirstPage();
//            };

//            factory.isLastPage = function (path) {
//                if ($surveyUtils.isNullOrWhiteSpace(path)) {
//                    path = $location.path();
//                }
//                return path === factory.getLastPage();
//            };

//            factory.isThankyouPage = function (path) {
//                if ($surveyUtils.isNullOrWhiteSpace(path)) {
//                    path = $location.path();
//                }
//                return path === factory.getThankyouPage();
//            };

//            factory.isCommentsPage = function (path) {
//                if ($surveyUtils.isNullOrWhiteSpace(path)) {
//                    path = $location.path();
//                }
//                return path === factory.getCommentsPage();
//            };

//            factory.isUhOhPage = function (path) {
//                if ($surveyUtils.isNullOrWhiteSpace(path)) {
//                    path = $location.path();
//                }
//                return path === factory.getUhOhPage();
//            };

//            factory.isFactorsPage = function (path) {
//                if ($surveyUtils.isNullOrWhiteSpace(path)) {
//                    path = $location.path();
//                }
//                return path === factory.getFactorsPage();
//            };

//            factory.getFirstPage = function () {
//                return $surveyPages.landingPage;
//            };

//            factory.getLastPage = function () {
//                var numPages = $surveyPages.pageCount;
//                return "/survey" + numPages;
//            };

//            factory.getThankyouPage = function () {
//                return $surveyPages.thankyouPage;
//            };

//            factory.getCommentsPage = function () {
//                return $surveyPages.commentsPage;
//            };

//            factory.getUhOhPage = function () {
//                return $surveyPages.uhOhPage;
//            };

//            factory.getFactorsPage = function () {
//                return $surveyPages.factorsPage;
//            };

//            //  page completion
//            //
//            factory.haveCompletedPage = function (path) {
//                var pagesCompleted = factory.loadPagesCompleted();

//                var page = factory.getPageName(path);
//                if (!$surveyUtils.isNullOrWhiteSpace(pagesCompleted[page])) {
//                    return true;
//                }

//                return false;
//            };

//            factory.haveCompletedThankyouPage = function () {
//                return factory.haveCompletedPage(factory.getThankyouPage());
//            };

//            factory.haveCompletedUhOhPage = function () {
//                return factory.haveCompletedPage(factory.getUhOhPage());
//            };

//            factory.setPageCompleted = function (path) {
//                var pagesCompleted = factory.loadPagesCompleted();

//                var pageName = factory.getPageName(path);
//                pagesCompleted[pageName] = pageName;

//                factory.savePagesCompleted(pagesCompleted);
//            };

//            factory.loadPagesCompleted = function () {
//                var pagesCompleted = {};

//                var json = $cookies.pagesCompleted;
//                if (!$surveyUtils.isNullOrWhiteSpace(json)) {
//                    pagesCompleted = angular.fromJson(json);
//                }

//                return pagesCompleted;
//            };

//            factory.savePagesCompleted = function (pagesCompleted) {
//                $cookies.pagesCompleted = angular.toJson(pagesCompleted);
//            };

//            factory.clearPagesCompleted = function () {
//                delete $cookies.pagesCompleted;
//            };

//            //  UhOh previous page
//            factory.getUhOhPrevPage = function () {
//                return $cookies.uhohPrevPage;
//            };

//            factory.setUhOhPrevPage = function (page) {
//                $cookies.uhohPrevPage = page;
//            };

//            factory.clearUhOhPrevPage = function () {
//                delete $cookies.uhohPrevPage;
//            };

//            factory.runCycler = function () {
//                var data = "page";
//                $rootScope.$broadcast("RunCycler", data);
//            };
//            return factory;

//        }]);
