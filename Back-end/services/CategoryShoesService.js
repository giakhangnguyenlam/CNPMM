const CategoryShoes = require('../schemas/CategoryShoesSchema');
const Product = require('../schemas/ProductSchema');

var createCategoryShoes = (req, res, next) => {
    const categoryShoes = new CategoryShoes(req.body);
    categoryShoes.save((err, result) => {
        if(err) return res.status(404).json(err);
        return res.status(201).json(result);
    })
}

var updateCategoryShoes = (req, res, next) => {
    CategoryShoes.findOne({productId: req.params.id}, (err, categoryShoes) => {
        if(err) return res.status(404).json(err);
        
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
            return res.status(200).json(result);
        })
    })
}

var getCategoryShoesByProductId = (req, res, next) => {
    CategoryShoes.findOne({productId: req.params.id}, (err, categoryShoes) => {
        if(err) return res.status(404).json(err);
        return res.status(200).json(categoryShoes);
    })
}

var getCategoryShoesByStyle = (req, res, next) => {
    CategoryShoes.find({style: req.params.style}, async (err, categoryShoeses) => {
        if(err) return res.json(err)
        let product = [];
        
        for (const categoryShoes of categoryShoeses) {
            const obj = await Product.findOne({id: categoryShoes.productId})
            product.push(obj);
        }

        return res.status(200).json(product);
    })
}

var deleteCategoryShoesByProductId = (productId, req, res, next) => {
    CategoryShoes.deleteOne({productId: productId}, (err) => {
        if(err) return res.status(404).json(err);
        return res.status(200).json({mess: 'delete successfully'})
    })
}

module.exports = {
    createCategoryShoes,
    updateCategoryShoes,
    getCategoryShoesByProductId,
    getCategoryShoesByStyle,
    deleteCategoryShoesByProductId
}