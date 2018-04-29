class SetEnvironment implements IAction {    
    constructor(
        private environment: string,
        private environmentService: environmentService.IEnvironmentService,
        private rootScope: ICVRootScope) {
        
        this.environmentService.changeStyle('', '');
    }

    run = (): void => {
        this.environmentService.changeStyle(this.environment, this.environment);
        this.rootScope.survey.currentSurvey = this.environment;
    }
}