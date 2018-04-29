"use strict";

interface ISliderDirectiveScope extends ng.IScope {
    element: ng.IAugmentedJQuery;
    data: Question;
}

interface INoUiSliderElement extends JQuery {
    noUiSlider: Function;
}

class SliderController {
    static id = "sliderController";
    static $inject = ["$scope", "$timeout", "$rootScope", "$log"];
    static idPrefix = "slider_";
    static spriteHeight = { web: 34, mobile: 34 };
    static min = 1;
    static max = 10;
    static step = 1;
    static slider = {};
    static selected = false;
    static savedValue = false;
    static defaultInitialLeft = false;

    slider: any;
    tooltipVisibility: { visibility: string };
    savedValue: (boolean | number);
    selected: (boolean | number);
    na: any;
    center: number;
    showLabels: boolean;
    naEnabled: boolean;
    pips: number[];
    model: (boolean | number);

    constructor(private $scope: ISliderDirectiveScope, private $timeout: ng.ITimeoutService, private $rootScope: ICVRootScope, private $log: ng.ILogService) {
        this.naEnabled = _.isUndefined($scope.data.properties.na) ? true : $scope.data.properties.na;
        this.showLabels = _.isUndefined($scope.data.properties.showLabels) ? false : $scope.data.properties.showLabels;

        this.slider = { id: this.generateUniqueId() };
        this.$log.debug("New slider initialated. ID:", this.slider.id);

        $timeout(this.run);

        //this.$scope.$watch("model", this.setCurrentValue);
    }

    generatePips() {
        this.pips = [];
        for (let i = this.slider.range.min; i <= this.slider.range.max; i++) {
            this.pips.push(i);
        }
    }

    getDistanceBetweenPips = (): number => 100 / (this.pips.length - 1);

    getPipStyle = (key: number): any => ({ left: (this.getDistanceBetweenPips() * key) + "%" });

    initRange(): void {
        this.slider.range = {
            min: angular.isDefined(this.$scope.data.properties.limits.min) && this.$scope.data.properties.limits.min !== false ? this.$scope.data.properties.limits.min : SliderController.min,
            max: this.$scope.data.properties.limits.max || SliderController.max
        };
    }

    setCurrentValue = (): void => {
        if (!_.isEmpty(this.$scope.data.answers)) {
            if (this.model === -1) {
                this.na = "true";
                this.setCorrectScenario();
            } else {
                $(this.slider.node.toString()).val(this.model.toString());
                this.draw();
            }
        }

        if (this.model) {
            $(this.slider.node.toString()).val(this.model.toString());
        }
    }

    private run = (): void => {
        this.hideTooltip();
        this.drawSliderTag();
        this.initRange();
        this.setCenter();
        this.drawSlider();
        this.setHandle();
        this.setHandleToDefault();
        this.setHandleOnCenter();

        if (this.showLabels) {
            this.generatePips();
        }

        this.setEventHandlers();
        this.setCurrentValue();
    }

    toggleNa = this.setCorrectScenario;

    setEventHandlers(): void {
        $(this.slider.node).on("slide", () => {
            this.draw();
            if (this.isMobile()) {
                this.showTooltip();
                this.drawTooltip();
            }
        });
        $(this.slider.node).on("change", () => {
            this.hideTooltip();
            this.$timeout(this.draw, 300);
        });
        window.onresize = () => {
            $(".slider").each(this.redraw);
            this.$scope.$evalAsync();
        }
    }

    redraw = (slider): void => {
        const handle = this.getHandle();
        const spriteNumber = parseInt($(slider).val());
        if (this.isMobile()) {
            $(slider).siblings(".tooltip").css("background-position", `0 -${SliderController.spriteHeight["mobile"] * spriteNumber}px`);
        } else {
            $(handle).css("background-position", `0 -${SliderController.spriteHeight["web"] * (spriteNumber + 1)}px`);
            if ($(slider).siblings(".na-checkbox").is(":checked") || angular.isUndefined(this.model)) {
                this.setHandleToDefault(handle);
            }
        }
    }

    setCorrectScenario(): void {
        if (this.na === "true") {
            this.setNaScenario();
            this.model = -1;
        } else {
            this.setRegularScenario();
            if (this.model !== undefined) {
                this.model = this.model;
            } else {
                this.$scope.data.answers = [];
            }
        }
    }

