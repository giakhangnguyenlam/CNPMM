const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var OrderDetailSchema = new Schema({
    id: Number,
    orderId: {
        type: Schema.Types.Number,
        ref: 'OrderSchema'
    },
    productId: {
        type: Schema.Types.Number,
        ref: 'ProductSchema'
    },
    quantity: Number,
    description: String,
    date: String 
})

autoIncrement.initialize(mongoose.connection);
OrderDetailSchema.plugin(autoIncrement.plugin, {model : 'OrderDetailSchema', field: "id"});

var OrderDetailSchema = mongoose.model('OrderDetailSchema', OrderDetailSchema);

module.exports = OrderDetailSchema;