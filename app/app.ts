"use strict";

class App {
    static identifier = "CustomervilleSurvey";
    static modules = [
        "ngCookies",
        "toaster",
        "rzModule",
        "cv.surveyNav",
        "cv.directives",
        "cv.services",
        "cv.controllers",
        "cv.model",
        "cv.filters",
        "cv.surveyAns",
        "cv.surveyHttp",
        "cv.surveyUtils",
        "cv.surveyAnalytics",
        "myApp.animations",
        "myApp.filters",
        "myApp.services",
        "myApp.factories",
        "LocalStorageModule",
        "ui.router",
        "ui.bootstrap",
        "pascalprecht.translate",
        "cv.theme",
        "ui.timepicker"
    ];
}

(() => {
    const userAgent = window.navigator.userAgent;
    const msieIndicator = userAgent.indexOf("MSIE ");
    const isInternetExplorer = userAgent.indexOf("MSIE ") > 0;
    const updateYourBrowserAdvise = "/company_res/TellTacoTimeNW.Survey/survey/update/update.html";

    if (isInternetExplorer)
    {
        const ieVersion = parseInt(window.navigator.userAgent.substring(msieIndicator + 5, userAgent.indexOf(".", msieIndicator)));
        if (ieVersion <= 8) {
            window.location.href = updateYourBrowserAdvise;
            return;
        }
    }

    angular.module(App.identifier, App.modules);
})();