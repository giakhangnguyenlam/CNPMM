const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var CategoryAccessoriesSchema = new Schema({
    id: Number,
    type: String,
    color: [String],
    brand: String,
    origin: String,
    material: String,
    productId: {
        type: Schema.Types.Number,
        ref: 'ProductSchema'
    }
})

autoIncrement.initialize(mongoose.connection);
CategoryAccessoriesSchema.plugin(autoIncrement.plugin, {model : 'CategoryAccessoriesSchema', field: "id"});

var CategoryAccessoriesSchema = mongoose.model('CategoryAccessoriesSchema', CategoryAccessoriesSchema);

module.exports = CategoryAccessoriesSchema;