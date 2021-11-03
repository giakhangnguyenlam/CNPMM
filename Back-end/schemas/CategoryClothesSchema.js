const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var CategoryClothesSchema = new Schema({
    id: Number,
    type: String,
    brand: String,
    origin: String,
    size: [String],
    color: [String],
    material: String,
    gender: String,
    productId: {
        type: Schema.Types.Number,
        ref: 'ProductSchema'
    }
})

autoIncrement.initialize(mongoose.connection);
CategoryClothesSchema.plugin(autoIncrement.plugin, {model : 'CategoryClothesSchema', field: "id"});

var CategoryClothesSchema = mongoose.model('CategoryClothesSchema', CategoryClothesSchema);

module.exports = CategoryClothesSchema;