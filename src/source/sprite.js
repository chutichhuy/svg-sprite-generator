import {default as fs} from "fs";
import {default as cheerio} from 'cheerio';
import * as u from "../util";
import {default as parse} from "../parser";
import {Promise} from "es6-promise";

export default function (file) {
    return function () {
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
                
                let eles = [];
                symbols.each(function (index, ele) {
                    let t = q(this);
                    eles.push({
                        id: t.attr("id"),
                        viewBox: t.attr("viewBox"),
                        content: t.html()
                    });
                });
                res(eles);
            });
        });
    };
};

