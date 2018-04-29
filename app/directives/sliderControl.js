//"use strict";

//angular.module("cv.directives")
//    .directive("slider", ["$surveyUtils", function ($surveyUtils) {
//    return {
//        restrict: "E",
//        require: "ngModel",
//        link: function (scope, element, attrs, ngModelCtrl) {

//            ngModelCtrl.$render = function () {

//                var sliderAttrs = getSliderAttrs(attrs);

//                var $sliderControl = $("<div>", { 'class': sliderAttrs.cssClass });
//                element.replaceWith($sliderControl);

//                var $slider = createSlider($sliderControl, attrs);
//                if ($surveyUtils.convertToBoolean(attrs.showna)) {
//                    //createSliderCheckbox($sliderControl);
//                    createSliderNaRadio($sliderControl);
//                }

//                var $thumbnail = $slider.find(".noUi-handle");
//                var $toolTip = $slider.find(".tooltip");
//                //var $sliderCheckbox = $sliderControl.find('.check-normal');
//                var $sliderCheckbox = $sliderControl.find(".radio-normal");

//                //  Initialize all of the sub controls
//                setToolTipImage(ngModelCtrl.$viewValue);
//                setThumbnailImage(ngModelCtrl.$viewValue);
//                setCheckBox(ngModelCtrl.$viewValue);

//                //  Watch for changes to the ngModelCtrl
//                scope.$watch(function () {
//                    return ngModelCtrl.$viewValue;
//                }, function (newVal, oldVal) {
//                    if (newVal != oldVal) {
//                        setToolTipImage(newVal);

//                        setThumbnailImage(newVal);
//                        setThumbnailPosition(newVal);

//                        setCheckBox(newVal);
//                    }
//                });

//                $slider.on("slide", function () {
//                    var value = $slider.val();

//                    setToolTipImage(value);
//                    setThumbnailImage(value);

//                    setCheckBox(value);
//                });

//                $slider.on("set", function () {
//                    var value = $slider.val();

//                    //  The watcher above will move the thumb etc to the correct location
//                    ngModelCtrl.$setViewValue(value);
//                    scope.$apply();
//                });

//                function getSliderAttrs(attrs) {
//                    var sliderAttrs = {
//                        'cssClass': attrs["class"],
//                        'showNa': false
//                    };

//                    if ($surveyUtils.isNullOrWhiteSpace(sliderAttrs.cssClass)) {
//                        sliderAttrs.cssClass = "slider-11pt";
//                    }

//                    switch (sliderAttrs.cssClass) {
//                        case "slider-4ptna":
//                            sliderAttrs.sliderMin = 1;
//                            sliderAttrs.sliderMax = 4;
//                            sliderAttrs.sliderStart = 4;
//                            sliderAttrs.showNa = true;
//                            break;
//                        case "slider-5pt":
//                            sliderAttrs.sliderMin = 1;
//                            sliderAttrs.sliderMax = 5;
//                            sliderAttrs.sliderStart = 3;
//                            break;

//                        case "slider-5ptna":
//                            sliderAttrs.sliderMin = 1;
//                            sliderAttrs.sliderMax = 5;
//                            sliderAttrs.sliderStart = 3;
//                            sliderAttrs.showNa = true;
//                            break;

//                        case "slider-10pt":
//                            sliderAttrs.sliderMin = 1;
//                            sliderAttrs.sliderMax = 10;
//                            sliderAttrs.sliderStart = 5;
//                            break;

//                        case "slider-11pt":
//                            sliderAttrs.sliderMin = 0;
//                            sliderAttrs.sliderMax = 10;
//                            sliderAttrs.sliderStart = 5;
//                            break;

//                        case "slider-11ptna":
//                            sliderAttrs.sliderMin = 0;
//                            sliderAttrs.sliderMax = 10;
//                            sliderAttrs.sliderStart = 5;
//                            sliderAttrs.showNa = true;
//                            break;
//                    }

//                    sliderAttrs.cssClass = "slider " + sliderAttrs.cssClass;

//                    return sliderAttrs;
//                }

//                function createSlider($sliderControl) {
//                    //  http://refreshless.com/nouislider

//                    // var start = getStartingValue(sliderStart);
//                    var start = getStartingValue(sliderAttrs.sliderStart);

