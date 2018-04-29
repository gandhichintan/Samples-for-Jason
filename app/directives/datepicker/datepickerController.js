"use strict";
var DatepickerController = (function () {
    function DatepickerController($rootScope, $translate, $scope, $element, $timeout, $interval, $log) {
        this.getDates = function () {
            return this.datepicker.datepicker("getUTCDates");
        };
        this.open = function () {
            var _this = this;
            this.$timeout(function () {
                _this.ensureDatepickerIsInit();
                _this.datepicker.datepicker("show");
            });
        };
        this.data = $scope.data;
        this.$scope = $scope;
        this.model = $scope.model;
        this.dateModel = $scope.dateModel;
        this.timeModel = $scope.timeModel;
        this.$element = $element;
        this.$timeout = $timeout;
        this.$interval = $interval;
        this.$log = $log;
        this.$translate = $translate;
        this.$rootScope = $rootScope;
        this.timePickerOptions = {
            step: 30,
            minTime: '10:30am',
            maxTime: '10:00pm',
            useSelect: true
        };
        this.datepicker = false;
        this.defaults = this.getDefaults(this.getBaseLang());
        this.init();
    }
    DatepickerController.prototype.getDefaults = function (lang) {
        var datePickerLangOptions = {
            interface: "component",
            options: {
                format: "mm/dd/yyyy",
                todayBtn: "linked",
                language: "",
                autoclose: true,
                endDate: new Date()
            }
        };
        switch (lang) {
            case 'es-es':
                datePickerLangOptions.options.language = 'es';
                return datePickerLangOptions;
            case 'ca-es':
                datePickerLangOptions.options.language = 'ca';
                return datePickerLangOptions;
            case 'zh-cn':
                datePickerLangOptions.options.language = 'zh-CN';
                return datePickerLangOptions;
            default:
                datePickerLangOptions.options.language = 'en';
                return datePickerLangOptions;
        }
    };
    DatepickerController.prototype.modelChange = function () {
        this.data.answers[0] = this.model;
        this.$rootScope.$broadcast('date', this.model);
    };
    DatepickerController.prototype.getBaseLang = function () {
        return this.$translate.use();
    };
    DatepickerController.prototype.init = function () {
        this.initConfiguration();
        this.initDatepicker();
        this.bindModel();
        this.reloadValue();
    };
    ;
    DatepickerController.prototype.initConfiguration = function () {
        this.data.interface = this.data.interface || this.defaults.interface;
        this.data.options = _.merge(this.defaults.options, this.data.options);
    };
    DatepickerController.prototype.initDatepicker = function () {
        this.datepicker = this.$element.find(".datepicker");
        this.datepicker.datepicker(this.data.options);
    };
    DatepickerController.prototype.bindModel = function () {
        var _this = this;
        this.datepicker.datepicker()
            .on("changeDate", function () {
            _this.$scope.dateModel = _this.datepicker.val();
        });
        this.$rootScope.$on('pls.onLanguageChanged', function (oldValue, newValue) {
            _this.datepicker.datepicker("remove");
            _this.data = _this.getDefaults(newValue.lang.id);
            _this.initDatepicker();
        });
    };
    DatepickerController.prototype.reloadValue = function () {
        this.datepicker.datepicker("setDate", this.data.answers[0]);
        this.datepicker.val(this.$scope.dateModel);
    };
    DatepickerController.prototype.clearValue = function () {
        this.datepicker.val("");
    };
    DatepickerController.prototype.ensureDatepickerIsInit = function () {
        var datepickerEnabled = this.datepicker.data("datepicker");
        if (!datepickerEnabled) {
            this.init();
        }
    };
    DatepickerController.$inject = ["$rootScope", "$translate", "$scope", "$element", "$timeout", "$interval", "$log"];
    return DatepickerController;
}());
angular.module("cv.directives").controller("datepickerController", DatepickerController);
//# sourceMappingURL=datepickerController.js.map