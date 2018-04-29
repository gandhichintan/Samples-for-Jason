/////<reference path="../../../Scripts/typings/jasmine/jasmine.d.ts"/>
/////<reference path="../../../Scripts/typings/lodash/lodash-3.10.d.ts"/>
/////<reference path="../../../Scripts/lodash.js"/>
/////<reference path="../../../Scripts/typings/angularjs/angular.d.ts"/>
/////<reference path="../../../lib/angular/angular.js"/>
/////<reference path="../../../Scripts/typings/angularjs/angular-mocks.d.ts"/>
/////<reference path="../../../lib/angular/angular-mocks.js"/>
/////<reference path="../../model/question.ts"/>
/////<reference path="../../model/page.ts"/>
/////<reference path="../../model/survey.ts"/>
/////<reference path="managementService.ts"/>
//
//describe("managementService service", () => {
//    let rootScope: angular.IRootScopeService,
//        service: ManagementService;
//
//    beforeEach(angular.mock.module("cv.services"));
//
//    beforeEach(angular.mock.inject(($rootScope:angular.IRootScopeService, managementService:ManagementService, $injector) => {
//        rootScope = $rootScope;
//        service = $injector.get("managementService");
//    }));
//
//    it("Should say test", () => {
//        expect(service.test()).toBe("test");
//    });
//});
//
////describe("Survey management logic", () => {
////    describe("Survey manipulation logic", () => {
////        it("removes questions from the given survey", () => {
////            let question = new Question(2, "a", {}),
////                page = new Page("b", "b", [
////                    new Question(1, "a", {}),
////                    question,
////                    new Question(3, "a", {})
////                ]),
////                survey = new Survey("whatever", 20, [new Page("a", "a"), page]);
//
////            let response = Manipulator.pullQuestion(survey, 2);
////            expect(response.question).toBe(question);
////            expect(response.survey).not.toBe(survey);
////        });
////    });
//
//    
////});
//
//// i create the representation of a relation between a condition and an array of questions or pages
//// i create the representation of a condition a a group of comparisons linked by its priorities
//// a comparison compares a question and a raw value using an operator
//// the manager collects relations and watches the variable values of the questions of the comparisons
//// when it changes the whole father condition is evaluated and depending of the result the targets are removed or added*/
//# sourceMappingURL=managementServiceSpec.js.map