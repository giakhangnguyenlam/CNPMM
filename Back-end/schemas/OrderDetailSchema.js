const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var OrderDetailSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'OrderSchema'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSchema'
    },
    quantity: Number 
})

autoIncrement.initialize(mongoose.connection);
OrderDetailSchema.plugin(autoIncrement.plugin, {model : 'OrderDetailSchema', field: "_id"});

var OrderDetailSchema = mongoose.model('OrderDetailSchema', OrderDetailSchema);

module.exports = OrderDetailSchema;