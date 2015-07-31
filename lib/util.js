"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _es6Promise = require("es6-promise");

/*
 * Slugify function taken from https://gist.github.com/mathewbyrne/1280286
 */
var idFromFileName = function idFromFileName(fileName) {
    return fileName.toString().toLowerCase().replace(/\.svg/g, "").replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

var fileNameToObject = function fileNameToObject(filePath) {
    var id = arguments[1] === undefined ? null : arguments[1];

    return new _es6Promise.Promise(function (res, rej) {
        _fs2["default"].readFile(filePath, function (err, data) {
            if (err) {
                return rej(err);
            }

            var idStr = id ? id : (function (parts) {
                return idFromFileName(parts[parts.length - 1]);
            })(filePath.split("/"));

            return res({
                content: data.toString("utf8"),
                id: idStr
            });
        });
    });
};

var fileToObjectQueue = function fileToObjectQueue(drain) {
    var results = [];

    var q = _async2["default"].queue(function (task, callback) {
        if (_fs2["default"].existsSync(task.file)) {
            fileNameToObject(task.file, task.id).then(function (o) {
                results.push(o);
                callback();
            });
        } else {
            // file not existing,
            // just skip
            callback();
        }
    });

    q.drain = function () {
        drain(results);
    };

    return q;
};

exports.fileNameToObject = fileNameToObject;
exports.fileNameToObjectQueue = fileToObjectQueue;
exports.idFromFileName = idFromFileName;