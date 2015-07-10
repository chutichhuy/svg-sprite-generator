import * as writer from "./writer";
import {default as srcList} from "./source/list";

import {default as parse} from "./parse";

let spriteFromFiles = function (files) {
    return new Promise(function (res, rej) {
        return srcList(files)
            .then(parse)
            .then(function (results) {
                res(writer.getSpriteXml(results));
            });
    });
};

export {spriteFromFiles};
