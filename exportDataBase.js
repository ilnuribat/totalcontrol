var Var = require('./variables.js');
var sql = require('./sql.js');
var nodeExcel = require('excel-export');

function exportDB() {
    var sqlQuery = "SELECT name_surname AS 'name', class.name AS 'class', SUM(1 - zrd) AS 'zrd', SUM(chku) AS 'chku', SUM(opozdal) AS 'opozdal', " + 
        "SUM(vnesh_vid) AS 'vnesh_vid', SUM(sampod) AS 'sampod', SUM(ch_terr) AS 'ch_terr', SUM(chkv) AS 'chkv' FROM control " + 
        "INNER JOIN students ON students.id = id_student INNER JOIN class ON class.id = students.class " + 
        "GROUP BY name_surname ORDER BY students.class;";
    sql.main(sqlQuery, function (error, rows) {
        var conf = {};
        conf.cols = [{
                caption: rows[1]["class"],
                type: 'string',
                width: 25
            }, {
                caption: Var.rTitles["zrd"],
                type: 'string',
                width: 10
            }, {
                caption: Var.rTitles["chku"],
                type: 'string',
                width: 24
            }, {
                caption: Var.rTitles["opozdal"],
                type: 'string',
                width: 10
            }, {
                caption: Var.rTitles["vnesh_vid"],
                type: 'string',
                width: 10
            }, {
                caption: Var.rTitles["sampod"],
                type: 'string',
                width: 10
            }, {
                caption: Var.rTitles["ch_terr"],
                type: 'string',
                width: 15
            }, {
                caption: Var.rTitles["chkv"],
                type: 'string',
                width: 24
            }, {
                caption: Var.rTitles["penalty"],
                type: 'string',
                width: 5
            }];
        
        var fullArray = [];
        
        for (var i = 0; i < rows.length; i++) {
            var element = [];
            element.push(rows[i]["name"]);
            element.push(rows[i]["zrd"] + "");
            element.push(rows[i]["chku"] + "");
            element.push(rows[i]["opozdal"] + "");
            element.push(rows[i]["vnesh_vid"] + "");
            element.push(rows[i]["sampod"] + "");
            element.push(rows[i]["ch_terr"] + "");
            element.push(rows[i]["chkv"] + "");
            element.push((rows[i]["zrd"] + rows[i]["chku"]) + "");
            fullArray.push(element);
            
            if (rows.length > i + 1 && rows[i]["class"] != rows[i + 1]["class"]) {
                var element = [];
                element.push(" ", "", "", "", "", "", "", "", "");
                fullArray.push(element);
                
                //Добавление заголовка класса
                var element = [];
                element.push(rows[i + 1]["class"], Var.rTitles["zrd"], Var.rTitles["chku"], Var.rTitles["opozdal"], Var.rTitles["vnesh_vid"], 
                Var.rTitles["sampod"], Var.rTitles["ch_terr"], Var.rTitles["chkv"], Var.rTitles["penalty"]);
                
                fullArray.push(element);
            }
        }

        conf.rows = fullArray;
        var result = nodeExcel.execute(conf);
        Var.FS.writeFileSync(Var.rTitles["report"], result, 'binary', 'utf8');
        console.log("exportDataBase.js: written");
        setTimeout(exportDB, 1000);// * 60 * 2);
    });
    
}

exports.DB = exportDB();