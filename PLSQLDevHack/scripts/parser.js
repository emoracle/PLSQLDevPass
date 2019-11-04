function parser(ret) {
    if (ret.indexOf(",") >= 0) {
        var a = ret.split(",");
        a[0] = a[0].toUpperCase();
        a[2] = a[2].toUpperCase();
        if (a[2].indexOf("SYSDBA") >= 0) {
            a[2] = a[2].replace(" AS SYSDBA", "");
        }
        return { "user": a[0], "ww": a[1], "db": a[2] };
    }
    else {
        var a = ret.split("/");
        var b = a[1].split("@");
        a[0] = a[0].toUpperCase();
        b[1] = b[1].toUpperCase();
        if (b[1].indexOf("SYSDBA") >= 0) {
            b[1] = b[1].replace(" AS SYSDBA", "");
        }
        return { "user": a[0], "ww": b[0], "db": b[1] };
    }
    return {};
}
exports.parser = parser;
