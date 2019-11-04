/* Omschrijving : Hack de wachtwoorden uit een user.prefs
                  Roep aan met nodejs index.js <username>
   Auteur       : H.E. van Meerendonk   
   Creatiedatum : 01.11.2019
   Revisie      :                                             
*/
"use strict";

const { voegToe } = require("./scripts/voegToe");
const { parser } = require("./scripts/parser");
const { decrypter } = require("./scripts/decrypter");

const
    USER = process.argv[2] ||  process.env.USER || require("os").userInfo().username,
    DIR = "C:/Users/" + USER + "/AppData/Roaming/PLSQL Developer 13/Preferences/" + USER + "/",
    lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(DIR + "user.prefs")
    });

var
    inSection = false,
    logonList = [],
    indexSet = new Set();

lineReader.on('line', (line) => {
    if (line == "[LogonHistory]" || line == "[CurrentConnections]") {
        inSection = true;
    }
    else if (line == "" || line.startsWith("[")) {
        inSection = false;
    }
    else if (inSection) {
        voegToe(parser(decrypter(line)), indexSet, logonList);
    }
}).on('close', () => {
    logonList.sort((a, b) => {
        if (a.db == b.db) {
            return 0;
        }
        else {
            return (a.db < b.db) ? -1 : 1;
        }
    }).forEach(
        (x) => {
            console.log("user: %s pwd: %s db: %s", x.user.padEnd(18),x.ww.padEnd(20),x.db);
        }
    );
});


