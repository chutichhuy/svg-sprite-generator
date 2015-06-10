import {* as 'fs'} from 'fs';

let csvStringToSvgContents = function (str) {
    return str.split("\n").map(function (line) {
        return line.split(',').map(function (item) {
            return item.trim();
        });
    });
};

/*
 * Returns a function that
 * takes a CSV file and export as SVG content list
 * @param filePath - path to svg file
 * @return fn - the source function
 */
export default function (filePath) {
    return function () {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                return rej(err);
            }
            return res(csvStringToSvgContents(data.toString('utf8')));
        });
    };
};

