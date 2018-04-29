"use strict";

angular.module("cv.directives")
    .directive("placeholder", [
        "$timeout", function($timeout) {
            if (!$.browser.msie || $.browser.version >= 10) {
                return {};
            }
            return {
                link: function(scope, elm, attrs) {
                    if (attrs.type === "password") {
                        return;
                    }

                    $timeout(function() {
                        var value = elm.val();
                        if (isNullOrWhiteSpace(value)) {
                            value = elm.attr("placeholder");
                            elm.addClass("placeholder");
                        }
                        elm.val(value)
                            .focus(function() {
                                if ($(this).val() == $(this).attr("placeholder")) {
                                    $(this)
                                        .val("")
                                        .removeClass("placeholder");
                                }
                            })
                            .blur(function() {
                                if ($(this).val() == "") {
                                    $(this)
                                        .val($(this).attr("placeholder"))
                                        .addClass("placeholder");
                                }
                            });
                    });
                }
            };
        }
    ]);
