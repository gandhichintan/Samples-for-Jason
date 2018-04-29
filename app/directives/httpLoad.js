"use strict";

angular.module("cv.directives")
    .directive("httpLoader", [
        "$surveyUtils", function() {
            return {
                restrict: "EA",
                link: function(scope, element) {

                    var shownType = "block";

                    function hideLoader() {
                        $(".cover").show().css({
                            "opacity": "1",
                            "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                            "visibility": "visible"
                        });

                        element.fadeOut("slow", function() {
                            $("body").removeClass("animate");
                        });
                    }

                    scope.$on("httpLoaderStart", function() {
                        element.css("display", shownType);
                    });

                    scope.$on("httpLoaderEnd", hideLoader);
                }
            };
        }
    ]);