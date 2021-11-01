const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var StoreSchema = new Schema({
    id: Number,
    userId: Number,
    nameStore: String,
    storeDescription: String,
    image: String
})

autoIncrement.initialize(mongoose.connection);
StoreSchema.plugin(autoIncrement.plugin, {model : 'StoreSchema', field: "id"});

var StoreSchema = mongoose.model('StoreSchema', StoreSchema);

module.exports = StoreSchema;