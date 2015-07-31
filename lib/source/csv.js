"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _util = require("../util");

var u = _interopRequireWildcard(_util);

var _parser = require("../parser");

var _parser2 = _interopRequireDefault(_parser);

var _es6Promise = require("es6-promise");

var csvStringToSvgContents = function csvStringToSvgContents(str) {
    return (function (fileList) {
        return new _es6Promise.Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);
            fileList.forEach(function (item) {
                q.push(item);
            });
        });
    })(str.split("\n").map(function (line) {
        var parts = line.split(",").map(function (item) {
            return item.trim();
        });

        return {
            id: parts[0],
            file: parts[1]
        };
    }).filter(function (item) {
        return !!item.file;
    }));
};

/*
 * Returns a function that
 * takes a CSV file and export as SVG content list
 * @param filePath - path to svg file
 * @return fn - the source function
 */

exports["default"] = function (filePath) {
    return function () {
        return new _es6Promise.Promise(function (res, rej) {
            _fs2["default"].readFile(filePath, function (err, data) {
                if (err) {
                    return rej(err);
                }
                return csvStringToSvgContents(data.toString("utf8")).then(res);
            });
        }).then(_parser2["default"]);
    };
};

;
module.exports = exports["default"];