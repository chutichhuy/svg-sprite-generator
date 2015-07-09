"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var cheerio = _interopRequire(require("cheerio"));

var u = _interopRequireWildcard(require("../util"));

var parse = _interopRequire(require("../parser"));

var Promise = require("es6-promise").Promise;

module.exports = function (file) {
    return function () {
        return new Promise(function (res, rej) {
            fs.readFile(file, function (err, data) {
                if (err) {
                    return rej(err);
                }

                // data
                var q = cheerio.load(data.toString("utf8"), {
                    xmlMode: true
                });

                var symbols = q("symbol");

                if (symbols.length == 0) {
                    return res([]);
                }

                var eles = [];
                symbols.each(function (index, ele) {
                    var t = q(this);
                    eles.push({
                        id: t.attr("id"),
                        viewBox: t.attr("viewBox"),
                        content: t.html()
                    });
                });
                res(eles);
            });
        });
    };
};