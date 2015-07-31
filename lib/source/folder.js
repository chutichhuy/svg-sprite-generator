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

exports["default"] = function (folderPath) {
    return function () {
        return new _es6Promise.Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);
            _fs2["default"].readdir(folderPath, function (err, files) {

                if (err) {
                    return rej(err);
                }

                files.filter(function (f) {
                    // only take svg
                    return /\.svg/.test(f);
                }).forEach(function (f) {
                    q.push({
                        file: folderPath + "/" + f
                    });
                });
            });
        }).then(_parser2["default"]);
    };
};

;
module.exports = exports["default"];