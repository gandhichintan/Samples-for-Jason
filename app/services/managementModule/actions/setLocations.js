var SetLocations = (function () {
    function SetLocations(questions, targets) {
        var _this = this;
        this.run = function () {
            _this.locations = [];
            _this.airportsCode = _this.question.properties.airportsCode;
            _.each(_this.question.answers, function (ans) {
                var depAirportCode = _this.airportsCode[ans];
                var locationBuilded = _this.target.id + "_" + depAirportCode;
                _.unique;
                _this.locations.push(locationBuilded);
            });
            _this.target.locations = _this.locations;
        };
        this.question = questions[0];
        this.target = targets[0];
        this.locations = [];
    }
    return SetLocations;
}());
//# sourceMappingURL=setLocations.js.map