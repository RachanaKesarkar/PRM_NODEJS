var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/todo');

//create schema
var prmSchema = new mongoose.Schema({
    prmNo:{
        type: String,
        required: false,
    },
    receivedDate:{
        type: Date,
        required: false,
    },
    prmDate:{
        type: Date,
        required: false,
    },
    from:{
        type: String,
        required: false,
    },
    payTo:{
        type: String,
        required: false,
    },
    paymentMode:{
        type: String,
        required: false,
    },
    costCenter:{
        type: String,
        required: false,
    },
    location:{
        type: String,
        required: false,
    },
    poNumber:{
        type: String,
        required: false,
    },
    preparedBy:{
        type: String,
        required: false,
    },
    checkedBy:{
        type: String,
        required: false,
    },
    approvedByTier1:{
        type: String,
        required: false,
    },
    approvedByTier2:{
        type: String,
        required: false,
    },
    approvedByTier3:{
        type: String,
        required: false,
    },
    receivedBy:{
        type: String,
        required: false,
    },
    accountDetails:[{
        expenseParticulars: string,
        billNo: string,
        billDate: date,
        billAmount: string,
        approvedAmount: string,
        grossAmount: string,
        remarks: string
    }]
});

var Prm = mongoose.model('Prm',prmSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/prm', function(req, res){
        //get data form mongodb and pass it to view
        Prm.find({}, function(err, data){
            if (err) throw err;
            res.render('prm', {prms: data});
        });
    });

    app.post('/prm', urlencodedParser, function(req, res){
        //get data from view and add it to mongodb
        var newPrm = Prm(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/prm/:item', function(req, res){
        //delete requested item from mongodb
        Prm.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
};