//                    if ($("body").hasClass("mobile-browser")) {
//                        var customToolTip = $.Link({
//                            target: "-tooltip-<div class=\"tooltip\"></div>",
//                            method: function (value) {
//                                $(this).html("<span></span>");
//                            }
//                        });

//                        var $slider = $("<div>").appendTo($sliderControl);
//                        $slider.noUiSlider({
//                            'start': start,
//                            'connect': "lower",
//                            'orientation': "horizontal",
//                            'range': {
//                                'min': sliderAttrs.sliderMin,
//                                'max': sliderAttrs.sliderMax
//                            },
//                            'step': 1,
//                            'serialization': {
//                                'format': {
//                                    'decimals': 0
//                                },
//                                lower: [customToolTip]
//                            }
//                        });
//                    }
//                    else {
//                        var $slider = $("<div>").appendTo($sliderControl);
//                        $slider.noUiSlider({
//                            'start': start,
//                            'connect': "lower",
//                            'orientation': "horizontal",
//                            'range': {
//                                'min': sliderAttrs.sliderMin,
//                                'max': sliderAttrs.sliderMax
//                            },
//                            'step': 1,
//                            'serialization': {
//                                'format': {
//                                    'decimals': 0
//                                },
//                            }
//                        });
//                    }
//                    // create tickmarks
//                    var ticks = "";

//                    switch (sliderAttrs.cssClass) {
//                        case "slider slider-5pt":
//                            for (var i = sliderAttrs.sliderMin; i < sliderAttrs.sliderMax - 1; i++) {
//                                ticks += "<div class=\"sliderTickmarksWithBackground5\"></div>";
//                            }
//                            break;

//                        case "slider slider-5ptna":
//                            for (var i = sliderAttrs.sliderMin; i < sliderAttrs.sliderMax - 1; i++) {
//                                ticks += "<div class=\"sliderTickmarksWithBackground5\"></div>";
//                            }
//                            break;

//                        case "slider slider-10pt":
//                            break;

//                        case "slider slider-11pt":
//                            for (var i = sliderAttrs.sliderMin; i < sliderAttrs.sliderMax - 1; i++) {
//                                ticks += "<div class=\"sliderTickmarksWithBackground\"></div>";
//                            }
//                            break;

//                        case "slider slider-11ptna":
//                            sliderAttrs.sliderMin = 0;
//                            sliderAttrs.sliderMax = 10;
//                            sliderAttrs.sliderStart = 5;
//                            sliderAttrs.showNa = true;
//                            break;
//                    }
//                    //for (var i = sliderAttrs.sliderMin; i < sliderAttrs.sliderMax - 1; i++) {
//                    //    ticks += '<div class="sliderTickmarksWithBackground"></div>';
//                    //}


//                    $slider.prepend(ticks);

//                    return $slider;
//                }

//                function parseAttrInt(attr, defValue) {
//                    var value = defValue;
//                    if (angular.isDefined(attr) && angular.isString(attr)) {
//                        value = parseInt(attr);
//                    }

//                    return value;
//                }

//                function getStartingValue(value) {
//                    var viewValue = ngModelCtrl.$viewValue;
//                    if (!$surveyUtils.isNullOrWhiteSpace(viewValue) && (viewValue != "N/A")) {
//                        value = parseInt(viewValue);
//                    }

//                    return value;
//                }

//                function createSliderCheckbox($parent) {
//                    var $checkBoxContainer = $("<div class=\"checkBoxSliderParent\"><div class=\"check-normal\"></div><span>N/A</span></div>").appendTo($parent);

//                    var $sliderCheckbox = $checkBoxContainer.find(".check-normal");

//                    $sliderCheckbox.bind("mouseover", function (event) {
//                        $sliderCheckbox.removeClass("check-normal");
//                        $sliderCheckbox.addClass("check-hovered");
//                    });

//                    $sliderCheckbox.bind("mouseleave", function (event) {
//                        $sliderCheckbox.removeClass("check-hovered");
//                        $sliderCheckbox.addClass("check-normal");
//                    });

//                    // update model when button is clicked
//                    $sliderCheckbox.bind("click", function (e) {

//                        //  Toggle the value
//                        value = "N/A";
//                        //if ($sliderCheckbox.hasClass('check-clicked')) {
//                        if ($sliderCheckbox.hasClass("radio-clicked")) {
//                            var value = "";
//                        }

