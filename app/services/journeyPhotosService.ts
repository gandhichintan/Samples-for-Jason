/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />

"use strict";

class JourneyPhotosService {

    photoIDs: Array<string> = ["destination_photo1", "destination_photo2", "destination_photo3"]
    backgroundsPath: string = '/company_res/TellTacoTimeNW.Survey/survey/web/backgrounds/';
    destinationsPath: string = '/company_res/TellTacoTimeNW.Survey/survey/web/destinations/';
    defaultPhotoUrl = 'napkin.png';

    constructor() {

        this.SetDefaultPhoto();
    }

    SetDefaultPhoto() {
        let url = this.backgroundsPath + this.defaultPhotoUrl;
        $(`#${this.photoIDs[0]}`).css("background-image", `url(${url})`);
        this.RemovePhoto(1);
        this.RemovePhoto(2);
    }

    SetPhoto(index: number, path : string, photoUrl: string) {
        let url = path + photoUrl;
        $(`#${this.photoIDs[index]}`).css("background-image", `url(${url})`);
    }

    SetDestinationPhoto(index: number, destination: string) {
        if (index <= 2) {
            let url = this.destinationsPath + destination;
            $(`#${this.photoIDs[index]}`).css("background-image", `url(${url}_${index + 1}.png)`).addClass("fade-anim");
        }
    }

    RemovePhoto(index: number) {
        $(`#${this.photoIDs[index]}`).css("background-image", '').removeClass("fade-anim");
    }

}

angular.module("cv.services")
    .factory("journeyPhotos", [() => new JourneyPhotosService()]);