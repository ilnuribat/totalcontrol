var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.get('/listOfClass', function(request, response) {
    var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var classid = params['id_class'] - 0;
	var type = params["type"];
	var day = params["day"];
	
	sql.main("SELECT students.id, name_surname AS 'name' FROM students WHERE class = '" + classid + "';",
		function(error, classList) {
			sql.main("SELECT " + type + " AS 'type' FROM control INNER JOIN students ON students.id = id_student " +
			"AND class = " + classid + " AND day = " + day + ";", function(error, rows) {
				var fullList = [];
				
				for(var i = 0; i < classList.length; i ++) {
					var element = {
						"name": classList[i]["name"],
						"id": classList[i]["id"],
						"marked": "0"
						//rows.length > 0 ? (rows[i]["type"] == null ? "0" : rows[i]["type"]) : "0"
					}
					fullList.push(element);
				}
				response.send(fullList);
			});
		});
});

Var.app.get('/listOfRooms', function(request, response) {
	var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var classid = params['id_class'] - 0;
	sql.main("SELECT room AS 'id', room AS 'name', 0 AS 'marked' FROM students WHERE class = " + classid + " AND room > 0 GROUP BY room;", function (error, rows) {
		if(error) {
			console.log(error);
			response.send("error!");
		}
		response.send(rows);
	});
});

Var.app.get('/listOfClasses', function(request, response) {
	sql.main("SELECT id, name, 0 AS 'marked' FROM class;", function (error, rows) {
		if(error) {
			console.log(error);
			response.send("error!");
		}
		response.send(rows);
	});
});

Var.app.get('/dayReport', function(request, response) {
	var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var day = params['day'];
	var type = params['type'];
	sql.main("SELECT class.name AS 'name', (100 * SUM(" + type + ") / (SELECT COUNT(id) FROM students AS forClass WHERE students.class = forClass.class)) " + 
		"AS 'percentage' FROM control INNER JOIN students ON id_student = students.id INNER JOIN class ON students.class = class.id WHERE " + 
		type + " IS NOT NULL AND day = " + day + " GROUP BY class.name;", 
		function (error, rows) {
		if(error) {
			console.log(error);
			
			response.send("error!");
		}
		console.log('send');
		response.send(rows);
	});
});

Var.app.get('/testsql', function (request, response) {
	var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var table = params['table'];

	var sqlQuery = 'SELECT * FROM ' + table + ';';
	sql.main(sqlQuery, function(error, rows) {
		response.send(rows);
	});
});