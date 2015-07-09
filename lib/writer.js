"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fs = _interopRequire(require("fs"));

var Promise = require("es6-promise").Promise;

var writeToFile = function writeToFile(destPath, content) {
    return new Promise(function (res, rej) {
        fs.writeFile(destPath, content, function (err) {
            if (err) {
                rej(err);
            } else {
                res(destPath);
            }
        });
    });
};

var getSpriteXml = function getSpriteXml(svgs) {
    return "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + "\n" + "<svg xmlns=\"http://www.w3.org/2000/svg\">" + "\n" + svgs.map(function (s) {
        return "<symbol" + (s.id ? " id=\"" + s.id + "\"" : "") + (s.viewBox ? " viewBox=\"" + s.viewBox + "\"" : "") + ">" + s.content + "\n" + "</symbol>";
    }).join("\n") + "</svg>";
};

var publicWriteToFile = function publicWriteToFile(filePath, svgs) {
    return writeToFile(filePath, getSpriteXml(svgs));
};

var publicWriteToConsole = function publicWriteToConsole(svgs) {
    return new Promise(function () {
        console.log(getSpriteXml(svgs));
    });
};

exports.writeToFile = publicWriteToFile;
exports.writeToConsole = publicWriteToConsole;
Object.defineProperty(exports, "__esModule", {
    value: true
});