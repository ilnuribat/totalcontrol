var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.post('/auth', function(request, response) {
	var params = request.body;
	var login = params['login'];
	var password = params['password'];
	var sqlQuery = 'SELECT name_lastname, position FROM staff WHERE login = ' + login + ' AND password = ' +
		password + ';';
	console.log(sqlQuery);
	sql.main(sqlQuery, function(error, rows) {
		if(error) {
			console.log(new Date().toLocaleString(), "/auth\t error", error);
			response.send('the DB error', error);
			return;
		}
		if(rows.length == 0) {
			response.send("Логин или пароль введены не верно");
			return;
		}

		if(rows.length > 1) {
			console.log(new Date().toLocaleString(), "auth\t more than 1 identical users");
			response.send("не уникальный пользователь");
			return;
		}
		response.send(JSON.stringify(rows[0]));
	});
});