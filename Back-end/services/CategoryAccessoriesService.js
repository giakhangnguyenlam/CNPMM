const CategoryAccessories = require('../schemas/CategoryAccessoriesSchema');
const Product = require('../schemas/ProductSchema');

var createCategoryAccessories = (req, res, nex) => {
    const categoryAccessories = new CategoryAccessories(req.body);
    categoryAccessories.save((err, result) => {
        if(err) return res.json({mess: "Can't create category accessories"})
        return res.json(result).status(201);
    })
}

var updateCategoryAccessories = (req,res, next) => {
    CategoryAccessories.findOne({productId: req.params.id}, (err, categoryAccessories) => {
        if(err) return res.json(err);

        categoryAccessories.type = req.body.type;
        categoryAccessories.color = req.body.color;
        categoryAccessories.brand = req.body.brand;
        categoryAccessories.origin = req.body.origin;
        categoryAccessories.material = req.body.material;

        categoryAccessories.save((err, result) => {
            if(err) return res.json(err);
            return res.json(result).status(200);
        })
    })
}

var getCategoryAccessoriesByProductId = (req, res, next)  => {
    CategoryAccessories.findOne({productId: req.params.id}, (err, categoryAccessories) => {
        if(err) return res.json(err);
        return res.json(categoryAccessories).status(200);
    })
}

var getCategoryAccessoriesByType = (req, res, next) => {
    CategoryAccessories.find({type:req.params.type}, (err, categoryAccessorieses) => {
        if(err) return res.json(err);
        let product = [];
        categoryAccessorieses.forEach((categoryAccessories) => {
            Product.findOne({id: categoryAccessories.productId}, (err, result) => {
                if(!err){
                    product.push(result);
                }
            })
        })

        return res.json(product).status(200);
    })
}

var deleteCategoryAccessoriesByProductId = (productId) => {
    CategoryAccessories.deleteOne({productId: productId}, (err) => {
        if(err) return res.json(err)
        return res.json({mess: 'delete successfully'})
    })
}

module.exports = {
    createCategoryAccessories,
    updateCategoryAccessories,
    getCategoryAccessoriesByProductId,
    getCategoryAccessoriesByType,
    deleteCategoryAccessoriesByProductId
}
