var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    payee: {type: Schema.Types.ObjectId,ref: 'UserModel'},
    recepient: {type: Schema.Types.ObjectId,ref: 'UserModel'},
    payment_details: {
        amount: Number,
        currency: String
    },
    date_of_payment: {type: Date,default: Date.now},
    product: {type: Schema.Types.ObjectId,ref: 'ProductModel'}
});

module.exports = mongoose.model('PaymentModel',PaymentSchema);