/////<reference path="../../../Scripts/typings/jasmine/jasmine.d.ts"/>
/////<reference path="../../../Scripts/typings/lodash/lodash-3.10.d.ts"/>
/////<reference path="../../../Scripts/lodash.js"/>
/////<reference path="../../model/question.ts"/>
/////<reference path="rule.ts"/>
//
//describe("The different rules objects", () => {
//    describe("The EqRule object", () => {
//        it("should eval equality of a question value and a raw constant as true", () => {
//            let question = new Question(1, "x", {}),
//                rule = new EqRule(question, "foo");
//
//            question.answers = ["bar"];
//            expect(rule.getValue()).toBe(false);
//
//            question.answers = ["foo"];
//            expect(rule.getValue()).toBe(true);
//        });
//    });
//
//    describe("The LoweqRule object", () => {
//        let question = new Question(1, "x", {}),
//            rule = new LoweqRule(question, "fOO");
//
//        it("should eval an empty answer as false", () => {
//            question.answers = [];
//            expect(rule.getValue()).toBe(false);
//        });
//
//        it("should eval equality of a lowerized question value and a raw constant as true", () => {
//            question.answers = ["baR"];
//            expect(rule.getValue()).toBe(false);
//
//            question.answers = ["fOo"];
//            expect(rule.getValue()).toBe(true);
//        });
//    });
//
//    describe("The GtRule object", () => {
//        it("should return true if question value is great than a raw constant", () => {
//            let question = new Question(1, "x", {}),
//                rule = new GtRule(question, 5);
//
//            question.answers = [4];
//            expect(rule.getValue()).toBe(false);
//
//            question.answers = [6];
//            expect(rule.getValue()).toBe(true);
//        });
//    });
//
//    describe("The LtRule object", () => {
//        it("should return true if question value is less than a raw constant", () => {
//            let question = new Question(1, "x", {}),
//                rule = new LtRule(question, 5);
//
//            question.answers = [6];
//            expect(rule.getValue()).toBe(false);
//
//            question.answers = [4];
//            expect(rule.getValue()).toBe(true);
//        });
//    });
//
//    describe("The ContainsRule object", () => {
//        it("should return true if question value is one of the contained at a raw constant array", () => {
//            let question = new Question(1, "x", {}),
//                rule = new ContainsRule(question, ["foo", "bar"]);
//
//            question.answers = ["John Doe"];
//            expect(rule.getValue()).toBe(false);
//
//            question.answers = ["foo"];
//            expect(rule.getValue()).toBe(true);
//        });
//    });
//}); 
//# sourceMappingURL=RuleSpec.js.map