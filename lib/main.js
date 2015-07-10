"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var writer = _interopRequireWildcard(require("./writer"));

var srcList = _interopRequire(require("./source/list"));

var parse = _interopRequire(require("./parse"));

var spriteFromFiles = function spriteFromFiles(files) {
    return new Promise(function (res, rej) {
        return srcList(files).then(parse).then(function (results) {
            res(writer.getSpriteXml(results));
        });
    });
};

exports.spriteFromFiles = spriteFromFiles;
Object.defineProperty(exports, "__esModule", {
    value: true
});