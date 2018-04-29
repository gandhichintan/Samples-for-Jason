/////<reference path="../../../Scripts/typings/lodash/lodash-3.10.d.ts"/>
/////<reference path="../../../Scripts/lodash.js"/>
/////<reference path="../../model/question.ts"/>
/////<reference path="../../model/page.ts"/>
/////<reference path="../../model/survey.ts"/>
/////<reference path="manipulator.ts"/>
//
//debugger;
//describe("Manipulator entity", () => {
//    it("gets a survey and pulls questions out of it. Returns the questions and the mutated survey", () => {
//        let targetQuestion = new Question(2, "", null),
//            survey = new Survey("", 0, [
//                new Page("", "", { questions: [] }),
//                new Page("", "", {
//                    questions: [
//                        new Question(1, null, null),
//                        targetQuestion,
//                        new Question(3, null, null)
//                    ]
//                }),
//                new Page("", "", { questions: [] })
//            ]);
//
//        let r = Manipulator.pullOutQuestions(survey, 2);
//        expect(r).not.toBeNull();
//        expect(r.survey).not.toBe(survey);
//        expect(r.questions).toBe([targetQuestion]);
//    });
//
//    it("gets a survey and pulls pages out of it. Returns the pages and the mutated survey", () => {
//
//    });
//
//    it("gets a survey and push questions into it. Returns the mutated survey", () => {
//
//    });
//
//    it("gets a survey and push pages into it. Returns the mutated survey", () => {
//
//    });
//}) 
//# sourceMappingURL=manipulatorSpec.js.map