//                        ngModelCtrl.$setViewValue(value);
//                        scope.$apply();

//                        e.stopPropagation();
//                    });
//                }

//                function createSliderNaRadio($parent) {
//                    var $checkBoxContainer = $("<div class=\"checkBoxSliderParent\"><div class=\"radio-normal\"></div></div>").appendTo($parent);

//                    var $sliderCheckbox = $checkBoxContainer.find(".radio-normal");

//                    $sliderCheckbox.bind("mouseover", function (event) {
//                        $sliderCheckbox.removeClass("radio-normal");
//                        $sliderCheckbox.addClass("radio-hovered");
//                    });

//                    $sliderCheckbox.bind("mouseleave", function (event) {
//                        $sliderCheckbox.removeClass("radio-hovered");
//                        $sliderCheckbox.addClass("radio-normal");
//                    });

//                    // update model when button is clicked
//                    $sliderCheckbox.bind("click", function (e) {

//                        //  Toggle the value
//                        value = "N/A";
//                        if ($sliderCheckbox.hasClass("radio-clicked")) {
//                            var value = "";
//                        }

//                        ngModelCtrl.$setViewValue(value);
//                        scope.$apply();

//                        e.stopPropagation();
//                    });

//                }

//                function setToolTipImage(value) {
//                    $toolTip.removeAttr("class");
//                    $toolTip.addClass("tooltip");
//                    if ($surveyUtils.isNullOrWhiteSpace(value) || (value == "N/A")) {
//                        $toolTip.hide();
//                    }
//                    else {
//                        $toolTip.show();
//                        $toolTip.addClass("tooltip" + value);
//                    }
//                }

//                function setThumbnailImage(value) {
//                    //var pos = sliderStart;
//                    var pos = sliderAttrs.sliderStart;

//                    if ($surveyUtils.isNullOrWhiteSpace(value) || (value == "N/A")) {
//                        setHasValue(false);
//                    }
//                    else {
//                        setHasValue(true);

//                        pos = parseInt(value);
//                    }

//                    //  set the thumbnail image class
//                    //for (var i = sliderMin; i <= sliderMax; i++) {
//                    //    var className = "handle" + i;
//                    //    if (i == pos) {
//                    //        if (!$thumbnail.hasClass(className)) {
//                    //            $thumbnail.addClass(className);
//                    //        }
//                    //    }
//                    //    else {
//                    //        if ($thumbnail.hasClass(className)) {
//                    //            $thumbnail.removeClass(className);
//                    //        }
//                    //    }
//                    //}

//                    for (var i = sliderAttrs.sliderMin; i <= sliderAttrs.sliderMax; i++) {
//                        var className = "handle" + i;
//                        if (i == pos) {
//                            if (!$thumbnail.hasClass(className)) {
//                                $thumbnail.addClass(className);
//                            }
//                        }
//                        else {
//                            if ($thumbnail.hasClass(className)) {
//                                $thumbnail.removeClass(className);
//                            }
//                        }
//                    }
//                }

//                function setThumbnailPosition(value) {
//                    if ($surveyUtils.isNullOrWhiteSpace(value) || (value == "N/A")) {
//                        //$slider.val(sliderStart);
//                        $slider.val(sliderAttrs.sliderStart);
//                    }
//                    else {
//                        var pos = parseInt(value);
//                        $slider.val(pos);
//                    }
//                }

//                function setHasValue(hasValue) {
//                    if (hasValue) {
//                        $slider.removeClass("no-value");

//                        if (!$slider.hasClass("has-value")) {
//                            $slider.addClass("has-value");
//                        }
//                    }
//                    else {
//                        $slider.removeClass("has-value");

//                        if (!$slider.hasClass("no-value")) {
//                            $slider.addClass("no-value");
//                        }
//                    }
//                }

//                function setCheckBox(value) {
//                    if (value == "N/A") {
//                        //  show check
//                        //$sliderCheckbox.addClass('check-clicked');
//                        $sliderCheckbox.addClass("radio-clicked");
//                    }
//                    else {
//                        //  remove check
//                        //$sliderCheckbox.removeClass('check-clicked');
//                        $sliderCheckbox.removeClass("radio-clicked");
//                        $sliderCheckbox.addClass("radio-normal");
//                    }
//                }
//            };
//        }
//    };
//}]);
