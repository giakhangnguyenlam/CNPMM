const CategoryClothes = require('../schemas/CategoryClothesSchema');
const Product = require('../schemas/ProductSchema');

var createCategoryClothes = (req, res, next) => {
    const categoryClothes = new CategoryClothes(req.body);
    categoryClothes.save((err, result) => {
        if(err) return res.json(err);
        return res.json(result).status(201);
    })
}

var updateCategoryClothes = (req, res, next) => {
    CategoryClothes.findOne({productId: req.params.id}, (err, categoryClothes) => {
        if(err) return res.json(err);

        categoryClothes.type = req.body.type;
        categoryClothes.brand = req.body.brand;
        categoryClothes.origin = req.body.origin;
        categoryClothes.size = req.body.size;
        categoryClothes.color = req.body.color;
        categoryClothes.material = req.body.material;
        categoryClothes.gender = req.body.gender;

        categoryClothes.save((err, result) => {
            if(err) return res.json(err)
            return res.json(result).status(200);
        })
    })
}

var getCategoryClothesByProductId = (req, res, next) => {
    CategoryClothes.findOne({productId: req.params.id}, (err, categoryClothes) => {
        if(err) return res.json(err)
        return res.json(categoryClothes).status(200)
    })
}

var getCategoryClothesByType = (req, res, next) => {
    CategoryClothes.find({type: req.params.type}, (err, categoryClotheses) => {
        if(err) return res.json(err)
        let product = [];
        categoryClotheses.forEach((categoryClothes) => {
            Product.findOne({id: categoryClothes.productId}, (err, result) => {
                if(!err){
                    product.push(result);
                }
            })
        })
        return res.json(product).status(200);
    })
}

var deleteCategoryClothesByProductId  = (productId) => {
    CategoryClothes.deleteOne({productId: productId}, (err) => {
        if(err) return res.json(err)
        return res.json({mess: 'delete successfully'})
    })
}

module.exports = {
    createCategoryClothes, 
    updateCategoryClothes, 
    getCategoryClothesByProductId,
    getCategoryClothesByType,
    deleteCategoryClothesByProductId
}