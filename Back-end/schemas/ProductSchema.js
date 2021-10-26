const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var ProductSchema = new Schema ({
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'StoreSchema'
    },
    category: Number,
    name: String,
    quantity: Number,
    price: Number,
    Description: String,
    Image: String
})

autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, {model : 'ProductSchema', field: "_id"});

var ProductSchema = mongoose.model('ProductSchema', ProductSchema);

module.exports = ProductSchema;