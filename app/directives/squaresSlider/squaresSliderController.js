(function () {
    /**
     * Returns an array representing the slider with the given range
     */
    var getArray = function (range) {
        var min = range[0],
            max = range[1],
            array = [];

        for (var number = min; number <= max; number += 1) {
            array.push(number);
        }

        return array;
    };

    /**
     * Controller to be publish with the directive
     */
    var squaresSliderController = function ($scope, $element) {

        var range = $scope.data.properties.range,
            selected = $scope.data.answers.length>0 ? $scope.data.answers[0] : null,
            over = false;

        /* Event handlers */
        $scope.over = function (square) {
            over = square;
        };

        $scope.out = function () {
            over = false;
        };

        $scope.select = function (square) {
            $scope.data.answers[0] = selected = square;
        };

        /* Booleans */
        $scope.isSelected = function (square) {
            return selected === square;
        };

        $scope.isActive = function (square) {
            return selected ? square < selected : square < over;
        };

        /**
         * Main
         */
        (function () {
            $scope.squares = getArray(range);
        })();
    }

    angular.module("cv.directives")
    .controller("SquaresSliderController", ["$scope", "$element", squaresSliderController]);
})();
