
namespace environmentService {

    export interface IEnvironmentService {
        changeStyle(environment: string, survey: string): void;
        watch(callback: any): void;
        unwatch(callback: any): void;
        setEnvironment(environment: string): void;
        getEnvironment(): string;
        windowScreen: string;
        imageDirectory: string;
        setWindowScreen(width: any): void;
    }

    class EnvironmentService implements IEnvironmentService {

        private activeEnvironment = '';
        private activeSurvey = ''
        private activeImage = '';
        private fullBg = false;
        public windowScreen = undefined;
        public imageDirectory = 'company_res/TellTacoTimeNW.Survey/survey/images/';
        private watchers = [];

        public static $inject = ['$rootScope'];

        public changeStyle(environment, survey) {
            this.activeEnvironment = environment;
            this.activeSurvey = survey;
            this.changed();
        }

        public watch(callback) {
            this.watchers.push(callback);
        }

        public unwatch(callback) {
            var index = this.watchers.indexOf(callback);
            if (index !== -1){
                this.watchers.splice(index, 1);
            }
        }

        public setEnvironment(environment) {
            this.changed();
            this.activeEnvironment = environment;
        }

        public getEnvironment() {
            return this.activeEnvironment
        }

        private setActiveSurvey(survey) {
            this.activeSurvey = survey;
            this.changed();
        }

        private setActiveImage(image) {
            this.activeImage = image;
        }

        public setWindowScreen(width) {
            this.windowScreen = width;
        }

        private changed() {
            angular.forEach(this.watchers, function (w) {
                w(this.activeEnvironment, this.activeSurvey);
            }.bind(this));
        }
    }

    angular.module('cv.theme').service('environmentService', EnvironmentService);

}
