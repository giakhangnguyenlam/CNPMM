const CategoryClothes = require('../schemas/CategoryClothesSchema');
const Product = require('../schemas/ProductSchema');

var createCategoryClothes = (req, res, next) => {
    const categoryClothes = new CategoryClothes(req.body);
    categoryClothes.save((err, result) => {
        if(err) return res.json(err);
        return res.status(201).json(result);
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
            if(err) return res.status(404).json(err)
            return res.status(200).json(result);
        })
    })
}

var getCategoryClothesByProductId = (req, res, next) => {
    CategoryClothes.findOne({productId: req.params.id}, (err, categoryClothes) => {
        if(err) return res.status(404).json(err);
        return res.status(200).json(categoryClothes)
    })
}

var getCategoryClothesByType = (req, res, next) => {
    CategoryClothes.find({type: req.params.type}, (err, categoryClotheses) => {
        if(err) return res.json(err).status(404)
        let product = [];
        categoryClotheses.forEach((categoryClothes) => {
            Product.findOne({id: categoryClothes.productId}, (err, result) => {
                if(!err){
                    product.push(result);
                }
            })
        })
        return res.status(200).json(product);
    })
}

var deleteCategoryClothesByProductId  = (productId) => {
    CategoryClothes.deleteOne({productId: productId}, (err) => {
        if(err) return res.status(404).json(err)
        return res.status(200).json({mess: 'delete successfully'})
    })
}

module.exports = {
    createCategoryClothes, 
    updateCategoryClothes, 
    getCategoryClothesByProductId,
    getCategoryClothesByType,
    deleteCategoryClothesByProductId
}