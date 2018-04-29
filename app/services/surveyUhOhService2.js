//angular.module("cv.services2")
//.factory("$surveyUhOh2", ["$surveyAns", "$surveyUtils", function ($surveyAns, $surveyUtils) {

//    var factory = {};

//    factory.PageInfo = Customerville.PageInfo;

//    factory.isUhOhSurvey = function () {
//        var answers = $surveyAns.loadAnswers();

//        var foundUhOhAnswer = false;
//        angular.forEach(answers, function (value, key) {
//            var questID = factory.getQuestID(key);
//            if (factory.isUhOhValue(questID, value)) {
//                foundUhOhAnswer = true;
//            }
//        });

//        return foundUhOhAnswer;
//    };

//    factory.isUhOhValue = function (questID, value) {
//        if ($surveyUtils.isNullOrWhiteSpace(value)) {
//            return false;
//        }

//        var foundUhOhAnswer = false;
//        angular.forEach(factory.PageInfo.UhOhQuestions, function (quest, key) {
//            if (questID == quest.QuestID) {
//                for (var i = 0; i < quest.UhOhValues.length; i++) {
//                    var uhOhValue = quest.UhOhValues[i];
//                    if (uhOhValue == value) {
//                        foundUhOhAnswer = true;
//                    }
//                }
//            }
//        });

//        return foundUhOhAnswer;
//    };

//    factory.getQuestID = function (value) {
//        if ($surveyUtils.isNullOrWhiteSpace(value)) {
//            return -1;
//        }

//        var prefix = "QUEST";
//        if (value.length <= prefix.length) {
//            return -1;
//        }

//        var questID = value.substr(prefix.length);
//        return parseInt(questID);
//    };

//    return factory;

//} ])