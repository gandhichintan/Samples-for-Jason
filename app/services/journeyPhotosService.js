/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
"use strict";
var JourneyPhotosService = (function () {
    function JourneyPhotosService() {
        this.photoIDs = ["destination_photo1", "destination_photo2", "destination_photo3"];
        this.backgroundsPath = '/company_res/TellTacoTimeNW.Survey/survey/web/backgrounds/';
        this.destinationsPath = '/company_res/TellTacoTimeNW.Survey/survey/web/destinations/';
        this.defaultPhotoUrl = 'napkin.png';
        this.SetDefaultPhoto();
    }
    JourneyPhotosService.prototype.SetDefaultPhoto = function () {
        var url = this.backgroundsPath + this.defaultPhotoUrl;
        $("#" + this.photoIDs[0]).css("background-image", "url(" + url + ")");
        this.RemovePhoto(1);
        this.RemovePhoto(2);
    };
    JourneyPhotosService.prototype.SetPhoto = function (index, path, photoUrl) {
        var url = path + photoUrl;
        $("#" + this.photoIDs[index]).css("background-image", "url(" + url + ")");
    };
    JourneyPhotosService.prototype.SetDestinationPhoto = function (index, destination) {
        if (index <= 2) {
            var url = this.destinationsPath + destination;
            $("#" + this.photoIDs[index]).css("background-image", "url(" + url + "_" + (index + 1) + ".png)").addClass("fade-anim");
        }
    };
    JourneyPhotosService.prototype.RemovePhoto = function (index) {
        $("#" + this.photoIDs[index]).css("background-image", '').removeClass("fade-anim");
    };
    return JourneyPhotosService;
}());
angular.module("cv.services")
    .factory("journeyPhotos", [function () { return new JourneyPhotosService(); }]);
//# sourceMappingURL=journeyPhotosService.js.map