var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.post('/auth', function(request, response) {
	var params = request.body;
	var login = params['login'];
	var password = params['password'];
	var sqlQuery = 'SELECT id, name_lastname, position FROM staff WHERE login = "' + login + '" AND password = "' +
		password + '";';
	sql.main(sqlQuery, function(error, rows) {
		if(error) {
			console.log(new Date().toLocaleString(), "/auth error:", error);
			response.send('the DB error', error);
			return;
		}
		if(rows.length == 0) {
			response.send("incorrect");
			return;
        }

		var ans = {
			id: rows[0].id,
			name_lastname: rows[0].name_lastname,
			position: rows[0].position
		}
		response.send(ans);
	});
});