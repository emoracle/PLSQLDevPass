function sorteerder(a, b) {
    if (a.db == b.db) {
        return 0;
    }
    else {
        return (a.db < b.db) ? -1 : 1;
    }
}
exports.sorteerder = sorteerder;
