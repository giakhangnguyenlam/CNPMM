const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var StoreSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    nameStore: String,
    storeDescription: String,
    image: String
})

autoIncrement.initialize(mongoose.connection);
StoreSchema.plugin(autoIncrement.plugin, {model : 'StoreSchema', field: "_id"});

var StoreSchema = mongoose.model('StoreSchema', StoreSchema);

module.exports = StoreSchema;