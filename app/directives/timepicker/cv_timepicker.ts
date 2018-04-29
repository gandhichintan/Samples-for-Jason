"use strict";

(() => {

    let directiveProvider = (directivesPath, $compile, $parse, $position, $document, $filter) => {

        let stringToMinutes = (step) => {
            var t = step.match(/(\d+)(h?)/);
            return t[1] * (t[2] ? 60 : 1);
        }

        let getClosestIndex = (value, from) => {
            if (!value) {
                return -1;
            }

            var closest = null;
            var index = -1;
            var _value = value.getHours() * 60 + value.getMinutes();

            for (var i = 0; i < from.length; i++) {
                var current = from[i];
                var _current = current.getHours() * 60 + current.getMinutes();

                if (!closest || Math.abs(_current - _value) < Math.abs(closest - _value)) {
                    closest = _current;
                    index = i;
                }
            }

            return index;
        }

        return {
            restrict: 'A',
            replace: true,
            scope: {
                data: "=data",
                model: '=ngModel'
            },
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                scope.stringToDate = function (time) {
                    if (!time) {
                        return null;
                    }

                    var d = new Date();
                    var t = time.match(/(\d+)(?::(\d\d))?\s*(p|a?)/i);

                    if (!t) {
                        return null;
                    }

                    var hours = parseInt(t[1]);
                    d.setHours(hours + (hours == 12 ? (t[3] ? (t[3].toLowerCase() == 'p' ? 0 : -12) : 0) : (t[3].toLowerCase() == 'p' ? 12 : 0)));
                    d.setMinutes(parseInt(t[2]) || 0);
                    d.setSeconds(0);

                    return d;
                };

                scope.generateHours = function (minTime, maxTime, step) {
                    var timeList = [];
                    var i = minTime;

                    while (i <= maxTime) {
                        timeList.push(new Date(i));
                        i.setMinutes(i.getMinutes() + step);
                    }

                    return timeList;
                };

                var minTime = scope.stringToDate(attrs.minTime) || scope.stringToDate('00:00'),
                    maxTime = scope.stringToDate(attrs.maxTime) || scope.stringToDate('23:59'),
                    step = stringToMinutes(attrs.step || '15m'),
                    current = null;

                scope.timepicker = {
                    element: null,
                    timeFormat: attrs.timeFormat || 'h:mm a',
                    isOpen: false,
                    activeIdx: -1,
                    optionList: scope.generateHours(minTime, maxTime, step)
                };

                scope.select = function (index) {
                    scope.update(scope.timepicker.optionList[index]);
                    if (scope.timepicker.isOpen) {
                        scope.timepicker.isOpen = false;
                    }
                };

                scope.update = function (value) {
                    if (!value) {
                        return;
                    }

                    current.setHours(value.getHours());
                    current.setMinutes(value.getMinutes());
                    current.setSeconds(value.getSeconds());

                    scope.model = current;
                    scope.data.answers[0] = $filter('date')(current, scope.timepicker.timeFormat);

                    ngModel.$render();
                };

                ngModel.$render = function () {
                    var timeString = ngModel.$viewValue ? $filter('date')(ngModel.$viewValue, scope.timepicker.timeFormat) : '';
                    element.val(timeString);
                };

                scope.isActive = function (index) {
                    return index === scope.timepicker.activeIdx;
                };

                scope.setActive = function (index) {
                    scope.timepicker.activeIdx = index;
                };

                scope.openPopup = function () {
                    scope.position = $position.position(element);
                    scope.position.top = scope.position.top + element.prop('offsetHeight');
                    scope.timepicker.isOpen = true;

                    if (!(ngModel.$viewValue instanceof Date)) {
                        ngModel.$viewValue = scope.stringToDate(ngModel.$viewValue);
                    }

                    scope.timepicker.activeIdx = getClosestIndex(ngModel.$viewValue, scope.timepicker.optionList);
                    scope.$digest();

                    if (scope.timepicker.element && scope.timepicker.activeIdx > -1) {
                        var target = scope.timepicker.element[0].querySelector('.active');
                        target.parentNode.scrollTop = target.offsetTop;
                    }
                };

                element.bind('focus', function () {
                    scope.openPopup();
                });

                element.bind('change', function () {
                    var time = scope.stringToDate(element.val());

                    if (time instanceof Date) {
                        scope.update(time);
                    } else {
                        scope.update(current);
                    }

                    scope.timepicker.isOpen = false;
                    scope.$apply();
                });

                $document.bind('click', function () {
                    if (scope.timepicker.isOpen && event.target !== element[0]) {
                        scope.timepicker.isOpen = false;
                        scope.$apply();
                    }
                });

                element.after($compile(angular.element('<cv-timepicker-popup></cv-timepicker-popup>'))(scope));

                scope.model = scope.stringToDate(scope.data.answers[0]);

                if (!(scope.model instanceof Date)) {
                    scope.model = new Date();
                }

                current = scope.model;

                scope.timepicker.activeIdx = getClosestIndex(scope.model, scope.timepicker.optionList);

                if (scope.timepicker.activeIdx > -1) {
                    scope.select(scope.timepicker.activeIdx);
                }
            }
        };
    };

    angular.module("cv.directives")
        .directive("cvTimepicker", ["directivesPath", "$compile", "$parse", "$position", "$document", "$filter", directiveProvider]);


    let childDirectiveProvider = (directivesPath) => {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            template: `<ul class="cv-timepicker-popup dropdown-menu" ng-style="{display: timepicker.isOpen && 'block' || 'none', top: position.top+'px', left: position.left+'px'}">
            <li ng-repeat="time in timepicker.optionList" ng-class="{active: isActive($index) }" ng-mouseenter="setActive($index)" ng-click="select($index)">
            <a>{{time | date:timepicker.timeFormat}}</a>
            </li>
            </ul>`,
            link: function (scope, element, attrs) {
                scope.timepicker.element = element;
                element.find('a').bind('click', function (event) {
                    event.preventDefault();
                });
            }
        };
    };

    angular.module("cv.directives")
        .directive("cvTimepickerPopup", ["directivesPath", childDirectiveProvider]);

})();