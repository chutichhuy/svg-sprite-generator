"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var u = _interopRequireWildcard(require("../util"));

var parse = _interopRequire(require("../parser"));

var Promise = require("es6-promise").Promise;

module.exports = function (folderPath) {
    return function () {
        return new Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);
            fs.readdir(folderPath, function (err, files) {

                if (err) {
                    return rej(err);
                }

                files.forEach(function (f) {
                    q.push({
                        file: folderPath + "/" + f
                    });
                });
            });
        }).then(parse);
    };
};