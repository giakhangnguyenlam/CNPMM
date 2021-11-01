const CategoryShoes = require('../schemas/CategoryShoesSchema');
const Product = require('../schemas/ProductSchema');

var createCategoryShoes = (req, res, next) => {
    const categoryShoes = new CategoryShoes(req.body);
    categoryShoes.save((err, result) => {
        if(err) return res.json(err);
        return res.json(result).status(201);
    })
}

var updateCategoryShoes = (req, res, next) => {
    CategoryShoes.findOne({productId: req.params.id}, (err, categoryShoes) => {
        if(err) return res.json(err);
        
        categoryShoes.style = req.body.style;
        categoryShoes.size = req.body.size;
        categoryShoes.color = req.body.color;
        categoryShoes.height = req.body.height;
        categoryShoes.weight = req.body.weight;
        categoryShoes.material = req.body.material;
        categoryShoes.sole = req.body.sole;
        categoryShoes.origin = req.body.origin;
        categoryShoes.warranty = req.body.warranty;
        categoryShoes.gender = req.body.gender;

        categoryShoes.save((err, result) => {
            if(err) return res.json(err)
            return res.json(result).status(200);
        })
    })
}

var getCategoryShoesByProductId = (req, res, next) => {
    CategoryShoes.find({productId: req.params.id}, (err, categoryShoes) => {
        if(err) return res.json(err);
        return res.json(categoryShoes).status(200);
    })
}

var getCategoryShoesByStyle = (req, res, next) => {
    CategoryShoes.find({style: req.params.style}, (err, categoryShoeses) => {
        if(err) return res.json(err)
        let product = [];
        categoryShoeses.forEach((categoryShoes) => {
            Product.findOne({id: categoryShoes.productId}, (err, result) => {
                if(!err)
                product.push(result);
            })
        })

        return res.json(product).status(200)
    })
}

var deleteCategoryShoesByProductId = (productId) => {
    CategoryShoes.deleteOne({productId: productId}, (err) => {
        if(err) return res.json(err);
        return res.json({mess: 'delete successfully'})
    })
}

module.exports = {
    createCategoryShoes,
    updateCategoryShoes,
    getCategoryShoesByProductId,
    getCategoryShoesByStyle,
    deleteCategoryShoesByProductId
}