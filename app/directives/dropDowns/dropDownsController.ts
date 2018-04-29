class DropDownsController {
    static $inject = ["$scope", "$rootScope", "$log"];

    private $scope: any;
    private $rootScope: ICVRootScope;
    private $log: ng.ILogService;
    private $filter: ng.IFilterService;

    private items: any;

    constructor($scope: any, $rootScope: ICVRootScope, $log: ng.ILogService, $filter: ng.IFilterService) {
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

    fetchItems = (q, sync) => {
        if (q === '') {
            sync(this.items.all()); // This is the only change needed to get 'ALL' items as the defaults
        }
        else {
            this.items.search(q, sync);
        }
    }

    getInputValue = () => {
        this.$log.debug(this.$scope.inputText);
        var value: string = this.$scope.inputText;
    }    
}

(() => {
    angular.module("cv.directives").controller("dropDownsController", DropDownsController);
})();