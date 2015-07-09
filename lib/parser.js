"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var cheerio = _interopRequire(require("cheerio"));

var fs = _interopRequire(require("fs"));

/*
 * Transform an array of SVG content to an array of objects those are
 * ready for sprite generation
 *
 * @param svgs - Array of arrays, each has 2 element, 0 -> id, 1 -> svg content
 * @return contents - Array
 */

module.exports = function (svgs) {
    return svgs.map(function (s) {
        var svgTag = cheerio.load("<div>" + s.content + "</div>", {
            xmlMode: true
        })("svg");

        return svgTag.length ? {
            content: svgTag.html(),
            viewBox: svgTag.attr("viewBox"),
            id: s.id ? s.id : svgTag.attr("id") ? svgTag.attr("id") : undefined
        } : undefined;
    });
};