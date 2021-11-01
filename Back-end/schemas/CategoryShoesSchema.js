const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var CategoryShoesSchema = new Schema({
    id: Number,
    style: String,
    size: [Number],
    color: [String],
    height: Number,
    weight: Number,
    material: String,
    sole: String,
    origin: String,
    warranty: Number,
    gender: String,
    productId: Number
})

autoIncrement.initialize(mongoose.connection);
CategoryShoesSchema.plugin(autoIncrement.plugin, {model : 'CategoryShoesSchema', field: "id"});

var CategoryShoesSchema = mongoose.model('CategoryShoesSchema', CategoryShoesSchema);

module.exports = CategoryShoesSchema;