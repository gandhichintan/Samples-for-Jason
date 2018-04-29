///<reference path="~/lib/jasmine-2.3.4/jasmine.js"/>
///<reference path="~/lib/angular/angular.js"/>
///<reference path="~/lib/angular/angular-mocks.js"/>

///<reference path="~/app/app.js"/>
///<reference path="~/app/cv.directives.js"/>
///<reference path="~/app/directives/basicSelect/basicSelect.js"/>
///<reference path="~/app/directives/basicSelect/basicSelectController.js"/>

var compile, scope, instance;

describe("basicSelect directive", function() {

    beforeEach(function() {
        module("cv.directives");
    });

    inject(function($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
    });

    instance = getCompiledElement();
});

function getCompiledElement() {
    var element = angular.element("<basic-select data='questionMock'></basic-select>");
    scope.questionMock = {
        properties: {
            options: [{ text: "Ejemplo 1", value: "A" }, { text: "Ejemplo 2", value: "B" }, { text: "Ejemplo 3", value: "C" }],
            selected: { text: "Ejemplo 1", value: "A" }
        }
    }
    var compiledElement = compile(element)(scope);
    $scope.$digest();
    return compiledElement;
}