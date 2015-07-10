import {default as fs} from 'fs';
import {Promise} from "es6-promise";

let writeToFile = function (destPath, content) {
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

let getSpriteXml = function (svgs) {
    return '<?xml version="1.0" encoding="utf-8"?>' + "\n" +
        '<svg xmlns="http://www.w3.org/2000/svg">' + "\n" +
        svgs.map(function (s) {
            return '<symbol' + 
                (s.id ? (' id="' + s.id + '"') : '') +
                (s.viewBox ? (' viewBox="' + s.viewBox + '"') : '') +
                '>'
                + s.content
                + "\n"
                + '</symbol>';
        }).join("\n") + '</svg>';
};

let publicWriteToFile = function (filePath, svgs) {
    return writeToFile(filePath, getSpriteXml(svgs));
};

let publicWriteToConsole = function (svgs) {
    return new Promise(function () {
        console.log(getSpriteXml(svgs));
    });
};

export {getSpriteXml as getSpriteXml};
export {publicWriteToFile as writeToFile};
export {publicWriteToConsole as writeToConsole};

