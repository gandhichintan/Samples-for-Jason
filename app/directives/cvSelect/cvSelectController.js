"use strict";

angular.module("cv.directives")
    .controller("cvSelectController", ["$scope", "$rootScope", "$log",
        function ($scope, $rootScope, $log) {
            var data,
                closeOnMouseLeave;

            /**
             * Configuration parameters:
             * - closeOnMouseLeave (bool [default:true])
             * - contentTemplate (string) -> path to the "inner" template (will be injected through ng-include)
             * - prompt (string)
            **/

            (function () {
                data = angular.isDefined($scope.data) ? $scope.data : false;
                closeOnMouseLeave = data && angular.isDefined(data.closeOnMouseLeave) ? data.closeOnMouseLeave : false;
                $scope.contentTemplate = data && angular.isDefined(data.contentTemplate) ? data.contentTemplate : false;
                $scope.prompt = data && angular.isDefined(data.prompt) ? data.prompt : "";
                $scope.isOpen = false;
                $scope.enabled = true;
            })();
            
            $scope.$on("executeOnSelectScope", function (event, callback) {
                callback($scope); // inject parent $scope to make innerController to use the functions and properties of this one
            });

            $scope.$on("enableSelect", function (event, status) {
                $scope.enabled = (typeof status !== "undefined") ? status : true;
            });

            $scope.toggle = function () {
                if($scope.enabled){
                    $scope.isOpen = !$scope.isOpen;
                }
            }

            $scope.open = function () {
                if($scope.enabled){
                    $scope.isOpen = true;
                }
            }

            $scope.close = function (flag) {
                if (flag && !closeOnMouseLeave) {
                    return;
                }

                $scope.isOpen = false;
            }

            $scope.getContentTemplate = function() {
                return $scope.contentTemplate;
            }
        }
    ]);