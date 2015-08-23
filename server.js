var Var = require('./variables.js');
require('./postData.js');
require('./getData.js');
require('./init.js');
require('./auth.js');

Var.app.listen(Var.port);
console.log("Server listeing " + Var.port + " port");
