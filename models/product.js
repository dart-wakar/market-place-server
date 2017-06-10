var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    title: String,
    description: String,
    price: {
        amount: Number,
        currency: String
    },
    date_added: {type: Date,default: Date.now},
    category: String
});

module.exports = mongoose.model('ProductModel',ProductSchema);