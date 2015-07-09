"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var u = _interopRequireWildcard(require("../util"));

var parse = _interopRequire(require("../parser"));

var Promise = require("es6-promise").Promise;

module.exports = function (list) {
    return function () {
        return new Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);

            list.forEach(function (item) {
                q.push(typeof item === "object" ? item : {
                    file: item
                });
            });
        }).then(parse);
    };
};