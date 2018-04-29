"use strict";

interface ISingleCheckboxDirectiveScope extends ng.IScope {
    model: Question;
}

class SingleCheckbox {
    static id = "singleCheckboxController";
    static $inject = ["$scope", "$timeout", "$rootScope", "$log"];

    id: any;
    answer: any;
    model: any;

    constructor(private $scope: ITextQuestionDirectiveScope, $timeout, $rootScope, $log) {
        this.$scope = $scope;
        this.model = this.$scope.model;
        this.id = this.model.id;
        this.run();
    }

    toggle(event) {
        this.answer = !this.answer;
        this.$scope.model.answers[0] = this.answer;
        event.stopPropagation();
        event.preventDefault();
    }

    private run = (): void => {
        this.answer = this.$scope.model.answers[0] || false;
    }
}

angular.module("cv.directives")
    .controller('singleCheckboxController', SingleCheckbox);