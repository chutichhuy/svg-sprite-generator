"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _util = require("../util");

var u = _interopRequireWildcard(_util);

var _parser = require("../parser");

var _parser2 = _interopRequireDefault(_parser);

var _es6Promise = require("es6-promise");

exports["default"] = function (list) {
    return function () {
        return new _es6Promise.Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);

            list.forEach(function (item) {
                q.push(typeof item === "object" ? item : {
                    file: item
                });
            });
        }).then(_parser2["default"]);
    };
};

;
module.exports = exports["default"];