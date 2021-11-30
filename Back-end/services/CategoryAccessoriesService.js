const CategoryAccessories = require('../schemas/CategoryAccessoriesSchema');
const Product = require('../schemas/ProductSchema');

var createCategoryAccessories = (req, res, nex) => {
    const categoryAccessories = new CategoryAccessories(req.body);
    categoryAccessories.save((err, result) => {
        if(err) return res.json({mess: "Can't create category accessories"})
        return res.status(201).json(result);
    })
}

var updateCategoryAccessories = (req,res, next) => {
    CategoryAccessories.findOne({productId: req.params.id}, (err, categoryAccessories) => {
        if(err) return res.json(err).status(404);

        categoryAccessories.type = req.body.type;
        categoryAccessories.color = req.body.color;
        categoryAccessories.brand = req.body.brand;
        categoryAccessories.origin = req.body.origin;
        categoryAccessories.material = req.body.material;

        categoryAccessories.save((err, result) => {
            if(err) return res.json(err);
            return res.status(200).json(result);
        })
    })
}

var getCategoryAccessoriesByProductId = (req, res, next)  => {
    CategoryAccessories.findOne({productId: req.params.id}, (err, categoryAccessories) => {
        if(err) return res.json(err).status(404);
        return res.status(200).json(categoryAccessories);
    })
}

var getCategoryAccessoriesByType = (req, res, next) => {
    CategoryAccessories.find({type:req.params.type}, async (err, categoryAccessorieses) => {
        if(err) return res.json(err);
        let product = [];
        
        for (const categoryAccessories of categoryAccessorieses) {
            const obj = await Product.findOne({id: categoryAccessories.productId});
            product.push(obj);
        }

        return res.status(200).json(product);
    })
}

var deleteCategoryAccessoriesByProductId = (productId, req, res, next) => {
    CategoryAccessories.deleteOne({productId: productId}, (err) => {
        if(err) return res.status(404).json(err)
        return res.status(200).json({mess: 'delete successfully'})
    })
}

module.exports = {
    createCategoryAccessories,
    updateCategoryAccessories,
    getCategoryAccessoriesByProductId,
    getCategoryAccessoriesByType,
    deleteCategoryAccessoriesByProductId
}
