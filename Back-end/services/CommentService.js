const Comment = require('../schemas/CommentSchema')

var createComment = (req, res, next) => {
    let comment = new Comment(req.body);
    const date = new Date();
    const dateString = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    comment.date = dateString;

    comment.save((err, result) => {
        if(err) return res.json({mess:err}).status(404);
        return res.json({mess: "Comment successfully"}).status(201);
    })
}

var getCommentByProductId = (req, res, next) => {
    Comment.find({productId: req.params.id}, (err, comment) => {
        if(err) return res.json(err).status(404);
        return res.json(comment).status(200);
    })
}

module.exports = {
    createComment,
    getCommentByProductId
}