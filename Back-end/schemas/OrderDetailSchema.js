const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var OrderDetailSchema = new Schema({
    id: Number,
    orderId: Number,
    productId: Number,
    quantity: Number 
})

autoIncrement.initialize(mongoose.connection);
OrderDetailSchema.plugin(autoIncrement.plugin, {model : 'OrderDetailSchema', field: "id"});

var OrderDetailSchema = mongoose.model('OrderDetailSchema', OrderDetailSchema);

module.exports = OrderDetailSchema;