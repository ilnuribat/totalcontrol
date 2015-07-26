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
		var ans = {
			id: rows[0].id,
			name_lastname: rows[0].name_lastname,
			position: rows[0].position
		}
		var ansStr = JSON.stringify(ans);
		var ansUTF8 = unescape(encodeURIComponent(ansStr));
		console.log(ans);
		response.send(ans);
	});
});