"use strict";

angular.module("cv.directives")
    .controller("modalQuestionModalController", [
    "$scope", "$log", "question", "$modalInstance", function ($scope, $log, question, $modalInstance) {
        $scope.question = question;
        $scope.multiOptionQuestionData = new MultiOptionQuestionData(getOptions(), false, true);

        function getOptions() {
            var options = [];
            angular.forEach(question.multiChoiceAnswers, function (answer) {
                options.push({ key: answer.Value, text: answer.SurveyText });
            });
            return options;
        };

        $scope.dismiss = function () {
            $modalInstance.dismiss("cancel");
        };
    }]);