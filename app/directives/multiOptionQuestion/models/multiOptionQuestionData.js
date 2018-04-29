"use strict";

function MultiOptionQuestionData(options, choiceLimits, customSprites, clickableContainers, extraIconClass, glyphicons) {

    /**
     * options: array of objects {text: string, value: string} [posible answers]
     * choiceLimits: int [max of choices allowed]
     * customSprites: boolean
     * clickableContainers: boolean
     * extraIconClass: string [extra glyphicon to be shown when the option is selected]
     * glyphicons: object {trueIcon: string, falseIcon: string}
     */

    this.options = options;
    this.choiceLimits = choiceLimits || undefined;
    this.customSprites = customSprites || false;
    this.clickableContainers = clickableContainers || false;
    this.extraIconClass = extraIconClass || "";
    this.glyphicons = glyphicons || false;
}