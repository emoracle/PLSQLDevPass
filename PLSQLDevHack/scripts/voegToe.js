function voegToe(obj, indexSet, logonList) {    
    let id;
    if (obj.user && obj.ww && obj.db) {
        if (obj.user != "" && obj.ww != "" && obj.db != "") {
            id = obj.user + "/" + obj.ww + "@" + obj.db;
            if (indexSet.has(id)) { }
            else {
                indexSet.add(id);
                logonList.push(obj);
            }
        }
    }
}
exports.voegToe = voegToe;
