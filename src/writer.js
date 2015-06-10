import {* as fs} from 'fs';

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
                (s.viewBox ? (' viewBox="' + s.id + '"') : '') +
                '>';
        }).join("\n") + '</svg>';
};

export default function (srcFn) {
    return function (filePath) {
        return Promise.resolve(srcFn()).then(function (svgs) {
            return writeToFile(filePath, getSpriteXml(svgs));
        });
    };
};

