"use strict";

angular.module("cv.directives")
    .controller("modalController", [
        "$scope", function ($scope) {

            var $modal = $(".modal");

            function setup(args) {
                $scope.headerContent = args.headerContent;
                $scope.bodyContent = args.bodyContent;
                $scope.footer = args.footer;
                $scope.dismissible = args.dismissible || false;

                $modal.modal({
                    backdrop: $scope.dismissible ? true : "static"
                });
            }

            // Message handlers
            $scope.$on("showModal", function (event, args) {
                setup(args);
                $modal.modal("show");
            });

            $scope.$on("hideModal", function () {
                $modal.modal("hide");
            });

            $scope.runCallback = function (callback) {
                callback($modal);
            };

            $scope.isDismissible = function() {
                return $scope.dismissible ? "true" : "static";
            }
        }
    ]);