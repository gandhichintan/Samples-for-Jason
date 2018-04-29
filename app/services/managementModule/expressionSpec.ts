/////<reference path="../../../Scripts/typings/jasmine/jasmine.d.ts"/>
/////<reference path="../../../Scripts/typings/lodash/lodash-3.10.d.ts"/>
/////<reference path="../../../Scripts/lodash.js"/>
/////<reference path="../../model/question.ts"/>
/////<reference path="rule.ts"/>
/////<reference path="expression.ts"/>
//
//describe("The expression entity", () => {
//    describe("its components", () => {
//        describe("the expected behaviour of a complex expression", () => {
//            let q1 = new Question(1, "", null, { answers: [] }),
//                a = new GtRule(q1, 7),
//                b = new GtRule(q1, 4),
//                e = new Expression(
//                    [a, b] // a OR b
//                );
//
//            it("should return FALSE if no rule worked", () => {
//                q1.answers = [2];
//                expect(e.evaluate()).toBe(false);
//            });
//
//            it("should return TRUE if at least on of the sides of an OR is TRUE ", () => {
//                q1.answers = [9];
//                expect(e.evaluate()).toBe(true);
//            });
//        });
//    });
//})