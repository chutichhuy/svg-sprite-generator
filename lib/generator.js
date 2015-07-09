"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var writer = _interopRequireWildcard(require("./writer"));

var srcArray = _interopRequire(require("./source/array"));

var srcCsv = _interopRequire(require("./source/csv"));

var srcFolder = _interopRequire(require("./source/folder"));

var srcSprite = _interopRequire(require("./source/sprite"));

var program = _interopRequire(require("commander"));

var async = _interopRequire(require("async"));

module.exports = function () {
    program.version("0.0.1").option("-c --csv <csv>", "CSV file path").option("-d --directory <directory>", "SVG folder").option("-l --list <list>", "List of files").option("-o --output <output>", "Out put to file").parse(process.argv);

    var fnList = ["sprite", "csv", "directory", "list"].filter(function (i) {
        return !!program[i];
    }).map(function (i) {
        switch (i) {
            case "sprite":
                return srcSprite(program.sprite);
            case "csv":
                return srcCsv(program.csv);
            case "directory":
                return srcFolder(program.directory);
            case "list":
                return srcArray(program.list.split(",").map(function (i) {
                    return i.trim();
                }));
        }
    });

    // process them all
    async.map(fnList, function (fn, callback) {
        fn().then(function (objects) {
            callback(false, objects);
        }, function (error) {
            callback(true, error);
        });
    }, function (err, results) {
        if (results.length == 0) {
            return;
        }

        var svgs = results.reduce(function (prev, curr) {
            return prev.reduce(function (p, c) {
                return p.concat(c);
            }).concat(curr.reduce(function (p, c) {
                return p.concat(c);
            }));
        });

        if (program.output) {
            writer.writeToFile(program.output, svgs);
        } else {
            writer.writeToConsole(svgs);
        }
    });
};