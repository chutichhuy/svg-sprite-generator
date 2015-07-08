import {* as "fs"} from "fs";
import {* as "u"} from "../util";
import {default as parse} from "../parser";

export default function (folderPath) {
    return function () {
        return new Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);
            fs.readdir(function (err, files) {
                if (err) {
                    return rej(err);
                }

                files.forEach(function (f) {
                    q.push({
                        path: f,
                        id: u.idFromFileName(f)
                    });
                });
            });
        }).then(parse);
    };
};
