import {* as fs} from "fs";
import {* as cheerio} from "cheerio";
import {* as u} from "../util";
import {default as parse} from "../parser";

export default function (file) {
    return new Promise(function (res, rej) {
        fs.readFile(file, function (err, data) {
            if (err) {
                return rej(err);
            }

            // data
            let q = cheerio.load(data.toString("utf8"), {
                xmlMode: true
            });

            let symbols = q("symbol");

            if (symbols.length == 0) {
                return res([]);
            }
            
            res(symbols.map(function (index, ele) {
                let t = q(this);
                return {
                    id: t.attr("id"),
                    viewBox: t.attr("viewBox"),
                    content: t.html()
                };
            }));
        });
    }).then(parse);
};

