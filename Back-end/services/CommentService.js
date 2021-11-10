const Comment = require('../schemas/CommentSchema')
const Product = require('../schemas/ProductSchema')

var createComment = (req, res, next) => {
    let comment = new Comment(req.body);
    const date = new Date();
    const dateString = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    comment.date = dateString;

    comment.save((err, result) => {
        if(err) return res.status(404).json({mess:err});
        Product.findOne({id: req.body.productId}, (err, product) => {
            product.comments.push(result.id);
            product.save((err) => {
                if(err) return res.status(404).json({mess: err});
            })
        })
        return res.status(201).json({mess: "Comment successfully"});
    })
}

var getCommentByProductId = (req, res, next) => {
    Product.findOne({id: req.params.id}, (err, product) => {
        if(err) return res.status(404).json({mess:err});
        Comment.find({id:{$in:product.comments}}, (err, comments) => {
            if(err) return res.status(404).json({mess: err})
            return res.status(200).json(comments);
        })
    })
}

module.exports = {
    createComment,
    getCommentByProductId
}