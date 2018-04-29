"use strict";

class Quote {
    title: string;
    paragraphs: Array<string>;
    signature: string;

    constructor(title: string, paragraphs: Array<string>, signature: string) {
        this.title = title;
        this.paragraphs = paragraphs;
        this.signature = signature;
    }

    static create({title = "", paragraphs = [], signature = ""} = {}): Quote {
        return new Quote(title, paragraphs, signature);
    }
}

angular.module("cv.model").factory("Quote", [() => Quote]);