import * as writer from "./writer";
import {default as srcList} from "./source/list";
import {default as parse} from "./parser";

let spriteFromFiles = function (files) {
    return new Promise(function (res, rej) {
        srcList(files)()
            .then(function (results) {
                res(writer.getSpriteXml(results));
            });
    });
};

export {spriteFromFiles};
