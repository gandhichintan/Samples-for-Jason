//"use strict";

//angular.module("cv.controllers").controller("SurveyPageController",
//[
//    "$scope", "$surveyNav", "$surveyUtils",
//    function($scope, $surveyNav, $surveyUtils) {
//        try {
//            init();
//        } catch (ex) {
//            $surveyNav.showErrorMessage(ex);
//        }

//        function init() {
//            var d = new Date();
//            $scope.version = "v=" + d.getTime();

//            $scope.$on("PageChanged", function(evt, param) {
//                setPageClasses(param);
//                setBrowserClass();
//            });
//        }

//        function setBrowserClass() {
//            if ($surveyUtils.getInternetExplorerVersion() > 9) {
//                $scope.browserClass = "ie-grayscale";
//            }

//            if ($surveyUtils.getInternetExplorerVersion() < 9 && $surveyUtils.getInternetExplorerVersion() !== -1) {
//                $scope.ieLegacy = true;
//            } else {
//                $scope.ieLegacy = false;
//            }
//        }

//        function setPageClasses(param) {
//            $scope.pageClasses = "";

//            switch (param) {
//            case "/survey1":
//                $scope.pageClasses = "page-landing";
//                break;
//            case "/survey1/ip":
//                $scope.pageClasses = "page-landing";
//                break;
//            case "/survey2":
//                $scope.pageClasses = "page-department";
//                break;
//            case "/survey3":
//                $scope.pageClasses = "page-location";
//                break;
//            case "/survey4":
//                $scope.pageClasses = "page-location-search";
//                break;
//            case "/survey5":
//                $scope.pageClasses = "page-objectives";
//                break;
//            case "/survey6":
//                $scope.pageClasses = "page-feedback";
//                break;
//            case "/survey7":
//                $scope.pageClasses = "page-doctors";
//                break;
//            case "/survey8":
//                $scope.pageClasses = "page-nurses";
//                break;
//            case "/survey9":
//                $scope.pageClasses = "page-otherhcp";
//                break;
//            case "/survey10":
//                $scope.pageClasses = "page-professional-doctor";
//                break;
//            case "/survey11":
//                $scope.pageClasses = "page-professional-nurse";
//                break;
//            case "/survey12":
//                $scope.pageClasses = "page-professional-other";
//                break;
//            case "/survey13":
//                $scope.pageClasses = "page-recommend";
//                break;
//            case "/survey14":
//                $scope.pageClasses = "page-comments";
//                break;
//            case "/survey15":
//                $scope.pageClasses = "page-contact";
//                break;
//            case "/survey16":
//                $scope.pageClasses = "page-redflag-contact";
//                break;
//            case "/survey17":
//                $scope.pageClasses = "page-redflag-thankyou";
//                break;
//            case "/uhoh":
//                $scope.pageClasses = "page-uhoh";
//                break;
//            case "/factors":
//                $scope.pageClasses = "page-factors";
//                break;
//            case "/thankyou":
//                $scope.pageClasses = "page-thankyou";
//                break;
//            }
//        }
//    }
//]);