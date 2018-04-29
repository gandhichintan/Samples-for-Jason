"use strict";

    class cvTimepickerController {

    static $inject = ["$rootScope", "$translate", "$scope"];

    datepicker;
    timeModel;
    data;
    $rootScope;
    $scope;
    hours;
    isOpen;
    today;
    dateNotPicked;
    timePickerOptions;

    constructor($rootScope, $translate, $scope, $log) {

        this.data = $scope.data;
        this.dateNotPicked = true;
        this.$scope = $scope;
        this.hours = [];
        this.isOpen = false;
        this.timeModel = $scope.timeModel;
        this.$rootScope = $rootScope;
        this.today = false;
        this.timePickerOptions = {
            step: 30,
            useSelect: true,
            asMoment: true
        }              
        this.init();

        this.$scope.$on('date', (event, args) => {
            this.isToday(args);
            this.generateHours();
        });

    }
    init() {
        this.timeModel = '';
        this.generateHours();
    }

    checkEquals(option) {
        var date = moment(option, 'MM-DD-YYYY'),
            selectedTime = false;
        if (moment(date).isSame(this.timeModel)) {
            selectedTime = true;
        }
        return selectedTime;
    }

    getTime() {
        if (this.data.answers[0]) {
            this.timeModel = this.data.answers[0];            
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    isToday(args) {
        var date = moment(args, 'MM-DD-YYYY');
        if (moment(date).isSame(moment(), 'day')) {
            this.today = true;
        }
        else {
            this.today = false
        }
        return this.today
    }

    generateHours() {
        var hour = moment().startOf('day');
        this.hours = [];
        this.hours.push(hour.format('hh:mm A'));
        if (this.today) {
            while (hour.diff(moment()) < hour.hours()) {
                hour.add(this.timePickerOptions.step, 'minutes');
                this.hours.push(hour.format('hh:mm A'));
            }
        }
        else {
            while (this.hours.length < 48) {
                hour.add(this.timePickerOptions.step, 'minutes');
                this.hours.push(hour.format('hh:mm A'));
            }
        }
    }
        
    setTime(hour) {
        this.timeModel = hour;
        this.data.answers[0] = hour;
        this.toggle();
    }
}

angular.module("cv.directives").controller("cvTimepickerController", cvTimepickerController);