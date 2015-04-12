var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.post('/otmetka', function(request, response) {
	var query = Var.url.parse(request.url).query;
	var params = Var.queryString.parse(query);
    
	var typeOfMarking = params['type'];
	var addingRows = params['data'];
	var day = new Date.getTime() / (1000 * 60 * 60 * 24);
	var queryString = "INSERT INTO control(id_student, day)";
	response.send("otmetka");
});