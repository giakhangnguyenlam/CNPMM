const Store = require('../schemas/StoreSchema');
const Product = require('../schemas/ProductSchema');
const {deleteCategoryAccessoriesByProductId} = require('../services/CategoryAccessoriesService')
const {deleteCategoryClothesByProductId} = require('../services/CategoryClothesService')
const {deleteCategoryShoesByProductId} = require('../services/CategoryShoesService')


var createStore = (req, res, next) => {
    Store.findOne({nameStore: req.body.nameStore}, (err, store) => {
        if(err) return res.status(404).json(err);
        if(store == null){
            const store = new Store(req.body);
            store.save((err, result) => {
            if(err) return res.status(404).json(err);
            return res.status(201).json(result);
            })
        }
        else{
            return res.status(404).json({mess: 'Store is already existed'});
        }
    })
    
}

var getStoreByUserId = (req, res, next) => {
    Store.find({userId: req.params.id}, (err, stores) => {
        if(err) return res.status(404).json(err);
        return res.status(200).json(stores);
    })
}

var deleteStore = (req, res, next) => {
    Store.deleteOne({id: req.params.id}, (err) => {
        if(err) return res.status(404).json(err)
        Product.find({storeId: req.params.id}, (err, products) => {
            if(err) return res.status(404).json({mess: err});
            for (const product of products) {
                Product.deleteOne({id: product.id}, (err) => {
                    if(err)  return res.json({err: mess});
                })
                if(product.category == 1){
                    deleteCategoryClothesByProductId(product.id, req, res, next);
                }
                else if(product.category == 2){
                    deleteCategoryShoesByProductId(product.id, req, res, next);
                }
                else{
                    deleteCategoryAccessoriesByProductId(product.id, req, res, next);
                }
            }
        })
        return res.status(200).json({mess:"Delete successfully"});
    })
}

var updateStoreWithoutImage = (req, res, next) => {
    Store.findOne({id: req.params.id}, (err, store) => {
        if(err) return res.status(404).json(err);
        store.userId = req.body.userId;
        store.nameStore = req.body.nameStore;
        store.storeDescription = req.body.storeDescription;

        store.save((err, result) => {
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        })
    })
}

var updateStoreWithImage = (req, res, next) => {
    Store.findOne({id: req.params.id}, (err, store) => {
        if(err) return res.status(404).json(err);
        store.image = req.body.image;
        store.save((err, result) => {
            if(err) return res.status(404).json(err);
            return res.status(200).json(result);
        })
    })
}

var getAllStore = (req, res, next) => {
    Store.find({}, (err, stores) => {
        if(err) return res.status(404).json({mess: err});
        return res.status(200).json(stores);
    })
}

module.exports  = {
    createStore,
    getStoreByUserId,
    deleteStore,
    updateStoreWithoutImage,
    updateStoreWithImage,
    getAllStore
}