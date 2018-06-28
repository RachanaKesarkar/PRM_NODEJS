var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/todo');
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
//   console.log('connected');
// });

//create a schema
var todoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
      }
});

var Todo = mongoose.model('Todo', todoSchema);

// var item1 = Todo({item: 'Item11'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// });

//var data = [{item: 'Item1'}, {item: 'Item2'}, {item: 'Item3'}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        //get data form mongodb and pass it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        // res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', function(req, res){
        //delete requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g,'-') !== req.params.item;
        // });
        // res.json(data);
    });
};