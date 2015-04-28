var Var = require('./variables.js');
var sql = require('./sql.js');

sql.main("SELECT name, zrd, chku, opozdal, vnesh_vid, sampod, ch_terr, chkv, penalty, report_ind FROM utf8Titles", function (error, row) {
    Var.rTitles["name"] = row[0]["name"];
    Var.rTitles["zrd"] = row[0]["zrd"];
    Var.rTitles["chku"] = row[0]["chku"];
    Var.rTitles["opozdal"] = row[0]["opozdal"];
    Var.rTitles["vnesh_vid"] = row[0]["vnesh_vid"];
    Var.rTitles["sampod"] = row[0]["sampod"];
    Var.rTitles["ch_terr"] = row[0]["ch_terr"];
    Var.rTitles["chkv"] = row[0]["chkv"];
    Var.rTitles["penalty"] = row[0]["penalty"];
    Var.rTitles["report_ind"] = row[0]["report_ind"];

    //console.log("init.js:", Var.rTitles);
    require('./exportDataBase.js');
});