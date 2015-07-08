import {* as "u"} from "../util";

export default function (list) {
    return function () {
        return new Promise(function (res, rej) {
            let q = u.fileNameToObjectQueue(res);
            
            list.forEach(function (item) {
                q.push((typeof item === "object") ? item : {
                    file: item,
                    id: u.idFromFileName(item)
                });
            });
        }).then(parse);
    };
};
