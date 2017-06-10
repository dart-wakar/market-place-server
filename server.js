var express = require('express');
var app = express();
var port = process.env.PORT || 3003;
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');

router.get('/',function(req,res) {
    res.json({message: 'Welcome to the api'});
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',router);
app.listen(port);
console.log('Server running on port '+port);