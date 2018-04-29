'use strict';
    angular.module('cv.theme')
        .directive("body", ['environmentService', '$window', body]);

    function body(environmentService, $window) {
        return {
            restrict: 'EA',
            link: link,
            scope: true
        };

        function link(scope, element, attrs) {
            var currEnv,
                currSurvey,
                window = angular.element($window),
                $body = element;

            function environmentChanged(env, survey) {
                if (survey) {
                    if (currEnv) {
                        element.removeClass(currEnv);
                    }
                    if (currSurvey) {
                        element.removeClass(currSurvey);
                    }

                    element.addClass(survey);

                    currEnv = env;
                    currSurvey = survey;
                }
            }

            function resize() {
                var width = window.width();
                if (width >= 1200) {
                    return environmentService.setWindowScreen('md');
                }
                else{
                    environmentService.setWindowScreen('sm');
                }
            }

            window.bind('resize', resize);
            resize();
            environmentService.watch(environmentChanged);
            environmentChanged(environmentService.getEnvironment());
        }
    }