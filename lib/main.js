"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _writer = require("./writer");

var writer = _interopRequireWildcard(_writer);

var _sourceList = require("./source/list");

var _sourceList2 = _interopRequireDefault(_sourceList);

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

var spriteFromFiles = function spriteFromFiles(files) {
    return new Promise(function (res, rej) {
        (0, _sourceList2["default"])(files)().then(function (results) {
            res(writer.getSpriteXml(results));
        });
    });
};

exports.spriteFromFiles = spriteFromFiles;