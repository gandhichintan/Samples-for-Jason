var SetGlobalLocation = (function () {
    function SetGlobalLocation($rootScope, locationCode) {
        var _this = this;
        this.run = function () {
            _this.rootScope.locationId = _this.locationId;
        };
        this.rootScope = $rootScope;
        this.locationId = parseInt(_.findKey($rootScope.Locations, function (tag) { return tag === "Location_" + locationCode; }));
    }
    return SetGlobalLocation;
})();
//# sourceMappingURL=setGlobalLocation.js.map