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