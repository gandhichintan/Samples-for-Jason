"use strict";

angular.module("cv.services").factory("comparatorService",
[
    function () {

        var factory = {},
            _factory = {};

        _factory.ensureIsComparable = function(el1, operator, el2) {
            switch(operator) {
                case "lte": case "gte":
                    return parseInt(el1);
                case "loweq":
                    return el1[0];
            }
        }

        _factory.ensureString = function(el) {
            return "" + el;
        }

        // Comparators
        // Maybe we can also use private _factory to hide these methods
        factory.gte = function(el1, el2) {
            return el1 >= el2;
        }

        factory.lte = function(el1, el2) {
            return el1 <= el2;
        }

        factory.eq = function(el1, el2) {
            return el1 == el2;
        }

        factory.loweq = function(el1, el2) {
            return factory.eq(_factory.ensureString(el1).toLowerCase(), _factory.ensureString(el2).toLowerCase());
        }
        //

        factory.compare = function (element, condition) {
            if (angular.isUndefined(element) || element.length === 0 || angular.isUndefined(element[0])) {
                return false;
            }

            var operator = condition[0],
                element2 = condition[1],
                specification = condition[2] || false,
                parsedElement = _factory.ensureIsComparable(element, operator, element2),
                element1 = specification ? parsedElement[specification] : parsedElement;
            
            // todo call 0 index is a temporal solution... generalize for different kinds of elements (at least array and index)
            return this[operator](element1, element2);
        }

        return factory;
    }
]);