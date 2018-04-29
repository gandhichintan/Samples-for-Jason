"use strict";
var cvTimepickerController = (function () {
    function cvTimepickerController($rootScope, $translate, $scope, $log) {
        var _this = this;
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
        };
        this.init();
        this.$scope.$on('date', function (event, args) {
            _this.isToday(args);
            _this.generateHours();
        });
    }
    cvTimepickerController.prototype.init = function () {
        this.timeModel = '';
        this.generateHours();
    };
    cvTimepickerController.prototype.checkEquals = function (option) {
        var date = moment(option, 'MM-DD-YYYY'), selectedTime = false;
        if (moment(date).isSame(this.timeModel)) {
            selectedTime = true;
        }
        return selectedTime;
    };
    cvTimepickerController.prototype.getTime = function () {
        if (this.data.answers[0]) {
            this.timeModel = this.data.answers[0];
        }
    };
    cvTimepickerController.prototype.toggle = function () {
        this.isOpen = !this.isOpen;
    };
    cvTimepickerController.prototype.isToday = function (args) {
        var date = moment(args, 'MM-DD-YYYY');
        if (moment(date).isSame(moment(), 'day')) {
            this.today = true;
        }
        else {
            this.today = false;
        }
        return this.today;
    };
    cvTimepickerController.prototype.generateHours = function () {
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
    };
    cvTimepickerController.prototype.setTime = function (hour) {
        this.timeModel = hour;
        this.data.answers[0] = hour;
        this.toggle();
    };
    cvTimepickerController.$inject = ["$rootScope", "$translate", "$scope"];
    return cvTimepickerController;
}());
angular.module("cv.directives").controller("cvTimepickerController", cvTimepickerController);
//# sourceMappingURL=cv_timepickerController.js.map