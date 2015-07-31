'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _es6Promise = require('es6-promise');

var writeToFile = function writeToFile(destPath, content) {
    return new _es6Promise.Promise(function (res, rej) {
        _fs2['default'].writeFile(destPath, content, function (err) {
            if (err) {
                rej(err);
            } else {
                res(destPath);
            }
        });
    });
};

var getSpriteXml = function getSpriteXml(svgs) {
    return '<?xml version="1.0" encoding="utf-8"?>' + '\n' + '<svg xmlns="http://www.w3.org/2000/svg">' + '\n' + svgs.map(function (s) {
        return '<symbol' + (s.id ? ' id="' + s.id + '"' : '') + (s.viewBox ? ' viewBox="' + s.viewBox + '"' : '') + '>' + s.content + '\n' + '</symbol>';
    }).join('\n') + '</svg>';
};

var publicWriteToFile = function publicWriteToFile(filePath, svgs) {
    return writeToFile(filePath, getSpriteXml(svgs));
};

var publicWriteToConsole = function publicWriteToConsole(svgs) {
    return new _es6Promise.Promise(function () {
        console.log(getSpriteXml(svgs));
    });
};

exports.getSpriteXml = getSpriteXml;
exports.writeToFile = publicWriteToFile;
exports.writeToConsole = publicWriteToConsole;