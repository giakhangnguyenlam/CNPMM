const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var CategoryClothesSchema = new Schema({
    type: String,
    brand: String,
    origin: String,
    size: [String],
    color: [String],
    material: String,
    gender: String,
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSchema'
    }
})

autoIncrement.initialize(mongoose.connection);
CategoryClothesSchema.plugin(autoIncrement.plugin, {model : 'CategoryClothesSchema', field: "_id"});

var CategoryClothesSchema = mongoose.model('CategoryClothesSchema', CategoryClothesSchema);

module.exports = CategoryClothesSchema;