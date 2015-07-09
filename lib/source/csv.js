"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var u = _interopRequireWildcard(require("../util"));

var parse = _interopRequire(require("../parser"));

var Promise = require("es6-promise").Promise;

var csvStringToSvgContents = function csvStringToSvgContents(str) {
    return (function (fileList) {
        return new Promise(function (res, rej) {
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

module.exports = function (filePath) {
    return function () {
        return new Promise(function (res, rej) {
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    return rej(err);
                }
                return csvStringToSvgContents(data.toString("utf8")).then(res);
            });
        }).then(parse);
    };
};