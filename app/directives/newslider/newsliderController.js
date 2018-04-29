"use strict";
var NewSliderController = (function () {
    function NewSliderController($scope, $timeout, $rootScope, $log, environmentService) {
        var _this = this;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;
        this.$log = $log;
        this.environmentService = environmentService;
        this.initSlider = function () {
            //this.$scope.dragging = false;
            if (_this.isNa()) {
                //this.$scope.model = -1;
                _this.$scope.modelinterior = 0;
            }
            else {
                _this.$scope.modelinterior = _this.$scope.model;
            }
        };
        this.isNa = function () {
            return typeof _this.$scope.model === "undefined";
        };
        this.isDragging = function () {
            return _this.$scope.dragging;
        };
        this.isMobile = function () {
            return $("body").hasClass("small-screen");
        };
        this.swapModel = function () {
            _this.$scope.model = _this.$scope.modelinterior;
        };
        this.getTickColor = function (value) {
            var dotColors = ['#9d4d3f', '#a84e40', '#bc4f42', '#d05044', '#e35344', '#e35344', '#ff6144', '#ffe428', '#f8ed74', '#8cdd42', '#5bd427'];
            return dotColors[value];
        };
        this.getPointerColor = function (value) {
            var dotColors = ['#9d4d3f', '#a84e40', '#bc4f42', '#d05044', '#e35344', '#e35344', '#ff6144', '#ffe428', '#ffe428', '#8cdd42', '#5bd427'];
            return typeof value === undefined ? "#bababa" : dotColors[value];
        };
        this.ticksTooltip = function (value) {
            return "*" + value;
        };
        this.ticksValueTooltip = function (value) {
            return "#" + value;
        };
        this.data = $scope.data;
        $log.debug(this.data);
        this.initSlider();
        $log.debug(environmentService);
        $scope.environment = environmentService;
        $scope.slider = {
            options: {
                floor: 0,
                ceil: 10,
                showTicks: false,
                showTicksValues: 1,
                getTickColor: this.getTickColor,
                getPointerColor: this.getPointerColor,
                ticksTooltip: this.ticksTooltip,
                ticksValueTooltip: this.ticksValueTooltip,
                autoHideLimitLabels: false,
                stepsArray: [
                    { value: 0, legend: '0' },
                    { value: 1, legend: '1' },
                    { value: 2, legend: '2' },
                    { value: 3, legend: '3' },
                    { value: 4, legend: '4' },
                    { value: 5, legend: '5' },
                    { value: 6, legend: '6' },
                    { value: 7, legend: '7' },
                    { value: 8, legend: '8' },
                    { value: 9, legend: '9' },
                    { value: 10, legend: '10' },
                ],
                onStart: function () {
                    _this.$scope.dragging = true;
                    _this.swapModel();
                },
                onEnd: function () {
                    _this.$scope.dragging = false;
                },
                onChange: function (a, val) {
                    _this.swapModel();
                }
            }
        };
    }
    NewSliderController.id = "newsliderController";
    NewSliderController.$inject = ["$scope", "$timeout", "$rootScope", "$log", "environmentService"];
    return NewSliderController;
}());
angular.module("cv.directives")
    .controller(NewSliderController.id, NewSliderController);
//# sourceMappingURL=newsliderController.js.map