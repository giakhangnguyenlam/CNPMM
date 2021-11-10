const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var AdminSchema = new Schema({
    id: Number,
    username: String,
    password: String
})

autoIncrement.initialize(mongoose.connection);
AdminSchema.plugin(autoIncrement.plugin, {model : 'AdminSchema', field: "id"});

var AdminSchema = mongoose.model('AdminSchema', AdminSchema);

module.exports = AdminSchema;