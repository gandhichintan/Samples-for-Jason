"use strict";
var LocationController = (function () {
    function LocationController($log, $rootScope, $scope, $controller, $translate, environmentService, $surveyHttp, questinService) {
        var _this = this;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.$translate = $translate;
        this.environmentService = environmentService;
        this.$surveyHttp = $surveyHttp;
        this.questinService = questinService;
        this.validate = function () {
            var error = _.filter(_this.model.getCurrentBlock(), function (question) { return question.visible && !question.validate(); });
            if (_.isEmpty(error)) {
                _this.$scope.$emit("goToNextPageEndEvent", true);
            }
            else {
                _this.$scope.$emit("goToNextPageEndEvent", false, _this.$translate.instant(_.first(error).errorMessage));
            }
        };
        this.$scope = $scope;
        $controller("pageBaseController", { $scope: this.$scope });
        if (!this.$scope.pageInit()) {
            return;
        }
        this.$log.debug(this.environmentService.imageDirectory);
        this.$scope.environment = this.environmentService;
        this.$scope.model = this.model = $rootScope.survey.getCurrentPage();
        this.$scope.pageClass = "page-" + $rootScope.pageId;
        this.$scope.$on("validate_" + $rootScope.survey.getCurrentPage().controller, this.validate);
        this.getCities();
        this.$scope.$watch('questions[0][0].answers[0]', function (newValue, oldValue) {
            $log.debug("Watching...new ", newValue);
            $log.debug("Watching...old ", oldValue);
            if (newValue !== oldValue) {
                $log.debug("calling location...");
                _this.getLocations(newValue);
            }
        });
    }
    LocationController.prototype.getCities = function () {
        var _this = this;
        this.$log.debug("getting cities...");
        this.$surveyHttp.getCities().success(function (result) {
            _this.$log.debug("this.$scope.questions[0]: ", _this.$scope.questions[0]);
            _this.$scope.questions[0][0].properties.options = result.cities;
        })
            .error(function (data, status) {
            throw data + " " + status;
        });
    };
    LocationController.prototype.getLocations = function (state) {
        var _this = this;
        this.$surveyHttp.getLocations(state).success(function (result) {
            var oldValue = _this.$scope.questions[0][1].answers[0];
            _this.$log.debug("Watching...old ", oldValue);
            _this.$log.debug("Watching...this.$scope.questions[0][1]", _this.$scope.questions[0][1]);
            _this.$scope.questions[0][1].properties.options = result.locations;
            _this.$scope.questions[0][1].answers[0] = undefined;
            _this.$scope.questions[0][1].properties.selected = undefined;
            if (result.locations.length === 1) {
                _this.$scope.questions[0][1].answers[0] = result.locations[0].value;
                _this.$scope.questions[0][1].properties.selected = result.locations[0];
            }
        })
            .error(function (data, status) {
            throw data + " " + status;
        });
    };
    LocationController.$inject = ["$log", "$rootScope", "$scope", "$controller", "$translate", "environmentService", "$surveyHttp"];
    LocationController.id = "locationController";
    return LocationController;
}());
angular.module("cv.controllers").controller(LocationController.id, LocationController);
//# sourceMappingURL=locationController.js.map