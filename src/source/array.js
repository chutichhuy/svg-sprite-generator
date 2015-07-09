import * as u from "../util";
import {default as parse} from "../parser";
import {Promise} from "es6-promise";

export default function (list) {
    return function () {
        return new Promise(function (res, rej) {
            let q = u.fileNameToObjectQueue(res);
            
            list.forEach(function (item) {
                q.push((typeof item === "object") ? item : {
                    file: item
                });
            });
        }).then(parse);
    };
};
