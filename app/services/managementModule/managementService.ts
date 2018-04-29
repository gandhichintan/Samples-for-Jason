"use strict";

class ManagementService {
    private static $inject = ["$rootScope"];

    rootScope: angular.IRootScopeService;
    survey: Survey;
    manipulator: ManipulatorService;

    constructor($rootScope: angular.IRootScopeService) {
        this.rootScope = $rootScope;
    }

    registerSurvey = (survey: Survey): ManagementService => {
        this.survey = survey;

        return this;
    }

    registerRelation(condition: IEvaluable, actions: IReactionCollection): ManagementService {
        const master = new Relation(condition, actions);
        const registerWatcherForEachQuestionAt = (member: IEvaluable) => {
            if (member instanceof Rule) {
                this.registerWatcher(member.question, master);
            } else if (condition instanceof Operator) {
                _.forEach((member as Operator).members, (submember: IEvaluable) => {
                    registerWatcherForEachQuestionAt(submember);
                });
            }
        }

        registerWatcherForEachQuestionAt(condition);

        return this;
    }

    private registerWatcher(trigger: Question, relation: Relation) {
        this.rootScope.$watchCollection(() => trigger.answers, () => {
            this.rootScope.$evalAsync(() => relation.apply());
        });
    }
}

const managementServiceFactoryProvider =
    ($rootScope: angular.IRootScopeService) => new ManagementService($rootScope);

angular.module("cv.services").factory("managementService", ["$rootScope", managementServiceFactoryProvider]);