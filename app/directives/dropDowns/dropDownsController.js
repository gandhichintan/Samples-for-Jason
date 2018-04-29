var DropDownsController = (function () {
    function DropDownsController($scope, $rootScope, $log, $filter) {
        var _this = this;
        this.fetchItems = function (q, sync) {
            if (q === '') {
                sync(_this.items.all()); // This is the only change needed to get 'ALL' items as the defaults
            }
            else {
                _this.items.search(q, sync);
            }
        };
        this.getInputValue = function () {
            _this.$log.debug(_this.$scope.inputText);
            var value = _this.$scope.inputText;
        };
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$filter = $filter;
        this.$scope.getInputValue = this.getInputValue;
        this.$scope.selectedItem = "";
        this.$log.debug(this.$scope.data);
        this.$scope.selectedNumber = null;
        this.items = this.$scope.data.properties.items;
        //initialize the bloodhound suggestion engine
        this.items.initialize();
        if (this.items.local.length > 0) {
            $log.log(this.items);
            this.$scope.itemsDataset = {
                displayKey: 'item',
                limit: this.items.local.length,
                source: this.fetchItems
            };
        }
        else {
            this.$scope.itemsDataset = {
                displayKey: 'item',
                source: this.fetchItems
            };
        }
        // Typeahead options object
        this.$scope.exampleOptions = {
            highlight: true,
            hint: true,
            minLength: 0
        };
    }
    DropDownsController.$inject = ["$scope", "$rootScope", "$log"];
    return DropDownsController;
}());
(function () {
    angular.module("cv.directives").controller("dropDownsController", DropDownsController);
})();
//# sourceMappingURL=dropDownsController.js.map