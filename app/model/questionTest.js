///<reference path="~/lib/jasmine-2.3.4/jasmine.js"/>
///<reference path="~/lib/angular/angular.js"/>
///<reference path="~/lib/angular/angular-mocks.js"/>

///<reference path="~/app/app.js"/>
///<reference path="~/app/model/question.js"/>

describe("Question", function () {

    beforeEach(module("Question"));

    describe("Question object", function () {

        var question;

        beforeEach(inject(function ($injector) {
            question = $injector.get("Question");
        }));

        it("should return 3 dogs when querying", function () {
            expect(dog.query().length).toBe(3);
        });
//
//        it('should return 4 dogs when querying after adding a dog', function () {
//            dog.add({ name: 'Fido', type: 'German Shepherd' });
//            expect(dog.query().length).toBe(4);
//        });
    });
});