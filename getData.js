var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.get('/listOfClass', function(request, response) {
    var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var classid = params['id_class'] - 0;
	
	sql.main("SELECT students.id, name_surname AS 'name' FROM students WHERE class = '" + classid + "';",
		function(error, rows) {
			response.send(rows);
		});
});

Var.app.get('/listOfRooms', function(request, response) {
	var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var classid = params['id_class'] - 0;
	sql.main("SELECT room AS 'id', room AS 'name' FROM students WHERE class = " + classid + " AND room > 0 GROUP BY room;", function (error, rows) {
		if(error) {
			console.log(error);
			response.send("error!");
		}
		//console.log(rows);
		response.send(rows);
	});
});

Var.app.get('/listOfClasses', function(request, response) {
	sql.main("SELECT id, name FROM class;", function (error, rows) {
		if(error) {
			console.log(error);
			response.send("error!");
		}
		//console.log(rows);
		response.send(rows);
	});
});

Var.app.get('/dayReport', function(request, response) {
	var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var day = params['day'];
	var type = params['type'];
	sql.main("SELECT class AS 'name', (100 * SUM(" + type + ") / (SELECT COUNT(id) FROM students AS forClass WHERE students.class = forClass.class)) AS 'percentage' " + 
		"FROM control INNER JOIN students ON id_student = students.id WHERE " + type + " IS NOT NULL AND day = " + day + " GROUP BY class;", 
		function (error, rows) {
		if(error) {
			console.log(error);
			response.send("error!");
		}
		//console.log(rows);
		response.send(rows);
	});
});