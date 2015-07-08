import {default as writer} from "./writer";
import {default as srcArray} from "./source/array";
import {default as srcCsv} from "./source/csv";
import {default as srcFolder} from "./source/folder";

import {* as program} from "commander";
import {* as async} from "async";

export default function () {
    program.version("0.0.1")
        .usage("gen -l <csv file> -d <directory> -o <ouput to file>")
        .option("-c, --csv", "CSV file path")
        .option("-d, --directory", "SVG folder")
        .option("-l, --list", "List of files")
        .parse(process.argv);


    let fnList = ["file", "csv", "folder", "list"].filter(function (i) {
        return !!program[i];
    }).map(function (i) {
        switch (i) {
            case "file":
                return srcFile(program.file);
            case "csv":
                return srcCsv(program.csv);
            case "folder":
                return srcFolder(program.directory);
            case "list":
                return srcArray(proram.list);
        }
    });
    
    // process them all
    async.map(fnList, function (fn, callback) {
        fn().then(function (objects) {
            callback(false, objects);
        }, function (error) {
            callback(true, error);
        });
    }, function (err, results) {
        results.reduce(function (prev, curr) {
            return prev.concat(curr);
        }).then(function (svgs) {
            if (program.output) {
                writer.toFile(program.output, svgs); 
            } else {
                writer.toConsole(svgs);
            }
        }); 
    });
};
