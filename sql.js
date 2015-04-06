var Var = require('./variables.js');
var connectionSQL = null;
var sqlData;

var main = function (query, callback) {
  connectionSQL = Var.mysql.createConnection( {
    host: 'localhost', 
    port: 3306,
    database: 'server',
    user: 'root', 
    password: '1234'
  });
  
  connectionSQL.connect(function(error) {
    if(error != null) {
      console.log('Error connecting to mySql:' + error + '\n');
    }
  });
  
  connectionSQL.query(query, function(error, rows){
    callback(error, rows);
  });
  
  connectionSQL.end();  
};

exports.main = main;
