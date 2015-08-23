var Var = require('./variables.js');
var sql = require('./sql.js');

Var.app.post('/auth', function(request, response) {
	var params = request.body;
	var login = params['login'];
	var password = params['password'];
	var sqlQuery = 'SELECT id, name_lastname, position FROM staff WHERE login = "' + login + '" AND password = "' +
		password + '";';
    sql.main(sqlQuery, function (error, rows) {
        var answer = {
            "result": "success",
            "description": "Успешно",
            "data": { }
        }
		if(error) {
            console.log(new Date().toLocaleString(), "/auth error:", error);
            answer.result = "Database Error";
            answer.description = "Ошибка сервера";
			response.send(JSON.stringify(answer));
			return;
		}
        if (rows.length == 0) {
            answer.result = "incorrect";
            answer.description = "Неверный логин или пароль";
			response.send(JSON.stringify(answer));
			return;
        }

		answer.data = {
			id: rows[0].id,
			name_lastname: rows[0].name_lastname,
			position: rows[0].position
        }
        response.header("Content-Type", "application/json; charset=utf-8");
		response.send(JSON.stringify(answer));
	});
});