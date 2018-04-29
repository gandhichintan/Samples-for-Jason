/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/angular-local-storage/angular-local-storage.d.ts" />

"use strict";

class StorageService {

    localStorage: angular.local.storage.ILocalStorageService;

    constructor(localStorageService: angular.local.storage.ILocalStorageService) {
        this.localStorage = localStorageService;
    }

    has = (key: string): boolean => typeof this.get(key) !== "undefined";

    set(key: string, value: any): StorageService {
        this.localStorage.set(key, angular.toJson(value));
        return this;
    }

    get = (key: string): any => angular.fromJson(this.localStorage.get<string>(key));

    remove = (key: string): boolean => this.localStorage.remove(key);

    memoize(key: string, fn: Function): Function {
        return (...args: any[]) => {
            const composedKey = `${key}_${args.join("_")}`;
            const alreadyExecuted = this.has(composedKey);
            const result = alreadyExecuted ? this.get(composedKey) : fn.apply(null, args);

            if (!alreadyExecuted) {
                this.set(composedKey, result);
            }

            return result;
        }
    }
}

angular.module("cv.services")
    .factory("storageService", ["localStorageService",
        (localStorageService: angular.local.storage.ILocalStorageService) => new StorageService(localStorageService)]);