    setNaScenario(): void {
        if (this.selected) {
            this.savedValue = this.selected;
            this.model = this.selected = false;
        }
        this.setSliderToDefault();
    }

    setRegularScenario(): void {
        if (this.savedValue) {
            this.model = this.selected = this.savedValue;
            $(this.slider.node.toString()).val(this.savedValue.toString());
        }
        this.savedValue = false;
        this.draw();
    }

    setSliderToDefault(): void {
        this.setHandleToDefault();
        this.setHandleOnCenter();
    }

    setHandleOnCenter(): void {
        $(this.slider.handle).parent().css("left", "48%");
    }

    draw = (): void => {
        this.na = false;
        if (this.isMobile()) {
            this.onChangeMobile();
        } else {
            this.onChangeWeb();
        }
    }

    isMobile = (): boolean => $(window).width() <= 990;

    onChangeWeb(): void {
        this.setClassIfNeedTo();
        this.ensureIsNotForcedToVisualCenter();
        this.setValue();
        this.setImage(this.slider.handle, "web");
    }

    onChangeMobile(): void {
        this.setClassIfNeedTo();
        this.ensureIsNotForcedToVisualCenter();
        this.setValue();
        this.setImage($(`#${this.slider.id}`).siblings(".tooltip"), "mobile");
        this.setImage(this.slider.handle, "mobile");
    }

    ensureIsNotForcedToVisualCenter(): void {
        if (Math.ceil(this.getCenter()) === parseFloat($(this.slider.node).val())) {
            var target = parseFloat($(this.slider.node).val());
            $(this.slider.node).val(target + 1);
            $(this.slider.node).val(target);
        }
    }

    drawTooltip(sliderTarget = `#${this.slider.id}`) {
        var $tooltip = $(sliderTarget).siblings(".tooltip");
        var $pusher = $(sliderTarget).find("div.noUi-origin");
        var handlePos = $pusher.css("left");
        $tooltip.css("left", handlePos);
    }

    setClassIfNeedTo(targetHandle = this.slider.handle): void {
        $(targetHandle).removeClass("default-dot").addClass("actived-dot");
        this.$scope.$evalAsync();
    }

    setValue(): void {
        this.$scope.data.answers[0] = this.model = this.selected = $(this.slider.node).val();
        //this.$scope.$evalAsync();
        //this.model = this.model;
    }

    setImage(element, version): void {
        var spriteNumber = ($(element).hasClass("tooltip")) ? parseInt(this.selected.toString()) : parseInt(this.selected.toString()) + 1;

        $(element).css("background-position", `0 -${SliderController.spriteHeight[version] * spriteNumber}px`);
    }

    generateUniqueId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    drawSliderTag(): void {
        this.createSliderTag().insertAfter(this.getTooltip());
        this.slider.node = document.getElementById(this.slider.id);
    }

    getTooltip = (): JQuery => $(this.$scope.element).children(".tooltip");

    createSliderTag = (): JQuery => $(`<div class='slider' id='${this.slider.id}'></div>`);

    drawSlider(): void {
        ($(this.slider.node) as INoUiSliderElement).noUiSlider({
            start: [this.slider.center],
            step: this.$scope.data.properties.step || SliderController.step,
            range: this.slider.range,
            orientation: "horizontal"
        });
    }

    getBetweenSides = (): number => this.slider.range.max - this.slider.range.min;

    setCenter(): void {
        this.center = this.getCenter();
    }

    getCenter(): number {
        let center = this.getBetweenSides() / 2;
        if (this.getBetweenSides() % 2 !== 0) {
            center += 1;
        }
        return center;
    }

    setHandleToDefault(handle = this.slider.handle): void {
        const $handleTarget = $(handle);
        if (!$handleTarget.hasClass("actived-dot")) {
            $handleTarget
                .removeClass("actived-dot")
                .addClass("default-dot")
                .css("background-position", "0 0");
        }
    }

    setHandle(): void {
        this.slider.handle = this.slider.node.children[0].children[0].children[0];
    }

    getHandle(): Element {
        return $(this.slider).find(".noUi-handle")[0];
    }

    hideTooltip(): void {
        this.tooltipVisibility = { visibility: "hidden" };
    }

    showTooltip(): void {
        this.tooltipVisibility = { visibility: "visible" };
    }
}

angular.module("cv.directives")
    .controller(SliderController.id, SliderController);