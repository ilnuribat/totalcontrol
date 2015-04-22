var Var = require('./Variables.js');
var sql = require('./sql.js');

function exportDB() {
    var sqlQuery = "SELECT name_surname AS 'name', class.name AS 'class', SUM(zrd) AS 'zrd', SUM(opozdal) AS 'opozdal' FROM control INNER JOIN students ON students.id = id_student INNER JOIN class ON class.id = students.class GROUP BY name_surname ORDER BY class.id";

    sql.main(sqlQuery, function (error, rows) {
        var query = "name;class;Зарядка;Опаздания\n";
        
        for (var row in rows) {
            var name = rows[row]["name"];
            var className = rows[row]["class"];
            var zrd = rows[row]["zrd"];
            var opozdal = rows[row]["opozdal"];
            query = query.concat(name, ";", className, ";", zrd, ";", opozdal, ";\n");
        }
        Var.FS.writeFile('./export.csv', query, "utf-8", function (error) {
            console.log(error);
        });
    });

}

exportDB();