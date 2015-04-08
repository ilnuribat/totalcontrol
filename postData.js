var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.post('/otmetka', function(request, response) {
    var body = request.body;
    console.log(body);
	var name = body['name'];
	var phone = body['phone'];
	var human = body['human'];
	
	response.send("otmetka");
});