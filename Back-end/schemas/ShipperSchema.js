const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var ShipperSchema = new Schema({
    id: Number,
    name: String,
    dateofbirth: String,
    email: String,
    address: String,
    gender: String,
    username: String,
    password: String,
    phone: String,
    status: String,
    orders: [Number],
    ordersSuccess: [Number]
})
autoIncrement.initialize(mongoose.connection);
ShipperSchema.plugin(autoIncrement.plugin, {model : 'ShipperSchema', field: "id"});

var ShipperSchema = mongoose.model('ShipperSchema', ShipperSchema);

module.exports = ShipperSchema;