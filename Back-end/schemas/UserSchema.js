const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var UserSchema = new Schema({
    id: Number,
    name: String,
    dateofbirth: String,
    email: String,
    address: String,
    gender: String,
    username: String,
    password: String,
    role: String
})
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {model : 'UserSchema', field: "id"});

var UserSchema = mongoose.model('UserSchema', UserSchema);

module.exports = UserSchema;
