"use strict";

class DatepickerController {

    static $inject = ["$rootScope", "$translate", "$scope", "$element", "$timeout", "$interval", "$log"];

    datepicker;
    defaults;
    model;
    dateModel;
    timeModel;
    data;
    $element;
    $timeout;
    $interval;
    $log;
    $translate;
    $rootScope;
    $scope;
    timePickerOptions;

    constructor($rootScope, $translate, $scope, $element, $timeout, $interval, $log) {

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
        }
        this.datepicker = false;
        this.defaults = this.getDefaults(this.getBaseLang());    
             
        this.init();      
    }

    getDefaults(lang) {
        let datePickerLangOptions = {

            interface: "component",
            options: {
                format: "mm/dd/yyyy",
                todayBtn: "linked",
                language: "",
                autoclose: true,
                endDate: new Date()
            }
        }

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
    }

    modelChange() {
        this.data.answers[0] = this.model;
        this.$rootScope.$broadcast('date', this.model);
    }

    getBaseLang() {
        return this.$translate.use();
    }

    getDates = function () {
        return this.datepicker.datepicker("getUTCDates");
    }

    open = function () {
        this.$timeout(() => {
            this.ensureDatepickerIsInit();
            this.datepicker.datepicker("show");
        });
    }

    init() {
        this.initConfiguration();
        this.initDatepicker();
        this.bindModel();
        this.reloadValue();

    };

    initConfiguration() {
        this.data.interface = this.data.interface || this.defaults.interface;
        this.data.options = _.merge(this.defaults.options, this.data.options);
    }

    initDatepicker() {
        this.datepicker = this.$element.find(".datepicker");

        this.datepicker.datepicker(this.data.options);
    }

    bindModel() {
        this.datepicker.datepicker()
            .on("changeDate", () => {
                this.$scope.dateModel = this.datepicker.val();
            });

        this.$rootScope.$on('pls.onLanguageChanged', (oldValue, newValue) => {
            
            this.datepicker.datepicker("remove");
            this.data = this.getDefaults(newValue.lang.id);
            this.initDatepicker();
        });
    }

    reloadValue() {
        this.datepicker.datepicker("setDate", this.data.answers[0]);
        this.datepicker.val(this.$scope.dateModel);
    }

    clearValue() {
        this.datepicker.val("");
    }

    ensureDatepickerIsInit() {
        var datepickerEnabled = this.datepicker.data("datepicker");

        if (!datepickerEnabled) {
            this.init();
        }
    }


}

angular.module("cv.directives").controller("datepickerController", DatepickerController);