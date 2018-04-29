"use strict";
var Quote = (function () {
    function Quote(title, paragraphs, signature) {
        this.title = title;
        this.paragraphs = paragraphs;
        this.signature = signature;
    }
    Quote.create = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.title, title = _c === void 0 ? "" : _c, _d = _b.paragraphs, paragraphs = _d === void 0 ? [] : _d, _e = _b.signature, signature = _e === void 0 ? "" : _e;
        return new Quote(title, paragraphs, signature);
    };
    return Quote;
}());
angular.module("cv.model").factory("Quote", [function () { return Quote; }]);
//# sourceMappingURL=quote.js.map