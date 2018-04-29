"use strict";

class cvCheckboxController {

    static $inject = ["$rootScope", "$scope", "$log"];

    model;
    data;
    $log;
    $translate;
    $rootScope;
    $scope;
    timePickerOptions;
    answers;

    constructor($rootScope, $scope, $log) {

        this.data = $scope.data;
        this.$scope = $scope;
        this.model = $scope.model;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.init();
        this.answers = [];
    }

    setAnswer(option, event) {
        event.preventDefault();
        event.stopPropagation();
        if (!option.checked) {
            this.answers.push(option.value);
        }
        else {
            var index = this.answers.indexOf(option.value);
            this.answers.splice(index, 1);
        }
        this.data.answers[0] = this.answers;
    }

    init() {
    };

}

angular.module("cv.theme").controller("cvCheckboxController", cvCheckboxController);