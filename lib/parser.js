'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/*
 * Transform an array of SVG content to an array of objects those are
 * ready for sprite generation
 *
 * @param svgs - Array of arrays, each has 2 element, 0 -> id, 1 -> svg content
 * @return contents - Array
 */

exports['default'] = function (svgs) {
    return svgs.map(function (s) {
        var svgTag = _cheerio2['default'].load('<div>' + s.content + '</div>', {
            xmlMode: true
        })('svg');

        return svgTag.length ? {
            content: svgTag.html(),
            viewBox: svgTag.attr('viewBox'),
            id: s.id ? s.id : svgTag.attr('id') ? svgTag.attr('id') : undefined
        } : undefined;
    });
};

;
module.exports = exports['default'];