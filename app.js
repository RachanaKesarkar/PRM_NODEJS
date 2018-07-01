var express = require('express');

var todoController = require('./controllers/todoController');
var prmController = require('./controllers/prmController');
var testController = require('./controllers/testController');

var app = express();

//set template engine
app.set('view engine','ejs');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//static files
app.use(express.static('./public'));

//fire controllers
testController(app);
todoController(app);
prmController(app);

//listen to port
app.listen(3000);

console.log('listening to port 3000');
