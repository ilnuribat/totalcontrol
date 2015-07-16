var Var = require('./variables.js');
require('./postData.js');
require('./getData.js');
require('./init.js');
require('./auth.js');

Var.app.listen(80);
console.log("Server стартанул");
