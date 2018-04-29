/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/angular-local-storage/angular-local-storage.d.ts" />
"use strict";
var StorageService = (function () {
    function StorageService(localStorageService) {
        var _this = this;
        this.has = function (key) { return typeof _this.get(key) !== "undefined"; };
        this.get = function (key) { return angular.fromJson(_this.localStorage.get(key)); };
        this.remove = function (key) { return _this.localStorage.remove(key); };
        this.localStorage = localStorageService;
    }
    StorageService.prototype.set = function (key, value) {
        this.localStorage.set(key, angular.toJson(value));
        return this;
    };
    StorageService.prototype.memoize = function (key, fn) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var composedKey = key + "_" + args.join("_");
            var alreadyExecuted = _this.has(composedKey);
            var result = alreadyExecuted ? _this.get(composedKey) : fn.apply(null, args);
            if (!alreadyExecuted) {
                _this.set(composedKey, result);
            }
            return result;
        };
    };
    return StorageService;
}());
angular.module("cv.services")
    .factory("storageService", ["localStorageService",
    function (localStorageService) { return new StorageService(localStorageService); }]);
//# sourceMappingURL=storageService.js.map