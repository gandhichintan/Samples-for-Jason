(function () {
    'use script';
    angular.module('cv.theme')
        .directive('body', ['environmentService', body]);

    function body(environment) {
        return {
            restrict: 'EA',
            link: link,
            scope: true
        };

        function link(scope, element, attrs) {
            function environmentChanged(env, survey) {
                if (env) {
                    element.addClass(env);
                    element.addClass(survey);
                    if (env == 'apitp') {
                        element('#surveyWrapper').addClass('apitp');
                        element('#surveyWrapper').addClass('fullbg');
                    }
                }
            }

            environment.watch(environmentChanged);
            environmentChanged(environment.getEnvironment());
        }
    }
})();