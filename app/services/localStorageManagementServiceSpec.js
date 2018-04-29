///<reference path="~/lib/jasmine-2.3.4/jasmine.js"/>
///<reference path="~/lib/angular/angular.js"/>
///<reference path="~/lib/angular/angular-mocks.js"/>

///<reference path="~/app/app.js"/>
///<reference path="~/app/cv.services.js"/>
///<reference path="~/lib/angular/angular-local-storage.js"/>
///<reference path="~/app/services/localStorageManagementService.js"/>

describe("localStorageManagementService service", function () {
    var service,
        dependencies = [],
        rootScope;

    beforeEach(function () {
        module("cv.services");

        module(function($provide) {
            $provide.service("localStorageService", function () {
                this.get = function(key) {
                    return JSON.parse(localStorage.getItem(key));
                }
                this.set = function(key, value) {
                    localStorage.setItem(key, JSON.stringify(value));
                }
            });
        });

        inject(function ($injector, $rootScope) {
            dependencies["localStorageService"] = $injector.get("localStorageService");
            rootScope = $rootScope;
            service = $injector.get("localStorageManagementService");
        });
    });

    // TESTS

    describe("its methods", function () {
        describe("getSurvey", function () {
            it("must return the stored survey", function () {
                var foobar = { foo: "bar" };

                dependencies["localStorageService"].set("survey", foobar);
                expect(service.getSurvey()).toEqual(foobar);
            });
        });

        describe("saveSurvey", function() {
            it("must save the given survey", function() {
                var foobar = { foo: "bar" };

                service.saveSurvey(foobar);
                expect(dependencies["localStorageService"].get("survey")).toEqual(foobar);
            });

            it("must save the survey currently stored in scope if was called with no params", function() {
                rootScope.foobar = { rootFoo: "rootBar" };

                service.saveSurvey();
                expect(dependencies["localStorageService"].get("survey")).toEqual(rootScope.foobar);
            });
        });
    });
});