var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.get('/listOfClass', function(request, response) {
    var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
	var classid = params['id_class'] - 0;
	
	sql.main("SELECT students.id, name_surname AS 'Фамилия Имя', name AS 'класс' FROM students INNER JOIN class ON class.id = students.class AND class.id = '" + classid + "';",
		function(error, rows) {
			response.send(rows);
		});
});

Var.app.get('/classes', function(request, response) {
	sql.main("SELECT id, name FROM class", function (error, rows) {
		response.send(rows);
	});
});