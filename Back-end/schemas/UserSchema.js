const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var UserSchema = new Schema({
    name: String,
    gender: String,
    birthDate: String,
    address: String,
    role: String,
    username: String,
    password: String
})
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {model : 'UserSchema', field: "_id"});

var UserSchema = mongoose.model('UserSchema', UserSchema);

module.exports = UserSchema;
