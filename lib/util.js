"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var async = _interopRequire(require("async"));

var Promise = require("es6-promise").Promise;

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

    return new Promise(function (res, rej) {
        fs.readFile(filePath, function (err, data) {
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

    var q = async.queue(function (task, callback) {
        if (fs.existsSync(task.file)) {
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
Object.defineProperty(exports, "__esModule", {
    value: true
});