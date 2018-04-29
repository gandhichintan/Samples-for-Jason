"use strict";
var SliderController = (function () {
    function SliderController($scope, $timeout, $rootScope, $log) {
        var _this = this;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;
        this.$log = $log;
        this.getDistanceBetweenPips = function () { return 100 / (_this.pips.length - 1); };
        this.getPipStyle = function (key) { return ({ left: (_this.getDistanceBetweenPips() * key) + "%" }); };
        this.setCurrentValue = function () {
            if (!_.isEmpty(_this.$scope.data.answers)) {
                if (_this.model === -1) {
                    _this.na = "true";
                    _this.setCorrectScenario();
                }
                else {
                    $(_this.slider.node.toString()).val(_this.model.toString());
                    _this.draw();
                }
            }
            if (_this.model) {
                $(_this.slider.node.toString()).val(_this.model.toString());
            }
        };
        this.run = function () {
            _this.hideTooltip();
            _this.drawSliderTag();
            _this.initRange();
            _this.setCenter();
            _this.drawSlider();
            _this.setHandle();
            _this.setHandleToDefault();
            _this.setHandleOnCenter();
            if (_this.showLabels) {
                _this.generatePips();
            }
            _this.setEventHandlers();
            _this.setCurrentValue();
        };
        this.toggleNa = this.setCorrectScenario;
        this.redraw = function (slider) {
            var handle = _this.getHandle();
            var spriteNumber = parseInt($(slider).val());
            if (_this.isMobile()) {
                $(slider).siblings(".tooltip").css("background-position", "0 -" + SliderController.spriteHeight["mobile"] * spriteNumber + "px");
            }
            else {
                $(handle).css("background-position", "0 -" + SliderController.spriteHeight["web"] * (spriteNumber + 1) + "px");
                if ($(slider).siblings(".na-checkbox").is(":checked") || angular.isUndefined(_this.model)) {
                    _this.setHandleToDefault(handle);
                }
            }
        };
        this.draw = function () {
            _this.na = false;
            if (_this.isMobile()) {
                _this.onChangeMobile();
            }
            else {
                _this.onChangeWeb();
            }
        };
        this.isMobile = function () { return $(window).width() <= 990; };
        this.getTooltip = function () { return $(_this.$scope.element).children(".tooltip"); };
        this.createSliderTag = function () { return $("<div class='slider' id='" + _this.slider.id + "'></div>"); };
        this.getBetweenSides = function () { return _this.slider.range.max - _this.slider.range.min; };
        this.naEnabled = _.isUndefined($scope.data.properties.na) ? true : $scope.data.properties.na;
        this.showLabels = _.isUndefined($scope.data.properties.showLabels) ? false : $scope.data.properties.showLabels;
        this.slider = { id: this.generateUniqueId() };
        this.$log.debug("New slider initialated. ID:", this.slider.id);
        $timeout(this.run);
        //this.$scope.$watch("model", this.setCurrentValue);
    }
    SliderController.prototype.generatePips = function () {
        this.pips = [];
        for (var i = this.slider.range.min; i <= this.slider.range.max; i++) {
            this.pips.push(i);
        }
    };
    SliderController.prototype.initRange = function () {
        this.slider.range = {
            min: angular.isDefined(this.$scope.data.properties.limits.min) && this.$scope.data.properties.limits.min !== false ? this.$scope.data.properties.limits.min : SliderController.min,
            max: this.$scope.data.properties.limits.max || SliderController.max
        };
    };
    SliderController.prototype.setEventHandlers = function () {
        var _this = this;
        $(this.slider.node).on("slide", function () {
            _this.draw();
            if (_this.isMobile()) {
                _this.showTooltip();
                _this.drawTooltip();
            }
        });
        $(this.slider.node).on("change", function () {
            _this.hideTooltip();
            _this.$timeout(_this.draw, 300);
        });
        window.onresize = function () {
            $(".slider").each(_this.redraw);
            _this.$scope.$evalAsync();
        };
    };
    SliderController.prototype.setCorrectScenario = function () {
        if (this.na === "true") {
            this.setNaScenario();
            this.model = -1;
        }
        else {
            this.setRegularScenario();
            if (this.model !== undefined) {
                this.model = this.model;
            }
            else {
                this.$scope.data.answers = [];
            }
        }
    };
    SliderController.prototype.setNaScenario = function () {
        if (this.selected) {
            this.savedValue = this.selected;
            this.model = this.selected = false;
        }
        this.setSliderToDefault();
    };
    SliderController.prototype.setRegularScenario = function () {
        if (this.savedValue) {
            this.model = this.selected = this.savedValue;
            $(this.slider.node.toString()).val(this.savedValue.toString());
        }
        this.savedValue = false;
        this.draw();
    };
    SliderController.prototype.setSliderToDefault = function () {
        this.setHandleToDefault();
        this.setHandleOnCenter();
    };
    SliderController.prototype.setHandleOnCenter = function () {
        $(this.slider.handle).parent().css("left", "48%");
    };
    SliderController.prototype.onChangeWeb = function () {
        this.setClassIfNeedTo();
        this.ensureIsNotForcedToVisualCenter();
        this.setValue();
        this.setImage(this.slider.handle, "web");
    };
    SliderController.prototype.onChangeMobile = function () {
        this.setClassIfNeedTo();
        this.ensureIsNotForcedToVisualCenter();
        this.setValue();
        this.setImage($("#" + this.slider.id).siblings(".tooltip"), "mobile");
        this.setImage(this.slider.handle, "mobile");
    };
    SliderController.prototype.ensureIsNotForcedToVisualCenter = function () {
        if (Math.ceil(this.getCenter()) === parseFloat($(this.slider.node).val())) {
            var target = parseFloat($(this.slider.node).val());
            $(this.slider.node).val(target + 1);
            $(this.slider.node).val(target);
        }
    };
    SliderController.prototype.drawTooltip = function (sliderTarget) {
        if (sliderTarget === void 0) { sliderTarget = "#" + this.slider.id; }
        var $tooltip = $(sliderTarget).siblings(".tooltip");
        var $pusher = $(sliderTarget).find("div.noUi-origin");
        var handlePos = $pusher.css("left");
        $tooltip.css("left", handlePos);
    };
    SliderController.prototype.setClassIfNeedTo = function (targetHandle) {
        if (targetHandle === void 0) { targetHandle = this.slider.handle; }
        $(targetHandle).removeClass("default-dot").addClass("actived-dot");
        this.$scope.$evalAsync();
    };
    SliderController.prototype.setValue = function () {
        this.$scope.data.answers[0] = this.model = this.selected = $(this.slider.node).val();
        //this.$scope.$evalAsync();
        //this.model = this.model;
    };
    SliderController.prototype.setImage = function (element, version) {
        var spriteNumber = ($(element).hasClass("tooltip")) ? parseInt(this.selected.toString()) : parseInt(this.selected.toString()) + 1;
        $(element).css("background-position", "0 -" + SliderController.spriteHeight[version] * spriteNumber + "px");
    };
    SliderController.prototype.generateUniqueId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    SliderController.prototype.drawSliderTag = function () {
        this.createSliderTag().insertAfter(this.getTooltip());
        this.slider.node = document.getElementById(this.slider.id);
    };
    SliderController.prototype.drawSlider = function () {
        $(this.slider.node).noUiSlider({
            start: [this.slider.center],
            step: this.$scope.data.properties.step || SliderController.step,
            range: this.slider.range,
            orientation: "horizontal"
        });
    };
    SliderController.prototype.setCenter = function () {
        this.center = this.getCenter();
    };
    SliderController.prototype.getCenter = function () {
        var center = this.getBetweenSides() / 2;
        if (this.getBetweenSides() % 2 !== 0) {
            center += 1;
        }
        return center;
    };
    SliderController.prototype.setHandleToDefault = function (handle) {
        if (handle === void 0) { handle = this.slider.handle; }
        var $handleTarget = $(handle);
        if (!$handleTarget.hasClass("actived-dot")) {
            $handleTarget
                .removeClass("actived-dot")
                .addClass("default-dot")
                .css("background-position", "0 0");
        }
    };
    SliderController.prototype.setHandle = function () {
        this.slider.handle = this.slider.node.children[0].children[0].children[0];
    };
    SliderController.prototype.getHandle = function () {
        return $(this.slider).find(".noUi-handle")[0];
    };
    SliderController.prototype.hideTooltip = function () {
        this.tooltipVisibility = { visibility: "hidden" };
    };
    SliderController.prototype.showTooltip = function () {
        this.tooltipVisibility = { visibility: "visible" };
    };
    SliderController.id = "sliderController";
    SliderController.$inject = ["$scope", "$timeout", "$rootScope", "$log"];
    SliderController.idPrefix = "slider_";
    SliderController.spriteHeight = { web: 34, mobile: 34 };
    SliderController.min = 1;
    SliderController.max = 10;
    SliderController.step = 1;
    SliderController.slider = {};
    SliderController.selected = false;
    SliderController.savedValue = false;
    SliderController.defaultInitialLeft = false;
    return SliderController;
}());
angular.module("cv.directives")
    .controller(SliderController.id, SliderController);
//# sourceMappingURL=sliderController.js.map