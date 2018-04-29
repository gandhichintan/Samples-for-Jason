class ManipulatorService {
    rootScope: ICVRootScope;
    survey: Survey;

    constructor($rootScope: ICVRootScope) {
        this.rootScope = $rootScope;
        this.survey = $rootScope.survey;
    }

    show(targets: Array<Question>) {
        _.forEach(targets, (question: Question) => {
            question.visible = true;
        });
    }

    hide(targets: Array<Question>) {
        _.forEach(targets, (question: Question) => {
            question.visible = false;
            question.answers = [];
        });
    }
}

const manipulatorServiceFactoryProvider = ($rootScope: ICVRootScope) => new ManipulatorService($rootScope);

angular.module("cv.services").factory("manipulatorService", ["$rootScope", manipulatorServiceFactoryProvider]);