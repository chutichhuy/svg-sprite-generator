import {* as fs} from 'fs';

let fileNameToObject = function (filePath, id = null) {
    return new Promise(function (res, rej) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                return rej(err);
            }
            return res(data.toString("utf8"));
        });
    });
};

let fileToObjectQueue = function (drain) {
    let q = async.queue(function (task, callback) {
        obj.fileNameToObject(task.file, task.id).then(callback);
    });
    q.drain = drain;
    return q;
};

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

export {fileNameToObject};
export {fileToObjectQueue};
export {idFromFileName};
