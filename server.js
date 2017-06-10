var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3003;
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/marketplace');
var ProductModel = require('./models/product');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',function() {
    console.log('Connected to database!');
    /*var product = new ProductModel();
    product.title = 'First Product';
    product.description = 'This is the first test product';
    product.category = 'Abstract';
    product.price.amount = 10000;
    product.price.currency = 'INR';
    console.log(product.title);
    product.save(function(err,product) {
        if (err) return console.error(err+'ggwp');
        console.log(product.title);
    });*/
    ProductModel.find(function(err,products) {
        if (err) return console.error(err+'ggwp');
        console.log(products);
    });
});

router.get('/',function(req,res) {
    res.json({message: 'Welcome to the api'});
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',router);
app.listen(port);
console.log('Server running on port '+port);