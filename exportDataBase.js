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
                type: 'string',
                width: 25
            }, {
                caption: 'zaryadka',
                type: 'string',
                encoding: 'utf-8'
            }, {
                caption: 'chku',
                type: 'string'
            }, {
                caption: 'opozdal',
                type: 'string'
            }, {
                caption: 'vnesh_vid',
                width: 10,
                type: 'string'
            }, {
                caption: 'sampod',
                type: 'string'
            }, {
                caption: 'ch_terr',
                type: 'string'
            }, {
                caption: 'chkv',
                type: 'string'
            }, {
                caption: 'penalty',
                type: 'string'
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
                element.push("-", "-", "-", "-", "-", "-", "-", "-", "-");
                fullArray.push(element);
                //Добавление заголовка класса
                var element = [];
                element.push(rows[i + 1]["class"], "zrd", "chku", "opozdal", "vnesh_vid", "sampod", "ch_terr", "chkv", "penalty");
                fullArray.push(element);
            }
        }

        conf.rows = fullArray;
        var result = nodeExcel.execute(conf);
        Var.FS.writeFileSync('export.xls', result, 'binary', 'utf8');
        console.log("written");
    });
    
}

setTimeout(exportDB(), 1000 * 60 * 2);