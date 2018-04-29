"use strict";

angular.module("cv.directives")
    .directive("animatePage", ["$surveyUtils", function () {
    return {
        restrict: "A",
        link: function (scope, element) {

            var shownType = "block";

            function animatePage() {
                entranceAnimation();
                element.fadeOut("slow", function () {

                });
            }

            scope.$on("httpLoaderStart", function () {
                element.css("display", shownType);
                $(".cover").show().css({
                    "opacity": "0",
                    "-ms-filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)",
                    //"filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                    "visibility": "hidden"
                });
            });

            scope.$on("httpLoaderEnd", animatePage);

            function runAnimation(i, timeline, animations) {
                setTimeout((function () {
                    if (typeof animations[i].beforeAnimate === "function") {
                        animations[i].beforeAnimate();
                    }
                    if (animations[i].remove) {
                        if (animations[i].hide === true) {
                            $(animations[i].selector).removeClass(animations[i].remove).addClass(animations[i].step).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                $(this).hide();
                                if (typeof animations[i].afterAnimate === "function") {
                                    animations[i].afterAnimate();
                                }
                            });
                        } else {
                            $(animations[i].selector).removeClass(animations[i].remove).addClass(animations[i].step).show().one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                if (typeof animations[i].afterAnimate === "function") {
                                    animations[i].afterAnimate();
                                }
                            });
                        }
                    } else {
                        if (animations[i].hide === true) {
                            $(animations[i].selector).addClass(animations[i].step).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                $(this).hide();
                                if (typeof animations[i].afterAnimate === "function") {
                                    animations[i].afterAnimate();
                                }
                            });
                        } else {
                            $(animations[i].selector).addClass(animations[i].step).show().one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                if (typeof animations[i].afterAnimate === "function") {
                                    animations[i].afterAnimate();
                                }
                            });
                        }
                    }
                }), timeline);
            };

            function entranceAnimation() {

                var animations, i, timeline;
                animations = [];
                animations.push({
                    time: 0,
                    beforeAnimate: function () {
                        $("body").addClass("animate");
                        $(".cover").css({
                            "opacity": "0",
                            "-ms-filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=#000000, endColorstr=#000000)",
                            //"filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                            "visibility": "hidden"
                        });
                    },
                    step: "",
                    selector: $(".cover")
                }, {
                    time: 50,
                    step: "fadeInUp",
                    selector: $(".bg-grid-1")
                }, {
                    time: 100,
                    step: "fadeInUp",
                    selector: $(".bg-grid-2")
                }, {
                    time: 100,
                    step: "fadeInUp",
                    selector: $(".bg-grid-3")
                }, {
                    time: 100,
                    step: "fadeInUp",
                    selector: $(".bg-grid-4")
                },
                {
                    time: 300,
                    step: "fadeInUp",
                    selector: $(".site-bg"),
                    afterAnimate: function() {
                    }
                },
                {
                    time: 500,
                    step: "fadeIn",
                    selector: $(".cover"),
                    beforeAnimate: function () {
                        $(".cover").css("visibility", "visible");
                    },
                    afterAnimate: function () {
                        $("body").removeClass("animate");
                    }
                });
                timeline = 0;
                i = 0;
                while (i < animations.length) {
                    timeline = parseInt(animations[i].time, 10) + parseInt(timeline, 10);
                    runAnimation(i, timeline, animations);
                    i++;
                }
            };
        }
    };
}]);