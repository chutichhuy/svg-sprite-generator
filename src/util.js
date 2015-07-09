import {default as fs} from 'fs';
import {default as async} from "async";
import {Promise} from "es6-promise";

/*
 * Slugify function taken from https://gist.github.com/mathewbyrne/1280286
 */
let idFromFileName = function (fileName) {
    return fileName.toString().toLowerCase()
        .replace(/\.svg/g, '')
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}; 

let fileNameToObject = function (filePath, id = null) {
    return new Promise(function (res, rej) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                return rej(err);
            }

            let idStr = id ? id : (function (parts) {
                return idFromFileName(parts[parts.length - 1]);
            })(filePath.split("/"));

            return res({
                content: data.toString("utf8"),
                id: idStr
            });
        });
    });
};

let fileToObjectQueue = function (drain) {
    let results = [];

    let q = async.queue(function (task, callback) {
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

export {fileNameToObject};
export {fileToObjectQueue as fileNameToObjectQueue};
export {idFromFileName};
