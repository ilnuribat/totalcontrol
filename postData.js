var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.post('/marking', function(request, response) {
	var params = request.body;
	var typeOfMarking = params['type'];
	var addingRows = params['data'];
	var sqlQuery = "INSERT INTO control(id_student, day, " + typeOfMarking + ") " + addingRows + 
		"ON DUPLICATE KEY UPDATE " + typeOfMarking + " = VALUES(" + typeOfMarking + ");";
	//console.log(sqlQuery);
	sql.main(sqlQuery, function(error, rows) {
		if(error) {
			response.send(error);
			return;
		}
		response.send("successful");
		console.log("successful");
	});
});