import {default as fs} from "fs";
import * as u from "../util";
import {default as parse} from "../parser";
import {Promise} from "es6-promise";

export default function (folderPath) {
    return function () {
        return new Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);
            fs.readdir(folderPath, function (err, files) {
                
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
        }).then(parse);
    };
};
