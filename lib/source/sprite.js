"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _util = require("../util");

var u = _interopRequireWildcard(_util);

var _parser = require("../parser");

var _parser2 = _interopRequireDefault(_parser);

var _es6Promise = require("es6-promise");

exports["default"] = function (file) {
    return function () {
        return new _es6Promise.Promise(function (res, rej) {
            _fs2["default"].readFile(file, function (err, data) {
                if (err) {
                    return rej(err);
                }

                // data
                var q = _cheerio2["default"].load(data.toString("utf8"), {
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

;
module.exports = exports["default"];