var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    fb_id: String,
    email: {type: String,default: ''},
    is_logged_in: Boolean,
    date_joined: {type:Date,default: Date.now},
    sold_products: [{type: Schema.Types.ObjectId,ref: 'ProductModel'}],
    bought_products: [{type: Schema.Types.ObjectId,ref: 'ProductModel'}],
    owes: [{user: {type: Schema.Types.ObjectId,ref: 'UserModel'},money: {amount: Number,currency: String}}],
    gets: [{user: {type: Schema.Types.ObjectId,ref: 'UserModel'},money: {amount: Number,currency: String}}]
});

module.exports = mongoose.model('UserModel',UserSchema);