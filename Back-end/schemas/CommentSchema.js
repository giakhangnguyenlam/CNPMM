const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var CommentSchema = new Schema ({
    id: Number,
    username: String,
    comment: String,
    star: Number,
    date: String
})

autoIncrement.initialize(mongoose.connection);
CommentSchema.plugin(autoIncrement.plugin, {model : 'CommentSchema', field: "id"});

var CommentSchema = mongoose.model('CommentSchema', CommentSchema);

module.exports = CommentSchema;