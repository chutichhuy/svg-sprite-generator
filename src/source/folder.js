import {default as fs} from "fs";
import {default as path} from "path";
import * as u from "../util";
import {default as parse} from "../parser";
import {Promise} from "es6-promise";

function *walkSync(dir, base="") {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      if (file.isDirectory()) {
        yield* walkSync(path.join(dir, file.name), path.join(base, file.name));
      } else {
        yield path.join(base, file.name);
      }
    }
}

export default function (folderPath) {
    return function () {
        return new Promise(function (res, rej) {
            var q = u.fileNameToObjectQueue(res);
            
            for ( const filePath of walkSync(folderPath) ) {
              if ( /\.svg/.test(filePath) ) {
                continue;
              }
            
              q.push({ file: path.join(folderPath, filePath) });
            }
        }).then(parse);
    };
};
