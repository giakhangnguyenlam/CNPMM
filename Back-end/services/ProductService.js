const Product = require('../schemas/ProductSchema')
const {deleteCategoryAccessoriesByProductId} = require('../services/CategoryAccessoriesService')
const {deleteCategoryClothesByProductId} = require('../services/CategoryClothesService')
const {deleteCategoryShoesByProductId} = require('../services/CategoryShoesService')

var createProduct = (req, res, next) => {
    req.body.storeId = req.body.storeid;
    const product = new Product(req.body);
    product.save((err, result) => {
        if(err) return res.json(err);
        return res.json(result).status(201);
    })
}

var getProductByProductId = (req, res, next) => {
    Product.findOne({id: req.params.id}, (err, product) => {
        if(err) return res.json(err);
        if(product!=null){
            return res.json(product).status(200);
        }
        else{
            return res.json({mess: "Can't find the product"})
        }
    })
}

var getProductByStoreId = (req, res, next) => {
    Product.find({storeId: req.params.id}, (err, products) => {
        if(err) return res.json(err);
        return res.json(products).status(200);
    })
}

var updateProductWithoutImageByProductId = (req, res, next) => {
    Product.findOne({id: req.params.id}, (err, product) => {
        if(err) return res.json(err);
        if(product!=null){
            product.name = req.body.name;
            product.quantity = req.body.quantity;
            product.price = req.body.price;
            product.description = req.body.description;

            product.save((err, result) => {
                if(err) return res.json(err)
                return res.json(result).status(200);
            })
        }
        else{
            return res.json({mess: "Can't find the product"})
        }
    })
}

var updateProductWithImageByProductId = (req, res, next) => {
    Product.findOne({id: req.params.id}, (err, product) => {
        if(err) return res.json(err);
        if(product!=null){
            product.image = req.body.image;
            product.save((err, result) => {
                if(err) return res.json(err)
                return res.json(result).status(200);
            })
        }
        else{
            return res.json({mess: "Can't find the product"})
        }
    })
}

var deleteProductByProductId = (req, res, next) => {
    Product.deleteOne({id: req.params.id}, (err) => {
        if(err) return res.json(err);
        if(req.params.category == 1){
            deleteCategoryClothesByProductId(req.params.id);
        }
        else if(req.params.category == 2){
            deleteCategoryShoesByProductId(req.params.id);
        }
        else{
            deleteCategoryAccessoriesByProductId(req.params.id);
        }
        return res.json({mess:"Delete successfully"}).status(200);
    }
    )
}

var getAllProducts = (req, res, next) => {
    Product.find({}, (err, products) => {
        if(err) return res.json(err)
        return res.json(products).status(200)
    })
}

var getAllProductsByCategory = (req, res, next) => {
    Product.find({category: req.params.id}, (err, products) => {
        if(err) return res.json(err)
        return res.json(products).status(200);
    })
}

module.exports = {
    createProduct,
    getProductByProductId,
    getProductByStoreId,
    updateProductWithoutImageByProductId,
    updateProductWithImageByProductId,
    deleteProductByProductId,
    getAllProducts,
    getAllProductsByCategory
}