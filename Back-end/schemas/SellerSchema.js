const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var SellerSchema = new Schema({
    id: Number,
    name: String,
    dateofbirth: String,
    email: String,
    address: String,
    gender: String,
    username: String,
    password: String,
    phone: String
})
autoIncrement.initialize(mongoose.connection);
SellerSchema.plugin(autoIncrement.plugin, {model : 'SellerSchema', field: "id"});

var SellerSchema = mongoose.model('SellerSchema', SellerSchema);

module.exports = SellerSchema;
