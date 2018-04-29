"use strict";

class NewSliderController {
    static id = "newsliderController";
    static $inject = ["$scope", "$timeout", "$rootScope", "$log", "environmentService"];

    slider: any;
    tooltipVisibility: { visibility: string };
    savedValue: (boolean | number);
    selected: (boolean | number);
    na: any;
    center: number;
    showLabels: boolean;
    naEnabled: boolean;
    pips: number[];
    data: any;

    constructor(private $scope, private $timeout: ng.ITimeoutService, private $rootScope: ICVRootScope, private $log: ng.ILogService, private environmentService) {

        this.data = $scope.data;
        $log.debug(this.data);
      
        this.initSlider();

        $log.debug(environmentService);
        $scope.environment = environmentService;

        $scope.slider = {
            options: {
                floor: 0,
                ceil: 10,
                showTicks: false,
                showTicksValues: 1,
                getTickColor: this.getTickColor,
                getPointerColor: this.getPointerColor,
                ticksTooltip: this.ticksTooltip,
                ticksValueTooltip: this.ticksValueTooltip,
                autoHideLimitLabels: false,
                stepsArray: [
                    { value: 0, legend: '0' },
                    { value: 1, legend: '1' },
                    { value: 2, legend: '2' },
                    { value: 3, legend: '3' },
                    { value: 4, legend: '4' },
                    { value: 5, legend: '5' },
                    { value: 6, legend: '6' },
                    { value: 7, legend: '7' },
                    { value: 8, legend: '8' },
                    { value: 9, legend: '9' },
                    { value: 10, legend: '10' },
                ],
                onStart: () => {
                    this.$scope.dragging = true;
                    this.swapModel(); 
                   
                },
                onEnd: () => {
                    this.$scope.dragging = false;

                },
                onChange: (a,val) => {
                    this.swapModel();                    
                }
                
            }
        };
    }


    public initSlider = (): any => {
        //this.$scope.dragging = false;
        if (this.isNa()) {
            //this.$scope.model = -1;
            this.$scope.modelinterior = 0;
        }
        else {
            this.$scope.modelinterior = this.$scope.model;
        }
    }

    isNa = ():boolean => {
        return typeof this.$scope.model === "undefined";
    }

    isDragging = (): boolean => {
        
        return this.$scope.dragging;
    }

    isMobile = (): boolean => {
        return $("body").hasClass("small-screen");
    }

    swapModel = (): any => {
       this.$scope.model = this.$scope.modelinterior;
    }

    private getTickColor = (value: number): string => {
        const dotColors = ['#9d4d3f', '#a84e40', '#bc4f42', '#d05044', '#e35344', '#e35344', '#ff6144', '#ffe428', '#f8ed74', '#8cdd42', '#5bd427'];
        return dotColors[value];
    }
    private getPointerColor = (value: number): string => {
        const dotColors = ['#9d4d3f', '#a84e40', '#bc4f42', '#d05044', '#e35344', '#e35344', '#ff6144', '#ffe428', '#ffe428', '#8cdd42', '#5bd427'];
        return typeof value === undefined ? "#bababa" : dotColors[value];
    }

    private ticksTooltip = (value: number): any => {
        return "*" + value;
    }

    private ticksValueTooltip = (value: number): any => {
        return "#" + value;
    }



}

angular.module("cv.directives")
    .controller(NewSliderController.id, NewSliderController);