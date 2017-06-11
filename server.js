var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3003;
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/marketplace');
var ProductModel = require('./models/product');
var UserModel = require('./models/user');

router.use(function(req,res,next) {
    console.log('An api request is made');
    next();
});

router.route('/getproductlistforuser')
    .post(function(req,res) {
        UserModel.findOne({fb_id: req.body.fb_id},function(err,user) {
            if (err) {
                res.send(err);
            } else if(user) {
                ProductModel.find()
                .where('seller')
                .ne(user._id)
                .exec(function(err,products) {
                    if(err) {
                        res.send(err);
                    }
                    res.json(products)
                });
            }
        });
    })

router.route('/users')
    .post(function(req,res) {
        console.log('Post request to users url');

        UserModel.findOne({fb_id: req.body.fb_id},function(err,user) {
            if(err) {
                res.send(err);
            }
            else if (user) {
                res.json(user);
            } else {
                var usr = new UserModel();

                usr.first_name = req.body.first_name;
                usr.last_name = req.body.last_name;
                usr.email = (req.body.email === undefined) ? '' : req.body.email;
                usr.fb_id = req.body.fb_id;

                usr.save(function(err,usr) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(usr);
                });
            }
        });
    })

    .get(function(req,res) {
        UserModel.find(function(err,users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

router.route('/users/:user_id')
    .get(function(req,res) {
        UserModel.findById(req.params.user_id,function(err,user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    })

    .delete(function(req,res) {
        UserModel.remove({
            _id: req.params.user_id
        },function(err,user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });

router.route('/products')
    .post(function(req,res) {
        console.log('Post request to products url');

        UserModel.findOne({fb_id: req.body.fb_id},function(err,user) {
            if (err) {
                res.send(err);
            } else if(user){
                var product = new ProductModel();

                product.title = req.body.title;
                product.description = req.body.description;
                product.category = req.body.category;
                product.price.amount = req.body.amount;
                product.price.currency = req.body.currency;
                product.seller = user._id;

                product.save(function(err,product) {
                    if (err) {
                        res.send(err);
                    }else if(product) {
                        console.log(user);
                        user.sold_products.push(product._id)
                        user.save(function(err,usr) {
                            if(err) {
                                res.send(err);
                            }
                            res.json(product)
                        });
                    }
                });
            }
        })
    })

    .get(function(req,res) {
        ProductModel.find(function(err,products) {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    });

router.route('/products/:product_id')
    .get(function(req,res) {
        console.log(req.params.product_id);
        ProductModel.findById(req.params.product_id)
            .populate('seller')
            .exec(function(err,product) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(product);
            });
    })

    .put(function(req,res) {
        ProductModel.findById(req.params.product_id,function(err,product) {
            if (err) {
                res.send(err);
            }
            product.title = (req.body.title === undefined) ? product.title : req.body.title;
            product.description = (req.body.description === undefined) ? product.description : req.body.description;
            product.category = (req.body.category === undefined) ? product.category : req.body.category;
            product.price.amount = (req.body.amount === undefined) ? product.price.amount : req.body.amount;
            product.price.currency = (req.body.currency === undefined) ? product.price.currency : req.body.currency;

            product.save(function(err,product) {
                if (err) {
                    res.send(err);
                }
                res.json(product);
            });
        });
    })

    .delete(function(req,res) {
        ProductModel.remove({
            _id: req.params.product_id
        },function(err,product) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Successfully deleted'});
        });
    })

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
    /*var user = new UserModel();
    user.first_name = 'Rounak';
    user.last_name = 'Baral';
    user.fb_id = 'hdy71y81u9e91i0ei19ujidqi';
    console.log(user.first_name);
    user.save(function(err,user) {
        if (err) return console.error(err+'ggwp');
        console.log(user.first_name);
    });*/
    /*UserModel.find(function(err,users) {
        if (err) return console.error(err+'ggwp');
        console.log(users);
    });*/
    /*UserModel.findOne({fb_id: 'jcjanjsicji'},function(err,res) {
        if (err) return console.error(err+'ggwp');
        console.log(res);
    })*/
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