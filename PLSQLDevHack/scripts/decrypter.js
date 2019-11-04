function decrypter(scrambled) {
    var valueArray = [], ret = "", key;
    for (let i = 0; i < scrambled.length; i += 4) {
        valueArray.push(parseInt(scrambled.substr(i, 4)));
    }
    key = valueArray[0];
    valueArray.shift();
    for (let i = 0; i < valueArray.length; i++) {
        let val = valueArray[i] - 1000;
        let mask = key + (10 * (i + 1));
        ret += String.fromCharCode((val ^ mask) >> 4);
    }
    return ret;
}
exports.decrypter = decrypter;
