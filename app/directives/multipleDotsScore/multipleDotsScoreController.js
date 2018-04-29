angular.module("cv.directives").controller("MultipleDotsScoreController", [
    "$scope",
    function ($scope) {

        $scope.options = [];
        var SPRITES_HEIGHT = 32.8;
        var checked = -1;

        init();

        function init() {
            $scope.options = $scope.data.properties.options;
            angular.forEach($scope.options, function (value, key) {
                value.spriteStyle = { "background-position": "0px 0px" };
                return value;
            });

            if ($scope.data.hasAnswer()) {
                angular.forEach($scope.options, function (value, key) {
                    if ($scope.data.getAnswer() == value.text) {
                        $scope.model = checked = key;
                        $scope.data.answers = [value.text];
                        toggleUntil(key);                       
                    }
                });
            }
        }

        $scope.select = function(key,dot) {
            $scope.model = checked = key;
            $scope.question.answers = [dot.text];
            toggleUntil(key);
        };

        $scope.hoverUntil = function(key) {
            toggleUntil(key);
        };

        $scope.untoggleNotChecked = function() {
            var since = (checked >= 0) ? checked : -1;
            toggleUntil(since);
        };

        function toggleUntil(key) {
            var position = (parseInt(key) + 1) * SPRITES_HEIGHT;
            for (var i = 0; i <= key; i++) {
                $scope.options[i].spriteStyle = { "background-position": "0px -" + position + "px" };
            }
            for (var i = key + 1; i < $scope.options.length; i++) {
                $scope.options[i].spriteStyle = { "background-position": "0px 0px" };
            }
        }

}]);