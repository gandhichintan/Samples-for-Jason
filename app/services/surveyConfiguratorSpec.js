///<reference path="~/lib/jasmine-2.3.4/jasmine.js"/>
///<reference path="~/lib/angular/angular.js"/>
///<reference path="~/lib/angular/angular-mocks.js"/>

///<reference path="~/app/app.js"/>
///<reference path="~/app/cv.services.js"/>
///<reference path="~/js/survey-http.js"/>
///<reference path="~/app/services/surveyConfigurator.js"/>

describe("$surveyConfigurator service", function() {

    var factory,
        dependencies = {};

    beforeEach(function() {
        module("cv.services");
        
        inject(function ($injector) {
            dependencies["$surveyHttp"] = $injector.get("$surveyHttp");
        });

        module(function($provide) {
            $provide.factory("$surveyHttp", dependencies["$surveyHttp"]);
        });

        inject(function($injector) {
            factory = $injector.get("$surveyConfigurator");
        });
    });

    describe("its methods", function () {
        it("must 'format' the given objects array to an another with the indicated props as the value and text props", function () {
            var given = [
                { Name: 1, Id: 2, product: 2 },
                { Name: 2, Id: 2, product: 4 },
                { Name: 3, Id: 2, product: 6 }];
            var expected = [
                { text: 1, value: 2 },
                { text: 2, value: 2 },
                { text: 3, value: 2 }];

            expect(factory.formatLocationsAsEnhancedSelectOptions(given)).toEqual(expected);
        });
    });
});