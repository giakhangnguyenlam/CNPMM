const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var CommentSchema = new Schema ({
    productId : {
        type: Schema.Types.ObjectId,
        ref: 'ProductSchema'
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    comment: String,
    start: Number,
    date: String
})

autoIncrement.initialize(mongoose.connection);
CommentSchema.plugin(autoIncrement.plugin, {model : 'CommentSchema', field: "_id"});

var CommentSchema = mongoose.model('CommentSchema', CommentSchema);

module.exports = CommentSchema;