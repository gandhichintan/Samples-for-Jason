"use strict";
var App = (function () {
    function App() {
    }
    App.identifier = "CustomervilleSurvey";
    App.modules = [
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
    return App;
}());
(function () {
    var userAgent = window.navigator.userAgent;
    var msieIndicator = userAgent.indexOf("MSIE ");
    var isInternetExplorer = userAgent.indexOf("MSIE ") > 0;
    var updateYourBrowserAdvise = "/company_res/TellTacoTimeNW.Survey/survey/update/update.html";
    if (isInternetExplorer) {
        var ieVersion = parseInt(window.navigator.userAgent.substring(msieIndicator + 5, userAgent.indexOf(".", msieIndicator)));
        if (ieVersion <= 8) {
            window.location.href = updateYourBrowserAdvise;
            return;
        }
    }
    angular.module(App.identifier, App.modules);
})();
//# sourceMappingURL=app.js.map