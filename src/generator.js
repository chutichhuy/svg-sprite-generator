import * as writer from "./writer";
import {default as srcList} from "./source/list";
import {default as srcCsv} from "./source/csv";
import {default as srcFolder} from "./source/folder";
import {default as srcSprite} from "./source/sprite";

import {default as program} from "commander";
import {default as async} from "async";

export default function () {
    program
        .version("0.0.1")
        .option("-c --csv <csv>", "CSV file path")
        .option("-d --directory <directory>", "SVG folder")
        .option("-l --list <list>", "List of files")
        .option("-o --output <output>", "Out put to file")
        .option("-s --sprite <sprite>", "Another sprite file")
        .parse(process.argv);

    let fnList = ["sprite", "csv", "directory", "list"].filter(function (i) {
        return !!program[i];
    }).map(function (i) {
        switch (i) {
            case "sprite":
                return srcSprite(program.sprite);
            case "csv":
                return srcCsv(program.csv);
            case "directory":
                return srcFolder(program.directory);
            case "list":
                return srcList(program.list.split(",").map(function (i) {
                    return i.trim();
                }));
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
        if (results.length == 0) {
            return;
        }
        // reduces the results into one
        let svgs = results.reduce(function (prev, curr) {
            return prev.concat(curr);
        }, []);

        if (program.output) {
            writer.writeToFile(program.output, svgs); 
        } else {
            writer.writeToConsole(svgs);
        }
    });
};
